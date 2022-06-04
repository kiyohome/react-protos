import { SupabaseClient } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from 'react-query';
import { Location, useLocation } from 'react-router-dom';
import useSupabase from './Supabase';

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
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  get id(): string | undefined {
    return this.supabase.auth.session()?.user?.id;
  }

  get name(): string {
    return (
      (this.supabase.auth.session()?.user?.user_metadata.nickname as string) ??
      'guest'
    );
  }

  isLoggedIn = (): boolean => this.id !== undefined;
}

const useUser = () => {
  const supabase = useSupabase();
  return useGlobalState('user', new User(supabase));
};

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
