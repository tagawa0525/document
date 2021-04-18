import React from "react";
import { Grid, TextField, Button } from '@material-ui/core';
import { Create, Update, Delete } from '@material-ui/icons';
import { DataGrid, GridColDef, GridRowSelectedParams } from '@material-ui/data-grid';

import Position from './Position';

class PositionPage extends React.Component<{}, {
  list: Position[],
  input: Position,
}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      list: [],
      input: new Position(),
    };
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render() {
    return (
      <div className="App">
        {this.getList()}
        <br></br>

        <InputForm
          position={this.state.input}
          onChange={this.handleInputChange}
        />
        <br></br>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Create />}
          onClick={this.handleSubmit}
        > CREATE </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
          onClick={(e) => this.handleDelete(this.state.input, e)}
        > DELETE </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Update />}
          onClick={(e) => this.handleUpdate(this.state.input, e)}
        > UPDATE </Button>
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
    this.axios.get('/positions')
      .then((res: { data: Position[]; }) => {
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
      { field: 'sort_value', headerName: "sort_value", width: 150 },
    ]

    return (
      <div style={{ height: 250, width: '100%' }}>
        <DataGrid
          rows={this.state.list}
          columns={columns}
          pageSize={5}
          //autoHeight={true}
          rowHeight={25}
          hideFooterSelectedRowCount={true}
          onRowSelected={(newSelection) => {
            this.handleSelectionChange(newSelection);
          }}
        />
      </div>
    );
  }

  handleSelectionChange(newSelection: GridRowSelectedParams) {
    const positionJson = this.state.list.find(function (element, index, array) {
      return (element.id === newSelection.data.id)
    });
    const position = Object.assign(new Position(), positionJson);
    this.setState({
      input: position
    })
  }

  handleInputChange(
    itemName: keyof Position,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const position = this.state.input;
    position[itemName] = e.target.value;
    this.setState({
      input: position
    });
  }

  handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const positionJson = JSON.stringify(this.state.input);

    this.axios.post("/positions/create", positionJson)
      .then((res: { data: Position; }) => {
        const list = this.state.list.slice();
        list.push(res.data);
        this.setState({
          list: list,
          input: new Position(),
        });
      })
      .catch((data: any) => {
        console.log(data)
      });
  }

  handleUpdate(position: Position, e: { preventDefault: () => void; }) {
    e.preventDefault();
    const positionJson = JSON.stringify(position);
    this.axios.post('/positions/update', positionJson)
      .then(() => {
        const list = this.state.list.slice();
        const index = list.findIndex(elem => elem["id"] === position.id);
        list.splice(index, 1, position);

        this.setState({
          list: list,
          input: new Position(),
        });
      })
      .catch((data: any) => {
        console.log(data);
      });
  }

  handleDelete(position: Position, e: { preventDefault: () => void; }) {
    e.preventDefault();
    const positionJson = JSON.stringify(position);
    this.axios.post("/positions/delete/", positionJson)
      .then(() => {
        const index = this.state.list.findIndex(elem => elem.id === position.id);
        const list = this.state.list.slice();
        list.splice(index, 1);

        this.setState({
          list: list,
          input: new Position(),
        });
      })
      .catch((data: any) => {
        console.log(data);
      });
  }
}

function InputForm(props: {
  position: Position;
  onChange: (
    itemName: keyof Position,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}) {
  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="name"
            value={props.position["name"]}
            onChange={(e) => props.onChange("name", e)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="sort_value"
            value={props.position["sort_value"]}
            onChange={(e) => props.onChange("sort_value", e)}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default PositionPage;
