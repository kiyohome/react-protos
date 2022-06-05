interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ENDPOINT: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_PERSIST_SESSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
