from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel,constr
from sqlalchemy.orm import Session
from typing import Optional, List
from models.map import Map
from models.Top80sAnd90s import top_80,top_90
from models.top1song import Top1Song
from database.session import get_db
from sqlalchemy import and_,not_


router = APIRouter(
    prefix="/map",
    tags=["map"],
)

class MapResponse(BaseModel):
    Artist_and_title: str
    Country: str
    
class CountryResponse(BaseModel):
    song: str
    country: str
    streams: int
class TopResponse(BaseModel):
    Song: str
    Country: str
    StreamCount: int
    Years: int

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
    countries_to_check = [
            "Argentina", "Bolivia", "Brazil", "Canada", "Chile", "Colombia",
            "Dominican Republic", "Costa Rica", "Ecuador", "El Salvador",
            "Guatemala", "United States", "Uruguay", "Nicaragua", "Paraguay",
            "Venezuela", "Peru", "Honduras", "Mexico"
        ]
    if decade == "80":
        items = db.query(top_80).filter(top_80.country.in_(countries_to_check)).all()
    elif decade == "90":
        items = db.query(top_90).filter(top_90.country.in_(countries_to_check)).all()
    elif decade == "all":
        item1 = db.query(top_80).filter(top_80.country.in_(countries_to_check)).all()
        item2 = db.query(top_90).filter(top_90.country.in_(countries_to_check)).all()
        if not item1 or not item2:
            raise HTTPException(status_code=404, detail="Items not found")
        items = item1 + item2
    if not items:
        raise HTTPException(status_code=404, detail="Items not found")

    return items


@router.get("/topresponse",response_model=List[TopResponse])
async def get_top_response(year: int, db: Session = Depends(get_db)):
    top1song_data = db.query(
        Top1Song.Song,
        Top1Song.Country,
        Map.StreamCount,
        Top1Song.Years
    ).join(Map, onclause=and_(
            Map.Artist_and_title.contains(Top1Song.Song),
            not_(Map.Artist_and_title.contains("Remix")),
            Map.Country == Top1Song.Country,
            Map.Artist_and_title.contains(Top1Song.Artist)
            )).filter(Top1Song.Years == year).all()
    if not top1song_data:
        raise HTTPException(status_code=404, detail="Items not found")
    return top1song_data