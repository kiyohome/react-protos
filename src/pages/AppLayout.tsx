import {
  Anchor,
  AppShell,
  Avatar,
  Burger,
  Divider,
  Footer,
  Group,
  Header,
  Image,
  LoadingOverlay,
  MediaQuery,
  Menu,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';
import { useUser } from '../hooks/User';
import logo from '../logo.svg';
import ErrorPage from './ErrorPage';

const AppLayout = () => {
  const theme = useMantineTheme();

  const [state, setState] = useSetState({
    navbarOpened: false,
    menuOpened: false,
    loading: false,
  });

  const navigate = useNavigate();
  const links = [
    { label: 'Groups', path: '/groups' },
    { label: 'Events', path: '/events' },
  ];

  const [user] = useUser();
  const auth = useAuth();

  const signOut = async () => {
    try {
      setState({ loading: true });
      await auth.signOut();
      showNotification({ message: 'Successful sign out.' });
      window.location.href = '/';
    } finally {
      setState({ loading: false });
    }
  };

  const { reset } = useQueryErrorResetBoundary();

  return (
    <AppShell
      navbarOffsetBreakpoint="md"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="md"
          hidden={!state.navbarOpened}
          width={{ md: 200, lg: 300 }}
        >
          <Navbar.Section>
            {links.map((link) => (
              <Anchor
                key={link.path}
                onClick={() => {
                  setState({ navbarOpened: false });
                  navigate(link.path);
                }}
                component="div"
                underline={false}
                sx={{
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  '&:hover': {
                    backgroundColor: theme.colors.blue[0],
                  },
                }}
                weight="bold"
              >
                {link.label}
              </Anchor>
            ))}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} py="sm" px="md">
          <Group position="apart">
            <MediaQuery largerThan="md" styles={{ display: 'none' }}>
              <Burger
                opened={state.navbarOpened}
                onClick={() => setState({ navbarOpened: !state.navbarOpened })}
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
              <Group spacing={6}>
                <Image src={logo} width={30} height={30} />
                <Title order={4} mt={-3}>
                  App Name
                </Title>
              </Group>
            </Anchor>
            <Menu
              opened={state.menuOpened}
              onOpen={() => setState({ menuOpened: true })}
              onClose={() => setState({ menuOpened: false })}
              control={<Avatar radius="md" size="md" />}
            >
              <Menu.Label>{user.name}</Menu.Label>
              <Divider />
              {auth.isSignedIn ? (
                <Menu.Item onClick={signOut}>Sign out</Menu.Item>
              ) : (
                <>
                  <Menu.Item onClick={() => navigate('/signin')}>
                    Sign in
                  </Menu.Item>
                  <Menu.Item onClick={() => navigate('/signup')}>
                    Sign up
                  </Menu.Item>
                </>
              )}
            </Menu>
          </Group>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Text>Here comes the footer.</Text>
        </Footer>
      }
    >
      <LoadingOverlay visible={state.loading} />
      <ErrorBoundary
        onReset={reset}
        fallback={<ErrorPage />}
        // FIXME: ログ収集に送信するように変更したいです。
        // eslint-disable-next-line no-console
        onError={(error) => console.log(error)}
      >
        <Outlet />
      </ErrorBoundary>
    </AppShell>
  );
};

export default AppLayout;
