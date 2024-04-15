from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from database import config
from sqlalchemy.orm import Session
from typing import Optional, List
from database.process import execute_query


router = APIRouter(
    prefix="/song1723",
    tags=["song1723"],
)


@router.get("/streamcount")
async def get_song(Genre: Optional[str]=None):
    response_list = []
    if (Genre == 'All'):
        query = "SELECT Artist, Title, Streams, Year FROM streamcount_eachyear"
        item = execute_query(query)
        for i in item:
            response_dict = {
            'artist': i[0],
            'title': i[1],
            'streams': i[2],
            'year': i[3],
            'genre': i[4]}
            response_list.append(response_dict)
    else:
        query = "SELECT Artist, Title, Streams, Year, Genre FROM streamcount_eachyear WHERE Genre LIKE %s"
        item = execute_query(query, (f'%{Genre}%',))
        for i in item:
            response_dict = {
            'artist': i[0],
            'title': i[1],
            'streams': i[2],
            'year': i[3],
            'genre': i[4]}
            response_list.append(response_dict)
    if not item:
        raise HTTPException(status_code=404, detail="Items not found")
    return {"Songs": response_list}
    # Artist: 0 
    

    
