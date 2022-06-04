import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import RouterConfig from './RouterConfig';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
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
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
