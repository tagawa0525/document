interface User {
  id: number;
  name: string;
  mail: string;
  password: string;
  is_active: boolean;
  position_id: number;
  [key: string]: string | number | boolean;
}

class User {
  constructor() {
    this.name = "山田　太郎";
    this.mail = "yamada@sample.com";
    this.password = "p@ssw0rd";
    this.is_active = true;
    this.position_id = 1;
  }
}

export default User;
