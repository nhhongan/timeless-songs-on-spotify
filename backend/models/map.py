from sqlalchemy import Column, Integer, String, BigInteger
from database.__init__ import Base

class Map(Base):
    __tablename__ = 'country_america'

    Artist_and_title = Column(String, primary_key=True)
    StreamCount = Column(Integer)
    Country = Column(String,primary_key=True)

print ("Map model created successfully.")
