from utils.dbutils import get_connection
from databases import Database
import hashlib

from fastapi import APIRouter, Depends
from typing import List
from starlette.requests import Request

from .models import users
from .schemas import UserCreate, UserUpdate, \
    UserDelete, UserSelect

router = APIRouter()


@router.post("/users/create", response_model=UserSelect)
async def users_create(
    user: UserCreate,
    database: Database = Depends(get_connection)
):
    """
    社員を新規登録する
    """
    # validatorは省略
    query = users.insert()
    values = get_users_insert_dict(user)
    ret = await database.execute(query, values)
    return await users_findone(ret, database)


@router.get("/users/", response_model=List[UserSelect])
async def users_findall(
    request: Request,
    database: Database = Depends(get_connection)
):
    """
    社員を全件検索して「UserSelect」のリストをjsonにして返す
    """
    query = users.select()
    return await database.fetch_all(query)


@router.get("/users/find", response_model=UserSelect)
async def users_findone(
    id: int,
    database: Database = Depends(get_connection)
):
    """
    社員をidで検索して「UserSelect」をjsonにして返す
    """
    query = users.select().where(users.columns.id == id)
    return await database.fetch_one(query)


@router.post("/users/update", response_model=UserSelect)
async def users_update(
    user: UserUpdate, database:
    Database = Depends(get_connection)
):
    """
    社員を更新する
    """
    # validatorは省略
    query = users.update().where(users.columns.id == user.id)
    values = get_users_insert_dict(user)
    ret = await database.execute(query, values)
    return await users_findone(ret, database)


@router.post("/users/delete")
async def users_delete(
    user: UserDelete,
    database: Database = Depends(get_connection)
):
    """
    社員を削除する
    """
    print(user)
    query = users.delete().where(users.columns.id == user.id)
    ret = await database.execute(query)
    return {"id": ret}


def get_users_insert_dict(user):
    """
    入力したパスワード（平文）をハッシュ化して返す
    """
    pwhash = hashlib.sha256(user.password.encode('utf-8')).hexdigest()
    values = user.dict()
    values.pop("password")
    values["hashed_password"] = pwhash
    return values
