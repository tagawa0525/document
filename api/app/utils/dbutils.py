from starlette.requests import Request


def get_connection(request: Request):
    """
    middlewareでrequestに格納したconnection(Databaseオブジェクト)を返す
    """

    return request.state.connection
