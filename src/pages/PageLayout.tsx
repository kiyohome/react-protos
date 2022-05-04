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
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import { useUser } from '../hooks/GlobalState';

const PageLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [user] = useUser();
  const navigate = useNavigate();
  const links = [
    { label: 'Groups', path: '/groups' },
    { label: 'Events', path: '/events' },
  ];
  const logout = () => {
    window.location.href = '/';
  };
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 150, lg: 150 }}
        >
          <Navbar.Section>
            {links.map((link) => (
              <Button
                variant="subtle"
                size="md"
                onClick={() => {
                  setOpened(false);
                  navigate(link.path);
                }}
                key={link.path}
                fullWidth
              >
                {link.label}
              </Button>
            ))}
            {user.isLoggedIn() && (
              <Button
                variant="subtle"
                size="md"
                onClick={logout}
                key="/logout"
                fullWidth
              >
                Logout
              </Button>
            )}
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          <Text>Here comes the footer.</Text>
        </Footer>
      }
      header={
        <Header height={60} py="sm" px="md">
          <Group position="apart">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
            <Anchor
              component={Link}
              to="/"
              variant="text"
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Image src={logo} width={30} height={30} />
              <Title order={4} ml="6px" mt="-3px">
                App Name
              </Title>
            </Anchor>
            <Avatar radius="md" size="md" />
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default PageLayout;