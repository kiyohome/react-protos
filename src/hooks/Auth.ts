import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { config } from '../AppConfig';

type Profile = {
  id: string;
  nickname: string;
  avatar_url: string;
};

/*
 * ユーザーセッションの値を取得する場合は先にisSignedInで判定してください。
 */
class Auth {
  private supabase: SupabaseClient;

  constructor(url: string, apiKey: string, persistSession: boolean) {
    this.supabase = createClient(url, apiKey, { persistSession });
  }

  get isSignedIn() {
    return this.supabase.auth.session()?.access_token !== undefined;
  }

  get accessToken() {
    return Auth.avoidUndefined(this.supabase.auth.session()?.access_token);
  }

  get id() {
    return Auth.avoidUndefined(this.supabase.auth.user()?.id);
  }

  /*
   * isSignedInで判定してからユーザーセッションの値を取得することを前提に、
   * undefinedを返さないようにしています。
   */
  private static avoidUndefined = (value: string | undefined): string =>
    value ?? 'not happen';

  profile = async () => {
    const { data, error } = await this.supabase
      .from<Profile>('profiles')
      .select()
      .eq('id', this.id)
      .single();
    if (error) throw error;
    return data;
  };

  signIn = async (values: { email: string; password: string }) => {
    const { error } = await this.supabase.auth.signIn(values);
    return error === null;
  };

  signOut = async () => {
    await this.supabase.auth.signOut();
  };

  signUp = async (values: {
    email: string;
    password: string;
    nickname: string;
  }) => {
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

const auth = new Auth(config.url, config.anonKey, config.persistSession);

const useAuth = () => auth;

export { useAuth, Auth };
