from fastapi import APIRouter, File, Request, UploadFile

from app.controllers import upload_controller

router = APIRouter(tags=["Fotos"])


@router.post("/uploads", status_code=201)
def enviar_fotos(request: Request, fotos: list[UploadFile] = File(...)):
    return upload_controller.enviar_fotos(request, fotos)
