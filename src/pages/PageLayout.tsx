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
import useSupabase from '../hooks/Supabase';

const PageLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [user] = useUser();
  const navigate = useNavigate();
  const links = [
    { label: 'Groups', path: '/groups' },
    { label: 'Events', path: '/events' },
  ];
  const supabase = useSupabase();
  const signOut = async () => {
    await supabase.auth.signOut();
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
              <Anchor
                key={link.path}
                onClick={() => {
                  setOpened(false);
                  navigate(link.path);
                }}
                component="div"
                underline={false}
                mb={6}
              >
                {link.label}
              </Anchor>
            ))}
            {user.isLoggedIn() && (
              <Anchor
                key="signOut"
                onClick={signOut}
                component="div"
                underline={false}
                mb={6}
              >
                Sign out
              </Anchor>
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
              <Title order={4} ml={6} mt={-3}>
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
