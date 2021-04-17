from sqlalchemy import Column, Integer, String, Float

from db import Base, metadata, engine


class Position(Base):
    __tablename__ = "positions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    sort_value = Column(Float)


metadata.create_all(bind=engine)
positions = Position.__table__
