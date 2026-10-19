import os

import psycopg
from dotenv import load_dotenv
from psycopg.rows import dict_row

load_dotenv(override=True)
DATABASE_URL = os.getenv("DATABASE_URL")


def executar(sql, parametros=None):
    with psycopg.connect(DATABASE_URL, row_factory=dict_row) as conexao:
        conexao.execute("SET TIME ZONE 'UTC'")
        cursor = conexao.execute(sql, parametros)
        if cursor.description is None: 
            return []
        return cursor.fetchall()


def executar_um(sql, parametros=None):
    linhas = executar(sql, parametros)
    return linhas[0] if linhas else None