from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional, List
from models.StreamCount import StreamCount
from database.session import get_db
from sqlalchemy import desc

router = APIRouter(
    prefix="/song1723",
    tags=["song1723"],
)

class StreamCountResponse(BaseModel):
    Artist: str
    Title: str
    Streams: int
    Daily: float
    Year: int
    Genre: str
    Country: str
    Month: str

@router.get("/streamcount", response_model=List[StreamCountResponse])
async def get_song(genre: str, db: Session = Depends(get_db)):
    if genre == 'all':
        items = db.query(StreamCount).all()
    elif genre == 'hiphop':
        items = db.query(StreamCount).filter(StreamCount.Genre == 'hip hop').all()
    elif genre == 'rb':
        items = db.query(StreamCount).filter(StreamCount.Genre == 'r&b').all()   
    else:
        items = db.query(StreamCount).filter(StreamCount.Genre == genre).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/streamcount_year", response_model=List[StreamCountResponse])
async def get_song(year: int, db: Session = Depends(get_db)):
    if year == 0:
        items = db.query(StreamCount).order_by(desc(StreamCount.Streams)).all()
    else:
        items = db.query(StreamCount).order_by(desc(StreamCount.Streams)).filter(StreamCount.Year == year).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items


    
