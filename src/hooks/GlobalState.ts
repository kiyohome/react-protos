import { ApiError, createClient, SupabaseClient } from '@supabase/supabase-js';
import { GraphQLClient } from 'graphql-request';
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

  get accessToken(): string {
    return this.supabase.auth.session()?.access_token ?? '';
  }

  isLoggedIn = (): boolean => this.id !== undefined;

  signIn = async (values: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    const { error } = await this.supabase.auth.signIn(values);
    return error === null;
  };

  signOut = async (): Promise<void> => {
    await this.supabase.auth.signOut();
  };

  signUp = async (values: {
    email: string;
    password: string;
    nickname: string;
  }): Promise<ApiError | null> => {
    const { error } = await this.supabase.auth.signUp(
      {
        email: values.email,
        password: values.password,
      },
      {
        data: {
          nickname: values.nickname,
        },
      }
    );
    return error;
  };
}

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const endpoint = import.meta.env.VITE_SUPABASE_ENDPOINT;

const supabaseClient = createClient(url, anonKey);
const user = new User(supabaseClient);

const graphQLClient = new GraphQLClient(endpoint);
graphQLClient.setHeader('apikey', anonKey);

const useUser = (): User => user;

const useGraphQLClient = (): GraphQLClient => {
  if (user.isLoggedIn()) {
    const { accessToken } = user;
    graphQLClient.setHeader('Authorization', `Bearer ${accessToken}`);
  }
  return graphQLClient;
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

export { useUser, useGraphQLClient, useNavigateState };

export type { NavigateState };
