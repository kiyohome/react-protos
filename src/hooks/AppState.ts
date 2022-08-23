import { useQuery, useQueryClient } from '@tanstack/react-query';

const useAppState = <T>(
  key: string,
  initialData: T
): [T, (newValue: T) => void] => {
  const { data: value } = useQuery<T>([key], {
    enabled: false,
    ...{ initialData },
  });

  const queryClient = useQueryClient();
  const setter = (newValue: T) => {
    queryClient.setQueryData([key], newValue);
  };

  return [value, setter];
};

export default useAppState;
