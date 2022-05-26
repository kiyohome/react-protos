import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import RouterConfig from './RouterConfig';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider
      theme={{
        fontFamily: 'Noto Sans JP, sans-serif',
        headings: { fontFamily: 'Noto Sans JP, sans-serif' },
      }}
    >
      <NotificationsProvider position="top-center" autoClose={2000}>
        <RouterConfig />
      </NotificationsProvider>
    </MantineProvider>
  </QueryClientProvider>
);

export default App;
