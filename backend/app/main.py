from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import usuarios

app = FastAPI(
    title="API do Marketplace",
    description="Backend do App Marketplace: usuários, produtos, chat e propostas.",
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.get("/", tags=["Início"])
def inicio():
    return {"api": "Marketplace", "status": "ok", "documentacao": "/docs"}


app.include_router(usuarios.router)