import os
import uuid

from fastapi import HTTPException

PASTA_UPLOADS = "uploads"


def enviar_fotos(request, fotos):
    if len(fotos) > 6:
        raise HTTPException(400, "Envie no máximo 6 fotos.")

    urls = []
    for foto in fotos:
        if not (foto.content_type or "").startswith("image/"):
            raise HTTPException(400, "Envie apenas imagens.")

        extensao = os.path.splitext(foto.filename or "")[1].lower() or ".jpg"
        nome_arquivo = uuid.uuid4().hex + extensao
        with open(os.path.join(PASTA_UPLOADS, nome_arquivo), "wb") as arquivo:
            arquivo.write(foto.file.read())

        urls.append(f"{request.base_url}uploads/{nome_arquivo}")

    return {"urls": urls}
