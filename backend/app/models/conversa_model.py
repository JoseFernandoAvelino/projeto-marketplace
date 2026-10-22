from app.db import executar, executar_um


def buscar_por_id(conversa_id):
    return executar_um("SELECT * FROM conversas WHERE id = %s", (conversa_id,))


def buscar_por_produto_e_comprador(produto_id, comprador_id):
    return executar_um(
        "SELECT * FROM conversas WHERE produto_id = %s AND comprador_id = %s",
        (produto_id, comprador_id),
    )


def criar(produto_id, comprador_id, vendedor_id):
    return executar_um(
        "INSERT INTO conversas (produto_id, comprador_id, vendedor_id) VALUES (%s, %s, %s) RETURNING *",
        (produto_id, comprador_id, vendedor_id),
    )


def listar_por_usuario(usuario_id):
    return executar(
        """SELECT conversas.*,
                  produtos.titulo AS produto_titulo,
                  produtos.preco AS produto_preco,
                  produtos.imagens[1] AS produto_imagem,
                  comprador.nome AS comprador_nome,
                  vendedor.nome AS vendedor_nome,
                  (SELECT texto FROM mensagens WHERE conversa_id = conversas.id
                   ORDER BY id DESC LIMIT 1) AS ultima_mensagem
           FROM conversas
           JOIN produtos ON produtos.id = conversas.produto_id
           JOIN usuarios comprador ON comprador.id = conversas.comprador_id
           JOIN usuarios vendedor ON vendedor.id = conversas.vendedor_id
           WHERE conversas.comprador_id = %(usuario)s OR conversas.vendedor_id = %(usuario)s
           ORDER BY conversas.id DESC""",
        {"usuario": usuario_id},
    )
