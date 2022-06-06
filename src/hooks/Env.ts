import useGlobalState from './GlobalState';

class Env {
  private values;

  constructor() {
    this.values = {
      url: import.meta.env.VITE_SUPABASE_URL,
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      endpoint: import.meta.env.VITE_SUPABASE_ENDPOINT,
      persistSession: import.meta.env.VITE_SUPABASE_PERSIST_SESSION === 'yes',
    };
  }

  get url() {
    return this.values.url;
  }

  get anonKey() {
    return this.values.anonKey;
  }

  get endpoint() {
    return this.values.endpoint;
  }

  get persistSession() {
    return this.values.persistSession;
  }
}

const useEnv = () => {
  const [env] = useGlobalState<Env>('env', new Env());
  return env;
};

export { useEnv, Env };
