import { useQuery, useQueryClient } from 'react-query';

const useGlobalState = <T>(
  key: string,
  initialData: T
): [T, (newValue: T) => void] => {
  const { data: value } = useQuery<T>(key, {
    enabled: false,
    ...{ initialData },
  });

  const queryClient = useQueryClient();
  const setter = (newValue: T) => {
    queryClient.setQueryData(key, newValue);
  };

  return [value as T, setter];
};

export default useGlobalState;
