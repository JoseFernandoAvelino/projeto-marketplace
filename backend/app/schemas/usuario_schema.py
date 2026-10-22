from pydantic import BaseModel


class NovoUsuario(BaseModel):
    nome: str
    cpf: str
    email: str
    senha: str


class Login(BaseModel):
    email: str
    senha: str
