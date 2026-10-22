from typing import Literal

from pydantic import BaseModel, Field

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
