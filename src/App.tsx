import { useState } from 'react';
import {
  Anchor,
  AppShell,
  Avatar,
  Burger,
  Button,
  Footer,
  Group,
  Header,
  Image,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import RouterConfig from './RouterConfig';

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
