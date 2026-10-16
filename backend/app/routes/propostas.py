from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.db import executar, executar_um
from app.routes.conversas import abrir_conversa

router = APIRouter(tags=["Propostas"])


class NovaProposta(BaseModel):
    usuario_id: int
    produto_id: int
    valor: float = Field(gt=0)


class RespostaProposta(BaseModel):
    usuario_id: int
    status: Literal["aceita", "recusada"]


def em_reais(valor):
    """1000.5 -> 'R$ 1.000,50'"""
    texto = f"{valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {texto}"


@router.post("/propostas", status_code=201)
def fazer_proposta(dados: NovaProposta):
    """Botão "Fazer Proposta". Abre a conversa (se ainda não existir) e coloca a proposta no chat."""
    produto = executar_um("SELECT aceita_proposta FROM produtos WHERE id = %s", (dados.produto_id,))
    if produto and not produto["aceita_proposta"]:
        raise HTTPException(400, "Este anúncio não aceita propostas.")

    conversa = abrir_conversa(dados.produto_id, dados.usuario_id)

    proposta = executar_um(
        "INSERT INTO propostas (conversa_id, valor) VALUES (%s, %s) RETURNING *",
        (conversa["id"], dados.valor),
    )
    executar(
        """INSERT INTO mensagens (conversa_id, remetente_id, texto, tipo, proposta_id)
           VALUES (%s, %s, %s, 'proposta', %s)""",
        (conversa["id"], dados.usuario_id, f"Proposta de {em_reais(dados.valor)}", proposta["id"]),
    )
    return proposta


@router.put("/propostas/{proposta_id}")
def responder_proposta(proposta_id: int, dados: RespostaProposta):
    """O vendedor aceita ou recusa a proposta."""
    proposta = executar_um(
        """SELECT propostas.*, conversas.vendedor_id
           FROM propostas JOIN conversas ON conversas.id = propostas.conversa_id
           WHERE propostas.id = %s""",
        (proposta_id,),
    )

    if not proposta:
        raise HTTPException(404, "Proposta não encontrada.")
    if proposta["vendedor_id"] != dados.usuario_id:
        raise HTTPException(403, "Só o vendedor pode responder a proposta.")
    if proposta["status"] != "pendente":
        raise HTTPException(400, "Esta proposta já foi respondida.")

    atualizada = executar_um(
        "UPDATE propostas SET status = %s WHERE id = %s RETURNING *",
        (dados.status, proposta_id),
    )
    executar(
        "INSERT INTO mensagens (conversa_id, remetente_id, texto) VALUES (%s, %s, %s)",
        (proposta["conversa_id"], dados.usuario_id, f"Proposta de {em_reais(proposta['valor'])} {dados.status}."),
    )
    return atualizada