type Config = {
  // Environment
  url: string;
  anonKey: string;
  endpoint: string;
  persistSession: boolean;
  // UI
  fontFamily: string;
  modalCentered: boolean;
  notificationPosition:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  notificationAutoClose: number;
  // Logic
  autocomplete: 20; // オートコンプリートで表示する数。オートコンプリート時の検索の数です。
  atMost: 50; // GraphQLで操作するコレクション内のレコードの最大数。更新や削除の最大数です。
};

const config = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  endpoint: import.meta.env.VITE_SUPABASE_ENDPOINT,
  persistSession: import.meta.env.VITE_SUPABASE_PERSIST_SESSION === 'yes',
  fontFamily: 'Noto Sans JP, sans-serif',
  modalCentered: true,
  notificationPosition: 'top-right',
  notificationAutoClose: 2000,
} as Config;

export { config };

export type { Config };
