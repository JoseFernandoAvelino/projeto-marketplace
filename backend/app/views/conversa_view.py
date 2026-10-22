from fastapi import APIRouter

from app.controllers import conversa_controller
from app.schemas.conversa_schema import AbrirConversa, NovaMensagem

router = APIRouter(tags=["Conversas e mensagens"])


@router.get("/conversas")
def listar_conversas(usuario_id: int):
    return conversa_controller.listar(usuario_id)


@router.post("/conversas")
def iniciar_conversa(dados: AbrirConversa):
    return conversa_controller.abrir_conversa(dados.produto_id, dados.usuario_id)


@router.get("/conversas/{conversa_id}/mensagens")
def listar_mensagens(conversa_id: int):
    return conversa_controller.listar_mensagens(conversa_id)


@router.post("/conversas/{conversa_id}/mensagens", status_code=201)
def enviar_mensagem(conversa_id: int, dados: NovaMensagem):
    return conversa_controller.enviar_mensagem(conversa_id, dados)
