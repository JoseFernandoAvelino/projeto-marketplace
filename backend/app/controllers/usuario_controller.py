import bcrypt
from fastapi import HTTPException

from app.models import usuario_model


def cadastrar(dados):
    cpf = "".join(c for c in dados.cpf if c.isdigit())

    if not dados.nome.strip() or "@" not in dados.email:
        raise HTTPException(400, "Informe o nome e um e-mail válido.")
    if len(cpf) != 11:
        raise HTTPException(400, "O CPF deve ter 11 números.")
    if len(dados.senha) < 6:
        raise HTTPException(400, "A senha deve ter pelo menos 6 caracteres.")

    if usuario_model.buscar_por_email_ou_cpf(dados.email, cpf):
        raise HTTPException(400, "E-mail ou CPF já cadastrado.")

    senha_hash = bcrypt.hashpw(dados.senha.encode(), bcrypt.gensalt()).decode()
    return usuario_model.criar(dados.nome.strip(), cpf, dados.email.strip(), senha_hash)


def login(dados):
    usuario = usuario_model.buscar_por_email(dados.email)

    if not usuario or not bcrypt.checkpw(dados.senha.encode(), usuario["senha"].encode()):
        raise HTTPException(401, "E-mail ou senha incorretos.")

    return {"id": usuario["id"], "nome": usuario["nome"], "email": usuario["email"]}


def buscar(usuario_id):
    usuario = usuario_model.buscar_por_id(usuario_id)
    if not usuario:
        raise HTTPException(404, "Usuário não encontrado.")
    return usuario
