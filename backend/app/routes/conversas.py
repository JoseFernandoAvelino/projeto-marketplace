from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.db import executar, executar_um

router = APIRouter(tags=["Conversas e mensagens"])


class AbrirConversa(BaseModel):
    usuario_id: int
    produto_id: int


class NovaMensagem(BaseModel):
    usuario_id: int
    texto: str = Field(min_length=1, max_length=2000)


def abrir_conversa(produto_id, comprador_id):
    """Abre a conversa do comprador com o vendedor do produto (ou devolve a que já existe).
    Também é usada em propostas.py."""
    produto = executar_um("SELECT vendedor_id FROM produtos WHERE id = %s", (produto_id,))
    if not produto:
        raise HTTPException(404, "Produto não encontrado.")
    if produto["vendedor_id"] == comprador_id:
        raise HTTPException(400, "Você não pode conversar sobre o seu próprio anúncio.")

    conversa = executar_um(
        "SELECT * FROM conversas WHERE produto_id = %s AND comprador_id = %s",
        (produto_id, comprador_id),
    )
    if conversa:
        return conversa

    return executar_um(
        "INSERT INTO conversas (produto_id, comprador_id, vendedor_id) VALUES (%s, %s, %s) RETURNING *",
        (produto_id, comprador_id, produto["vendedor_id"]),
    )


@router.get("/conversas")
def listar_conversas(usuario_id: int):
    """Conversas do usuário (comprando ou vendendo), com o produto, os nomes e a última mensagem."""
    return executar(
        """SELECT conversas.*,
                  produtos.titulo AS produto_titulo,
                  produtos.preco AS produto_preco,
                  produtos.imagens[1] AS produto_imagem,
                  comprador.nome AS comprador_nome,
                  vendedor.nome AS vendedor_nome,
                  (SELECT texto FROM mensagens WHERE conversa_id = conversas.id
                   ORDER BY id DESC LIMIT 1) AS ultima_mensagem
           FROM conversas
           JOIN produtos ON produtos.id = conversas.produto_id
           JOIN usuarios comprador ON comprador.id = conversas.comprador_id
           JOIN usuarios vendedor ON vendedor.id = conversas.vendedor_id
           WHERE conversas.comprador_id = %(usuario)s OR conversas.vendedor_id = %(usuario)s
           ORDER BY conversas.id DESC""",
        {"usuario": usuario_id},
    )


@router.post("/conversas")
def iniciar_conversa(dados: AbrirConversa):
    """Botão "Enviar Mensagem" na tela do produto."""
    return abrir_conversa(dados.produto_id, dados.usuario_id)


@router.get("/conversas/{conversa_id}/mensagens")
def listar_mensagens(conversa_id: int):
    """Mensagens do chat, da mais antiga para a mais nova.
    As mensagens de proposta vêm com o valor e o status da proposta."""
    return executar(
        """SELECT mensagens.*, propostas.valor AS proposta_valor, propostas.status AS proposta_status
           FROM mensagens
           LEFT JOIN propostas ON propostas.id = mensagens.proposta_id
           WHERE mensagens.conversa_id = %s
           ORDER BY mensagens.id""",
        (conversa_id,),
    )


@router.post("/conversas/{conversa_id}/mensagens", status_code=201)
def enviar_mensagem(conversa_id: int, dados: NovaMensagem):
    if not executar_um("SELECT id FROM conversas WHERE id = %s", (conversa_id,)):
        raise HTTPException(404, "Conversa não encontrada.")

    return executar_um(
        "INSERT INTO mensagens (conversa_id, remetente_id, texto) VALUES (%s, %s, %s) RETURNING *",
        (conversa_id, dados.usuario_id, dados.texto),
    )