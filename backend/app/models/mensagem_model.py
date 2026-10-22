from app.db import executar, executar_um


def listar_por_conversa(conversa_id):
    return executar(
        """SELECT mensagens.*, propostas.valor AS proposta_valor, propostas.status AS proposta_status
           FROM mensagens
           LEFT JOIN propostas ON propostas.id = mensagens.proposta_id
           WHERE mensagens.conversa_id = %s
           ORDER BY mensagens.id""",
        (conversa_id,),
    )


def criar(conversa_id, remetente_id, texto):
    return executar_um(
        "INSERT INTO mensagens (conversa_id, remetente_id, texto) VALUES (%s, %s, %s) RETURNING *",
        (conversa_id, remetente_id, texto),
    )


def criar_proposta(conversa_id, remetente_id, texto, proposta_id):
    executar(
        """INSERT INTO mensagens (conversa_id, remetente_id, texto, tipo, proposta_id)
           VALUES (%s, %s, %s, 'proposta', %s)""",
        (conversa_id, remetente_id, texto, proposta_id),
    )


def criar_resposta(conversa_id, remetente_id, texto):
    executar(
        "INSERT INTO mensagens (conversa_id, remetente_id, texto) VALUES (%s, %s, %s)",
        (conversa_id, remetente_id, texto),
    )
