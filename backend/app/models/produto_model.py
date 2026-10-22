from app.db import executar, executar_um

SELECT_PRODUTO = """
    SELECT produtos.*, usuarios.nome AS vendedor_nome
    FROM produtos
    JOIN usuarios ON usuarios.id = produtos.vendedor_id
"""


def listar(busca=None, categoria=None, vendedor_id=None):
    filtros = []
    valores = []

    if busca:
        filtros.append("produtos.titulo ILIKE %s")
        valores.append(f"%{busca}%")
    if categoria:
        filtros.append("produtos.categoria = %s")
        valores.append(categoria)
    if vendedor_id:
        filtros.append("produtos.vendedor_id = %s")
        valores.append(vendedor_id)

    where = "WHERE " + " AND ".join(filtros) if filtros else ""
    return executar(f"{SELECT_PRODUTO} {where} ORDER BY produtos.criado_em DESC", valores)


def buscar_por_id(produto_id):
    return executar_um(f"{SELECT_PRODUTO} WHERE produtos.id = %s", (produto_id,))


def buscar_simples(produto_id):
    return executar_um("SELECT * FROM produtos WHERE id = %s", (produto_id,))


def buscar_vendedor(produto_id):
    return executar_um("SELECT vendedor_id FROM produtos WHERE id = %s", (produto_id,))


def buscar_aceita_proposta(produto_id):
    return executar_um("SELECT aceita_proposta FROM produtos WHERE id = %s", (produto_id,))


def criar(dados):
    return executar_um(
        """INSERT INTO produtos
             (vendedor_id, titulo, descricao, categoria, preco, condicao,
              aceita_proposta, faz_entrega, aceita_troca, localizacao, imagens)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
           RETURNING *""",
        (
            dados["usuario_id"], dados["titulo"], dados["descricao"], dados["categoria"], dados["preco"],
            dados["condicao"], dados["aceita_proposta"], dados["faz_entrega"], dados["aceita_troca"],
            dados["localizacao"], dados["imagens"],
        ),
    )


def atualizar(produto_id, dados):
    return executar_um(
        """UPDATE produtos SET
             titulo = %s, descricao = %s, categoria = %s, preco = %s, condicao = %s,
             aceita_proposta = %s, faz_entrega = %s, aceita_troca = %s, localizacao = %s, imagens = %s
           WHERE id = %s
           RETURNING *""",
        (
            dados["titulo"], dados["descricao"], dados["categoria"], dados["preco"], dados["condicao"],
            dados["aceita_proposta"], dados["faz_entrega"], dados["aceita_troca"], dados["localizacao"],
            dados["imagens"], produto_id,
        ),
    )


def excluir(produto_id):
    executar("DELETE FROM mensagens WHERE conversa_id IN (SELECT id FROM conversas WHERE produto_id = %s)", (produto_id,))
    executar("DELETE FROM propostas WHERE conversa_id IN (SELECT id FROM conversas WHERE produto_id = %s)", (produto_id,))
    executar("DELETE FROM conversas WHERE produto_id = %s", (produto_id,))
    executar("DELETE FROM produtos WHERE id = %s", (produto_id,))
