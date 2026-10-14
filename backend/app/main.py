import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes import usuarios
from app.routes import produtos
from app.routes import uploads

app = FastAPI(
    title="API do Marketplace",
    description="Backend do App Marketplace: usuários, produtos, chat e propostas.",
)


app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.get("/", tags=["Início"])
def inicio():
    return {"api": "Marketplace", "status": "ok", "documentacao": "/docs"}


app.include_router(usuarios.router)
app.include_router(produtos.router)
app.include_router(uploads.router)

os.makedirs(uploads.PASTA_UPLOADS, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads.PASTA_UPLOADS), name="fotos")