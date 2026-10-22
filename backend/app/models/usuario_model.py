from app.db import executar_um


def buscar_por_email_ou_cpf(email, cpf):
    return executar_um("SELECT id FROM usuarios WHERE email = %s OR cpf = %s", (email, cpf))


def buscar_por_email(email):
    return executar_um("SELECT * FROM usuarios WHERE email = %s", (email,))


def buscar_por_id(usuario_id):
    return executar_um("SELECT id, nome, email, criado_em FROM usuarios WHERE id = %s", (usuario_id,))


def criar(nome, cpf, email, senha_hash):
    return executar_um(
        "INSERT INTO usuarios (nome, cpf, email, senha) VALUES (%s, %s, %s, %s) RETURNING id, nome, email",
        (nome, cpf, email, senha_hash),
    )
