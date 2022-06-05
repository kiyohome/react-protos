import useGlobalState from './GlobalState';

class User {
  id;

  name;

  avatarUrl;

  constructor(id: string, name: string, avatarUrl: string | undefined) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}

const useUser = () =>
  useGlobalState('user', new User('not signed in', 'guest', undefined));

export { useUser, User };
