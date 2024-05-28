from fastapi import APIRouter
from .song_2017_2023 import router as song_2017_2023_router
from routers.map import router as map_router
from routers.top80_90 import router as top80_90_router
api_router = APIRouter(prefix="/api/v1")
api_router.include_router(song_2017_2023_router)
api_router.include_router(map_router)
api_router.include_router(top80_90_router)