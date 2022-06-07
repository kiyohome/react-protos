import { MantineProvider } from '@mantine/core';
import {
  NotificationsProvider,
  showNotification,
} from '@mantine/notifications';
import React from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import RouterConfig from './RouterConfig';
import './App.css';

const handleGlobalError = (error: unknown): void => {
  if (error instanceof Error) {
    showNotification({ message: error.message, color: 'red' });
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
    },
  },
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
});

const theme = {
  fontFamily: 'Noto Sans JP, sans-serif',
  headings: { fontFamily: 'Noto Sans JP, sans-serif' },
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <NotificationsProvider position="top-center" autoClose={2000}>
          <RouterConfig />
        </NotificationsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
