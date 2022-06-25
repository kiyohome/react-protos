import useAppState from './AppState';

class User {
  private _id;

  private _name;

  private _avatarUrl;

  constructor(id: string, name: string, avatarUrl: string | undefined) {
    this._id = id;
    this._name = name;
    this._avatarUrl = avatarUrl;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get avatarUrl() {
    return this._avatarUrl;
  }
}

const guest = new User('not signed in', 'guest', undefined);

const useUser = () => useAppState('user', guest);

export { useUser, User };
