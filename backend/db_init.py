from pathlib import Path

from app.db import executar

sql = Path(__file__).parent.joinpath("sql", "schema.sql").read_text(encoding="utf-8")
executar(sql)
print("Tabelas criadas com sucesso.")