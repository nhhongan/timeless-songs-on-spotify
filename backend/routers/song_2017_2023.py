from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from database import config
from sqlalchemy.orm import Session
from typing import Optional, List
from pydantic import BaseModel
import mysql.connector
router = APIRouter(
    prefix="/song1723",
    tags=["song1723"],
)

def execute_query(query, params=None):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)

    result = cursor.fetchall()

    cursor.close()
    conn.close()

    return result
@router.get("/{artist},{title},{streamcout},{year},{Genre}")
async def get_song(Genre: Optional[str]=None):
    if Genre is None:
        query = "SELECT Artist, Title, Streams, Year FROM streamcount_eachyear"
        item = execute_query(query)
    else:
        query = "SELECT Artist, Title, Streams, Year,Genre FROM streamcount_eachyear WHERE Genre LIKE %s"
        item = execute_query(query, (f'%{Genre}%',))
    if not item:
        raise HTTPException(status_code=404, detail="Items not found")

    return {"items": item}
    
