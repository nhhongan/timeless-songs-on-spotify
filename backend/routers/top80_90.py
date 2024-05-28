from typing import List, Optional

from database.session import get_db
from fastapi import APIRouter, Depends, HTTPException
from models.map import Map
from models.Top80sAnd90s import top_80, top_90
from pydantic import BaseModel
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/top80_90",
    tags=["top80_90"],
)

class top80Response(BaseModel):
    song: str
    artist: str
    Hot100_Rank: int 
    country: str 
    genre: str 
    streams: float 
    
class FeatureResponse(BaseModel):
    danceability: float 
    energy: float 
    loudness: float 
    speechiness: float 
    acousticness: float 
    liveness: float 
    valence: float 
    tempo: float 
 
class top90Response(BaseModel):
    song: str
    artist: str
    Hot100_Rank: int 
    country: str 
    genre: str 
    streams: float 
    


@router.get("/get_song_top80", response_model=List[top80Response])
async def get_song(song: str, db: Session = Depends(get_db)):
    if song == 'all':
        items = db.query(top_80).all()
    else:
        items = db.query(top_80).filter(top_80.song == song).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_song_top90", response_model=List[top90Response])
async def get_song(song: str, db: Session = Depends(get_db)):
    if song == 'all':
        items = db.query(top_90).all()
    else:
        items = db.query(top_90).filter(top_90.song == song).all()

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

@router.get("/get_song_top90_by_rank", response_model=List[top90Response])
async def get_song_by_rank(rank: int, db: Session = Depends(get_db)):
    if rank == 'all':
        items = db.query(top_90).all()
    else:
        items = db.query(top_90).filter(top_90.Hot100_Rank == rank).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_song_top80_90_by_feature", response_model=List[FeatureResponse])
async def get_song_by_feature(db: Session = Depends(get_db)):
    items1 = db.query(top_80).all()
    items2 = db.query(top_90).all()
    if not items1 or not items2:
        raise HTTPException(status_code=404, detail="Items not found")
    all_items = items1 + items2
    return all_items
