from fastapi import APIRouter

from app.controllers import proposta_controller
from app.schemas.proposta_schema import NovaProposta, RespostaProposta

router = APIRouter(tags=["Propostas"])


@router.post("/propostas", status_code=201)
def fazer_proposta(dados: NovaProposta):
    return proposta_controller.fazer(dados)


@router.put("/propostas/{proposta_id}")
def responder_proposta(proposta_id: int, dados: RespostaProposta):
    return proposta_controller.responder(proposta_id, dados)
