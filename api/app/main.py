from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import database
from starlette.requests import Request

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    # 起動時にDatabaseに接続する。
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    # 終了時にDatabaseを切断する。
    await database.disconnect()


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    # middleware state.connectionにdatabaseオブジェクトをセットする。
    request.state.connection = database
    response = await call_next(request)
    return response
