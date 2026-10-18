import os
import psycopg
from dotenv import load_dotenv
from psycopg.rows import dict_row

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")


def executar(sql, parametros=None):
    """Roda um comando SQL no PostgreSQL e devolve as linhas como uma lista de dicionários."""
    with psycopg.connect(DATABASE_URL, row_factory=dict_row) as conexao:
        conexao.execute("SET TIME ZONE 'UTC'")
        cursor = conexao.execute(sql, parametros)
        if cursor.description is None: 
            return []
        return cursor.fetchall()


def executar_um(sql, parametros=None):
    """Igual ao executar(), mas devolve só a primeira linha (ou None se não houver)."""
    linhas = executar(sql, parametros)
    return linhas[0] if linhas else None