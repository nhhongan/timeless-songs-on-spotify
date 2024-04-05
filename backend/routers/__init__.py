from fastapi import APIRouter
from .song_2017_2023 import router as song_2017_2023_router
api_router = APIRouter(prefix="/api/v1")

api_router.include_router(song_2017_2023_router)
