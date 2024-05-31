from sqlalchemy import Column, Integer, String, BigInteger, Double
from database.__init__ import Base,engine

class Top1Song(Base):
    __tablename__ = 'top1song'
    Song = Column(String)
    Artist = Column(String)
    Country = Column(String,primary_key=True)
    Years = Column(Integer,primary_key=True)
print ("top1song model created successfully.")
