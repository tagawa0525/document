from sqlalchemy import Column, Integer, String, Boolean

from db import Base, metadata, engine


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    mail = Column(String, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


metadata.create_all(bind=engine)
users = User.__table__
