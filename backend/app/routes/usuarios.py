import bcrypt
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.db import executar_um

router = APIRouter(tags=["Usuários"])


class NovoUsuario(BaseModel):
    nome: str
    cpf: str
    email: str
    senha: str


class Login(BaseModel):
    email: str
    senha: str


@router.post("/usuarios", status_code=201)
def cadastrar(dados: NovoUsuario):
    cpf = "".join(c for c in dados.cpf if c.isdigit()) 

    if not dados.nome.strip() or "@" not in dados.email:
        raise HTTPException(400, "Informe o nome e um e-mail válido.")
    if len(cpf) != 11:
        raise HTTPException(400, "O CPF deve ter 11 números.")
    if len(dados.senha) < 6:
        raise HTTPException(400, "A senha deve ter pelo menos 6 caracteres.")

    if executar_um("SELECT id FROM usuarios WHERE email = %s OR cpf = %s", (dados.email, cpf)):
        raise HTTPException(400, "E-mail ou CPF já cadastrado.")

    senha_hash = bcrypt.hashpw(dados.senha.encode(), bcrypt.gensalt()).decode()
    return executar_um(
        "INSERT INTO usuarios (nome, cpf, email, senha) VALUES (%s, %s, %s, %s) RETURNING id, nome, email",
        (dados.nome.strip(), cpf, dados.email.strip(), senha_hash),
    )


@router.post("/login")
def login(dados: Login):
    usuario = executar_um("SELECT * FROM usuarios WHERE email = %s", (dados.email,))

    if not usuario or not bcrypt.checkpw(dados.senha.encode(), usuario["senha"].encode()):
        raise HTTPException(401, "E-mail ou senha incorretos.")

    return {"id": usuario["id"], "nome": usuario["nome"], "email": usuario["email"]}


@router.get("/usuarios/{usuario_id}")
def buscar_usuario(usuario_id: int):
    usuario = executar_um("SELECT id, nome, email, criado_em FROM usuarios WHERE id = %s", (usuario_id,))
    if not usuario:
        raise HTTPException(404, "Usuário não encontrado.")
    return usuario