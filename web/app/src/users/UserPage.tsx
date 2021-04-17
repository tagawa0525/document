import React from "react";
import { Grid, TextField, Button } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

import User from './User';

class UserPage extends React.Component<{}, {
  list: User[],
  input: User,
}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      list: [],
      input: new User(),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App">
        {this.getList()}
        <br></br>

        <InputForm
          user={this.state.input}
          onChange={this.handleInputChange}
        />
        <br></br>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Create />}
          onClick={this.handleSubmit}
        > CREATE </Button>
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
  handleInputChange(
    itemName: keyof User,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const user = this.state.input;
    user[itemName] = e.target.value;
    this.setState({
      input: user
    });
  }

  handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const userJson = JSON.stringify(this.state.input);

    this.axios.post("/users/create", userJson)
      .then((res: { data: User; }) => {
        const list = this.state.list.slice();
        list.push(res.data);
        this.setState({
          list: list,
          input: new User(),
        });
      })
      .catch((data: any) => {
        console.log(data)
      });
  }
}

function InputForm(props: {
  user: User;
  onChange: (
    itemName: keyof User,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}) {
  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="name"
            value={props.user["name"]}
            onChange={(e) => props.onChange("name", e)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="mail"
            value={props.user["mail"]}
            onChange={(e) => props.onChange("mail", e)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="password"
            value={props.user["password"]}
            onChange={(e) => props.onChange("password", e)}
          />
        </Grid>

      </Grid>
    </form>
  )
}

export default UserPage;
