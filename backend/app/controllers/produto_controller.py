import os
import shutil
from uuid import uuid4

from fastapi import HTTPException

from app.models import produto_model


def listar(busca, categoria, vendedor_id):
    return produto_model.listar(busca, categoria, vendedor_id)


def buscar(produto_id):
    produto = produto_model.buscar_por_id(produto_id)
    if not produto:
        raise HTTPException(404, "Produto não encontrado.")
    return produto


def publicar(dados):
    return produto_model.criar(dados.model_dump())


def editar(produto_id, dados):
    produto = produto_model.buscar_simples(produto_id)

    if not produto:
        raise HTTPException(404, "Produto não encontrado.")
    if produto["vendedor_id"] != dados.usuario_id:
        raise HTTPException(403, "Você só pode editar os seus próprios anúncios.")

    novo = {**produto, **dados.model_dump(exclude_unset=True)}
    return produto_model.atualizar(produto_id, novo)


def excluir(id):
    produto_model.excluir(id)
    return {"sucesso": True, "mensagem": "Produto excluído permanentemente"}


def upload_imagem(file):
    os.makedirs("uploads", exist_ok=True)

    extensao = file.filename.split(".")[-1] if file.filename and "." in file.filename else "jpg"
    nome_arquivo = f"{uuid4().hex}.{extensao}"
    caminho_salvo = f"uploads/{nome_arquivo}"

    with open(caminho_salvo, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"url": f"/{caminho_salvo}"}
