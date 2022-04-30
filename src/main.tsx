import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouterConfig from './RouterConfig';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'Noto Sans JP, sans-serif',
        headings: { fontFamily: 'Noto Sans JP, sans-serif' },
      }}
    >
      <RouterConfig />
    </MantineProvider>
  </React.StrictMode>
);
