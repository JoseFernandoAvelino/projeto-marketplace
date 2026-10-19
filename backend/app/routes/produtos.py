import os
import shutil
from typing import Literal
from uuid import uuid4

from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel, Field

from app.db import executar, executar_um

router = APIRouter(tags=["Produtos"])

Categoria = Literal["celulares", "moveis", "moda", "veiculos", "esportes", "livros", "brinquedos", "outras"]
Condicao = Literal["Novo", "Ótimo estado", "Usado"]

class NovoProduto(BaseModel):
    usuario_id: int
    titulo: str = Field(min_length=1, max_length=70)
    categoria: Categoria
    preco: float = Field(ge=0)
    condicao: Condicao
    descricao: str = ""
    aceita_proposta: bool = True
    faz_entrega: bool = False
    aceita_troca: bool = False
    localizacao: str = ""
    imagens: list[str] = []


class EdicaoProduto(BaseModel):
    """Na edição, só o usuario_id é obrigatório. Envie apenas os campos que mudaram."""
    usuario_id: int
    titulo: str | None = Field(None, min_length=1, max_length=70)
    categoria: Categoria | None = None
    preco: float | None = Field(None, ge=0)
    condicao: Condicao | None = None
    descricao: str | None = None
    aceita_proposta: bool | None = None
    faz_entrega: bool | None = None
    aceita_troca: bool | None = None
    localizacao: str | None = None
    imagens: list[str] | None = None


SELECT_PRODUTO = """
    SELECT produtos.*, usuarios.nome AS vendedor_nome
    FROM produtos
    JOIN usuarios ON usuarios.id = produtos.vendedor_id
"""


@router.get("/produtos")
def listar_produtos(busca: str | None = None, categoria: str | None = None, vendedor_id: int | None = None):
    """Lista os produtos, dos mais novos para os mais antigos. Todos os filtros são opcionais."""
    filtros = []
    valores = []

    if busca:
        filtros.append("produtos.titulo ILIKE %s")
        valores.append(f"%{busca}%")
    if categoria:
        filtros.append("produtos.categoria = %s")
        valores.append(categoria)
    if vendedor_id:
        filtros.append("produtos.vendedor_id = %s")
        valores.append(vendedor_id)

    where = "WHERE " + " AND ".join(filtros) if filtros else ""
    return executar(f"{SELECT_PRODUTO} {where} ORDER BY produtos.criado_em DESC", valores)


@router.get("/produtos/{produto_id}")
def buscar_produto(produto_id: int):
    produto = executar_um(f"{SELECT_PRODUTO} WHERE produtos.id = %s", (produto_id,))
    if not produto:
        raise HTTPException(404, "Produto não encontrado.")
    return produto


@router.post("/produtos", status_code=201)
def publicar_produto(dados: NovoProduto):
    """Publica um novo produto. O vendedor é o usuario_id enviado."""
    return executar_um(
        """INSERT INTO produtos
             (vendedor_id, titulo, descricao, categoria, preco, condicao,
              aceita_proposta, faz_entrega, aceita_troca, localizacao, imagens)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
           RETURNING *""",
        (
            dados.usuario_id, dados.titulo, dados.descricao, dados.categoria, dados.preco, dados.condicao,
            dados.aceita_proposta, dados.faz_entrega, dados.aceita_troca, dados.localizacao, dados.imagens,
        ),
    )


@router.put("/produtos/{produto_id}")
def editar_produto(produto_id: int, dados: EdicaoProduto):
    """Edita um produto. Só o dono do anúncio pode editar."""
    produto = executar_um("SELECT * FROM produtos WHERE id = %s", (produto_id,))

    if not produto:
        raise HTTPException(404, "Produto não encontrado.")
    if produto["vendedor_id"] != dados.usuario_id:
        raise HTTPException(403, "Você só pode editar os seus próprios anúncios.")

    
    novo = {**produto, **dados.model_dump(exclude_unset=True)}

    return executar_um(
        """UPDATE produtos SET
             titulo = %s, descricao = %s, categoria = %s, preco = %s, condicao = %s,
             aceita_proposta = %s, faz_entrega = %s, aceita_troca = %s, localizacao = %s, imagens = %s
           WHERE id = %s
           RETURNING *""",
        (
            novo["titulo"], novo["descricao"], novo["categoria"], novo["preco"], novo["condicao"],
            novo["aceita_proposta"], novo["faz_entrega"], novo["aceita_troca"], novo["localizacao"],
            novo["imagens"], produto_id,
        ),
    )


@router.delete("/produtos/{id}")
def excluir_produto(id: int):
    from app.db import executar
    
    executar("DELETE FROM mensagens WHERE conversa_id IN (SELECT id FROM conversas WHERE produto_id = %s)", (id,))
    executar("DELETE FROM propostas WHERE conversa_id IN (SELECT id FROM conversas WHERE produto_id = %s)", (id,))
    
    executar("DELETE FROM conversas WHERE produto_id = %s", (id,))
    
    executar("DELETE FROM produtos WHERE id = %s", (id,))
    
    return {"sucesso": True, "mensagem": "Produto excluído permanentemente"}

@router.post("/uploads")
def upload_imagem(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)
    
    extensao = file.filename.split(".")[-1] if file.filename and "." in file.filename else "jpg"
    nome_arquivo = f"{uuid4().hex}.{extensao}"
    caminho_salvo = f"uploads/{nome_arquivo}"
    
    with open(caminho_salvo, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"url": f"/{caminho_salvo}"}