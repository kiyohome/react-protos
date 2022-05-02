class User {
  id?: string;

  name: string;

  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name ?? 'guest';
  }

  isLoggedIn = () => this.id !== undefined;
}

export default User;
