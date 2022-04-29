import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'Noto Sans JP, sans-serif',
        headings: { fontFamily: 'Noto Sans JP, sans-serif' },
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
