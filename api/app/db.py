from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from databases import Database


DATABASE = 'postgresql'
USER = 'postgres'
PASSWORD = 'p@ssw0rd'
HOST = 'db'
PORT = '5432'
DB_NAME = 'document_db'

DATABASE_URL = '{}://{}:{}@{}:{}/{}'.format(
    DATABASE, USER, PASSWORD, HOST, PORT, DB_NAME)

database = Database(DATABASE_URL, min_size=5, max_size=20)

Base = declarative_base()
metadata = Base.metadata

ECHO_LOG = False
engine = create_engine(DATABASE_URL, echo=ECHO_LOG)
