from fastapi import APIRouter

from app.controllers import usuario_controller
from app.schemas.usuario_schema import Login, NovoUsuario

router = APIRouter(tags=["Usuários"])


@router.post("/usuarios", status_code=201)
def cadastrar(dados: NovoUsuario):
    return usuario_controller.cadastrar(dados)


@router.post("/login")
def login(dados: Login):
    return usuario_controller.login(dados)


@router.get("/usuarios/{usuario_id}")
def buscar_usuario(usuario_id: int):
    return usuario_controller.buscar(usuario_id)
