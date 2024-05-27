from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel,constr
from sqlalchemy.orm import Session
from typing import Optional, List
from models.map import Map
from models.Top80sAnd90s import top_80,top_90
from database.session import get_db
from sqlalchemy import and_


router = APIRouter(
    prefix="/map",
    tags=["map"],
)

class MapResponse(BaseModel):
    Artist_and_title: str
    Country: str
    
class CountryResponse(BaseModel):
    country: str
    song: str
    streams: int

@router.get("/getCountry", response_model=List[MapResponse])
async def get_Country(country: str, db: Session = Depends(get_db)):
    if country == 'all':
        items = db.query(Map).all()
    elif country == 'DominicanRepublic':
        items = db.query(Map).filter(Map.Country == 'Dominican Republic').all()
    elif country == 'CostaRica':
        items = db.query(Map).filter(Map.Country == 'Costa Rica').all()    
    elif country == 'ElSalvador':
        items = db.query(Map).filter(Map.Country == 'El Salvador').all()  
    elif country == 'US':
        items = db.query(Map).filter(Map.Country == 'United States').all()
    else:
        items = db.query(Map).filter(Map.Country == country).all()

    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items


@router.get("/get_song_in_country", response_model=List[MapResponse])
async def find_song_in_country(song: str,artist: str, db: Session = Depends(get_db)):
    items = db.query(Map).filter(
        and_(
        Map.Artist_and_title.like(f"%{song}%"),
        Map.Artist_and_title.like(f"%{artist}%")
        )
        ).all()
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items

@router.get("/get_top_song_in_country", response_model=List[CountryResponse])
async def find_top_song_in_country(decade: str, db: Session = Depends(get_db)):
    if decade == "80":
        items = db.query(top_80).all()  
    elif decade == "90":
        items = db.query(top_90).all()
    elif decade == "all":
        item1 = db.query(top_80).all()
        item2 = db.query(top_90).all()
        if not item1 or not item2:
            raise HTTPException(status_code=404, detail="Items not found")
        items = item1 + item2
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items