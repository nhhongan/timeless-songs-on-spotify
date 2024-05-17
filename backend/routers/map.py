from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel,constr
from sqlalchemy.orm import Session
from typing import Optional, List
from models.map import Map
from database.session import get_db
from sqlalchemy import and_


router = APIRouter(
    prefix="/map",
    tags=["map"],
)

class MapResponse(BaseModel):
    Artist_and_title: str
    Country: str

@router.get("/getCountry", response_model=List[MapResponse])
async def get_Country(country: str, db: Session = Depends(get_db)):
    if country == 'all':
        items = db.query(Map).all()
    else:
        items = db.query(Map).filter(Map.Country == country).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items


@router.get("/get_song_top80_in_country", response_model=List[MapResponse])
async def find_song_in_country_80s(song: str,name: str, db: Session = Depends(get_db)):
    items = db.query(Map).filter(
        and_(
        Map.Artist_and_title.like(f"%{song}%"),
        Map.Artist_and_title.like(f"%{name}%")
        )
        ).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items


@router.get("/get_song_top90_in_country", response_model=List[MapResponse])
async def find_song_in_country_90s(song: str,name: str, db: Session = Depends(get_db)):
    items = db.query(Map).filter(
        and_(
        Map.Artist_and_title.like(f"%{song}%"),
        Map.Artist_and_title.like(f"%{name}%")
        )
        ).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items