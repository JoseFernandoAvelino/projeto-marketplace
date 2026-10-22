from fastapi import HTTPException

from app.controllers.conversa_controller import abrir_conversa
from app.models import mensagem_model, produto_model, proposta_model


def em_reais(valor):
    texto = f"{valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {texto}"


def fazer(dados):
    produto = produto_model.buscar_aceita_proposta(dados.produto_id)
    if produto and not produto["aceita_proposta"]:
        raise HTTPException(400, "Este anúncio não aceita propostas.")

    conversa = abrir_conversa(dados.produto_id, dados.usuario_id)

    proposta = proposta_model.criar(conversa["id"], dados.valor)
    mensagem_model.criar_proposta(
        conversa["id"], dados.usuario_id, f"Proposta de {em_reais(dados.valor)}", proposta["id"]
    )
    return proposta


def responder(proposta_id, dados):
    proposta = proposta_model.buscar_com_vendedor(proposta_id)

    if not proposta:
        raise HTTPException(404, "Proposta não encontrada.")
    if proposta["vendedor_id"] != dados.usuario_id:
        raise HTTPException(403, "Só o vendedor pode responder a proposta.")
    if proposta["status"] != "pendente":
        raise HTTPException(400, "Esta proposta já foi respondida.")

    atualizada = proposta_model.atualizar_status(proposta_id, dados.status)
    mensagem_model.criar_resposta(
        proposta["conversa_id"], dados.usuario_id,
        f"Proposta de {em_reais(proposta['valor'])} {dados.status}.",
    )
    return atualizada
