
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.views import conversa_view, produto_view, proposta_view, upload_view, usuario_view

app = FastAPI(
    title="API do Marketplace",
    description="Backend do App Marketplace: usuários, produtos, chat e propostas.",
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Início"])
def inicio():
    return {"api": "Marketplace", "status": "ok", "documentacao": "/docs"}


app.include_router(usuario_view.router)
app.include_router(produto_view.router)
app.include_router(upload_view.router)
app.include_router(conversa_view.router)
app.include_router(proposta_view.router)