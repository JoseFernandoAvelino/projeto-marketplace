from typing import Literal

from pydantic import BaseModel, Field


class NovaProposta(BaseModel):
    usuario_id: int
    produto_id: int
    valor: float = Field(gt=0)


class RespostaProposta(BaseModel):
    usuario_id: int
    status: Literal["aceita", "recusada"]
