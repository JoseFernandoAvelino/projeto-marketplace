from fastapi import HTTPException

from app.models import conversa_model, mensagem_model, produto_model


def abrir_conversa(produto_id, comprador_id):
    produto = produto_model.buscar_vendedor(produto_id)
    if not produto:
        raise HTTPException(404, "Produto não encontrado.")
    if produto["vendedor_id"] == comprador_id:
        raise HTTPException(400, "Você não pode conversar sobre o seu próprio anúncio.")

    conversa = conversa_model.buscar_por_produto_e_comprador(produto_id, comprador_id)
    if conversa:
        return conversa

    return conversa_model.criar(produto_id, comprador_id, produto["vendedor_id"])


def listar(usuario_id):
    return conversa_model.listar_por_usuario(usuario_id)


def listar_mensagens(conversa_id):
    return mensagem_model.listar_por_conversa(conversa_id)


def enviar_mensagem(conversa_id, dados):
    if not conversa_model.buscar_por_id(conversa_id):
        raise HTTPException(404, "Conversa não encontrada.")

    return mensagem_model.criar(conversa_id, dados.usuario_id, dados.texto)
