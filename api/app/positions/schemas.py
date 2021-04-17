from pydantic import BaseModel


class PositionCreate(BaseModel):
    """
    insert用のrequest model
    id(自動採番)は入力不要のため定義しない
    """
    name: str
    sort_value: float


class PositionSelect(BaseModel):
    """
    select用のrequest model
    selectでは、パスワード不要のため定義しない
    """
    id: int
    name: str
    sort_value: float


class PositionUpdate(BaseModel):
    """
    update用のrequest model
    """
    id: int
    name: str
    sort_value: float


class PositionDelete(BaseModel):
    """
    delete用のrequest model
    """
    id: int
    # name: str
    # sort_value: float
