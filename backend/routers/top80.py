from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional, List
from models.Top80sAnd90s import top_80
from models.map import Map
from database.session import get_db


router = APIRouter(
    prefix="/top80",
    tags=["top80"],
)

class top80Response(BaseModel):
    song: str
    artist: str
    Hot100_Rank: int 
    country: str 
    genre: str 
    streams: float 
    
class top80FeatureResponse(BaseModel):
    danceability: float 
    energy: float 
    loudness: float 
    speechiness: float 
    acousticness: float 
    liveness: float 
    valence: float 
    tempo: float 
 
class danceability(BaseModel):
    danceability: float 
class energy(BaseModel):
    energy: float 
class loudness(BaseModel):
    loudness: float 
class liveness(BaseModel):
    liveness: float 
class valence(BaseModel):
    valence: float 
class tempo(BaseModel):
    tempo: float 
class speechiness(BaseModel):
    speechiness: float 
class acousticness(BaseModel):
    acousticness: float
@router.get("/get_song_top80", response_model=List[top80Response])
async def get_song(song: str, db: Session = Depends(get_db)):
    if song == 'all':
        items = db.query(top_80).all()
    else:
        items = db.query(top_80).filter(top_80.song == song).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items
@router.get("/get_song_top80_by_rank", response_model=List[top80Response])
async def get_song_by_rank(rank: int, db: Session = Depends(get_db)):
    if rank == 'all':
        items = db.query(top_80).all()
    else:
        items = db.query(top_80).filter(top_80.Hot100_Rank == rank).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_song_top80_by_feature", response_model=List[top80FeatureResponse])
async def get_song_by_feature(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_danceability", response_model=List[danceability])
async def get_song_by_danceability(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_energy", response_model=List[energy])
async def get_song_by_energy(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_loudness", response_model=List[loudness])
async def get_song_by_loudness(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_liveness", response_model=List[liveness])
async def get_song_by_liveness(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_valence", response_model=List[valence])
async def get_song_by_valence(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_tempo", response_model=List[tempo])
async def get_song_by_tempo(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_speechiness", response_model=List[speechiness])
async def get_song_by_speechiness(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_acousticness", response_model=List[acousticness])
async def get_song_by_acousticness(db: Session = Depends(get_db)):
    items = db.query(top_80).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items