from fastapi import APIRouter, File, UploadFile

from app.controllers import produto_controller
from app.schemas.produto_schema import EdicaoProduto, NovoProduto

router = APIRouter(tags=["Produtos"])


@router.get("/produtos")
def listar_produtos(busca: str | None = None, categoria: str | None = None, vendedor_id: int | None = None):
    return produto_controller.listar(busca, categoria, vendedor_id)


@router.get("/produtos/{produto_id}")
def buscar_produto(produto_id: int):
    return produto_controller.buscar(produto_id)


@router.post("/produtos", status_code=201)
def publicar_produto(dados: NovoProduto):
    return produto_controller.publicar(dados)


@router.put("/produtos/{produto_id}")
def editar_produto(produto_id: int, dados: EdicaoProduto):
    return produto_controller.editar(produto_id, dados)


@router.delete("/produtos/{id}")
def excluir_produto(id: int):
    return produto_controller.excluir(id)


@router.post("/uploads")
def upload_imagem(file: UploadFile = File(...)):
    return produto_controller.upload_imagem(file)
