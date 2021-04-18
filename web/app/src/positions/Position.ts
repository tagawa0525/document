interface Position {
  id: number;
  name: string;
  sort_value: number;
  [key: string]: string | number;
}

class Position {
  constructor() {
    this.name = "部長";
    this.sort_value = 3.5;
  }
}

export default Position;
