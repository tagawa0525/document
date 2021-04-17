from utils.dbutils import get_connection
from databases import Database

from fastapi import APIRouter, Depends
from typing import List
from starlette.requests import Request

from .models import positions
from .schemas import PositionCreate, PositionUpdate, \
    PositionDelete, PositionSelect

router = APIRouter()


@router.post("/positions/create", response_model=PositionSelect)
async def positions_create(
    position: PositionCreate,
    database: Database = Depends(get_connection)
):
    """
    役職を新規登録する
    """
    # validatorは省略
    query = positions.insert()
    ret = await database.execute(query, position.dict())
    return await positions_findone(ret, database)


@router.get("/positions/", response_model=List[PositionSelect])
async def positions_findall(
    request: Request,
    database: Database = Depends(get_connection)
):
    """
    役職を全件検索して「PositionSelect」のリストをjsonにして返す
    """
    query = positions.select()
    return await database.fetch_all(query)


@router.get("/positions/find", response_model=PositionSelect)
async def positions_findone(
    id: int,
    database: Database = Depends(get_connection)
):
    """
    役職をidで検索して「PositionSelect」をjsonにして返す
    """
    query = positions.select().where(positions.columns.id == id)
    return await database.fetch_one(query)


@router.post("/positions/update", response_model=PositionSelect)
async def positions_update(
    position: PositionUpdate, database:
    Database = Depends(get_connection)
):
    """
    役職を更新する
    """
    # validatorは省略
    query = positions.update().where(positions.columns.id == position.id)
    ret = await database.execute(query, position.dict())
    return await positions_findone(ret, database)


@router.post("/positions/delete")
async def positions_delete(
    position: PositionDelete,
    database: Database = Depends(get_connection)
):
    """
    役職を削除する
    """
    print(position)
    query = positions.delete().where(positions.columns.id == position.id)
    ret = await database.execute(query)
    return {"id": ret}
