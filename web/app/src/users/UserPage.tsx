import React from "react";
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import User from './User';

class UserPage extends React.Component<{}, {
  list: User[],
}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      list: [],
    };
  }

  render() {
    return (
      <div className="App">
        {this.getList()}
      </div>
    );
  }

  get axios() {
    const axiosBase = require('axios');
    return axiosBase.create({
      baseURL: "http://192.168.1.108:8000",
      // baseURL: "http://localhost:8000",
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json'
    });
  }

  componentDidMount() {
    this.axios.get('/users')
      .then((res: { data: User[]; }) => {
        this.setState({
          list: res.data
        });
      })
      .catch((data: any) => {
        console.log(data);
      })
  }

  getList() {
    const columns: GridColDef[] = [
      { field: 'id', headerName: "id", width: 75 },
      { field: 'name', headerName: "name", width: 150 },
      { field: 'mail', headerName: "mail", width: 200 },
      { field: 'position_id', headerName: "position_id", width: 200 },
    ]

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={this.state.list}
          columns={columns}
          pageSize={20}
          //autoHeight={true}
          rowHeight={25}
          hideFooterSelectedRowCount={true}
        />
      </div>
    );
  }
}

export default UserPage;
