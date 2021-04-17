from pydantic import BaseModel


class UserCreate(BaseModel):
    """
    insert用のrequest model
    id(自動採番)は入力不要のため定義しない
    """
    name: str
    mail: str
    password: str
    is_active: bool
    position_id: int


class UserSelect(BaseModel):
    """
    select用のrequest model
    selectでは、パスワード不要のため定義しない
    """
    id: int
    name: str
    mail: str
    is_active: bool
    position_id: int


class UserUpdate(BaseModel):
    """
    update用のrequest model
    """
    id: int
    name: str
    mail: str
    password: str
    is_active: bool
    position_id: int


class UserDelete(BaseModel):
    """
    delete用のrequest model
    """
    id: int
    # name: str
    # mail: str
    # is_active: bool
    # position_id: int
