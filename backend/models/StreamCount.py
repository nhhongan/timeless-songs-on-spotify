from sqlalchemy import Column, Integer, String, BigInteger, Double
from database.__init__ import Base,engine

class StreamCount(Base):
    __tablename__ = 'streamcount_eachyear'

    Artist = Column(String, primary_key=True)
    Title = Column(String, primary_key=True)
    Streams = Column(BigInteger)
    Daily = Column(Double)
    Year = Column(Integer)
    Genre = Column(String)
    Country = Column(String)
    Month = Column(String)
print ("StreamCount model created successfully.")
