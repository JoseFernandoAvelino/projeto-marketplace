from pydantic import BaseModel, Field


class AbrirConversa(BaseModel):
    usuario_id: int
    produto_id: int


class NovaMensagem(BaseModel):
    usuario_id: int
    texto: str = Field(min_length=1, max_length=2000)
