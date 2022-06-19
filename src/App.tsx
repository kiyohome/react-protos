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
import { z } from 'zod';

import { useConfig } from './hooks/Config';
import useZod from './hooks/Zod';
import RouterConfig from './RouterConfig';

import './App.css';
import './i18n/config';

const App = () => {
  const config = useConfig();

  const { customErrorMap } = useZod();
  z.setErrorMap(customErrorMap);

  const handleGlobalError = (error: unknown): void => {
    if (error instanceof Error) {
      showNotification({
        message: error.name,
        color: 'red',
        autoClose: config.notificationAutoClose,
      });
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
    fontFamily: config.fontFamily,
    headings: { fontFamily: config.fontFamily },
  };

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <NotificationsProvider
            position={config.notificationPosition}
            autoClose={config.notificationAutoClose}
          >
            <RouterConfig />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
