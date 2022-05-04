import { useQuery, useQueryClient } from 'react-query';
import { Location, useLocation } from 'react-router-dom';

const useGlobalState = <T>(
  key: string,
  initialData?: T
): [T, (newValue: T) => void] => {
  const value = useQuery<T>(key, {
    enabled: false,
    ...(initialData !== undefined ? { initialData } : {}),
  }).data as T;
  const queryClient = useQueryClient();
  const setter = (newValue: T) => {
    queryClient.setQueryData(key, newValue);
  };
  return [value, setter];
};

class User {
  id?: string;

  name: string;

  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name ?? 'guest';
  }

  isLoggedIn = () => this.id !== undefined;
}

const useUser = () => useGlobalState('user', new User());

type NavigateState = {
  state: {
    from: Location;
  };
};

const useNavigateState = () => {
  const location = useLocation();
  return { from: location };
};

export { useUser, User, useNavigateState };

export type { NavigateState };
