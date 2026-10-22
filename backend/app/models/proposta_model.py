from app.db import executar_um


def criar(conversa_id, valor):
    return executar_um(
        "INSERT INTO propostas (conversa_id, valor) VALUES (%s, %s) RETURNING *",
        (conversa_id, valor),
    )


def buscar_com_vendedor(proposta_id):
    return executar_um(
        """SELECT propostas.*, conversas.vendedor_id
           FROM propostas JOIN conversas ON conversas.id = propostas.conversa_id
           WHERE propostas.id = %s""",
        (proposta_id,),
    )


def atualizar_status(proposta_id, status):
    return executar_um(
        "UPDATE propostas SET status = %s WHERE id = %s RETURNING *",
        (status, proposta_id),
    )
