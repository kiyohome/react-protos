import { useQuery, useQueryClient } from 'react-query';
import User from '../models/User';

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

const useUser = () => useGlobalState('user', new User());

export default useUser;
