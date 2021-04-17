from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from db import Base, metadata, engine
from positions.models import Position


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    mail = Column(String, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    position_id = Column(Integer, ForeignKey('positions.id'))
    position = relationship("Position")


metadata.create_all(bind=engine)
users = User.__table__
