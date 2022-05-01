import { MantineProvider } from '@mantine/core';
import RouterConfig from './RouterConfig';
import './App.css';

const App = () => (
  <MantineProvider
    theme={{
      fontFamily: 'Noto Sans JP, sans-serif',
      headings: { fontFamily: 'Noto Sans JP, sans-serif' },
    }}
  >
    <RouterConfig />
  </MantineProvider>
);

export default App;
