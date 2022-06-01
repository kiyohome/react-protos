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
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import logo from '../logo.svg';
import { useUser } from '../hooks/GlobalState';
// import useSupabase from '../hooks/Supabase';

const PageLayout = () => {
  const theme = useMantineTheme();
  const [state, setState] = useSetState({
    navbarOpened: false,
    menuOpened: false,
    loading: false,
  });
  const [user] = useUser();
  const navigate = useNavigate();
  const links = [
    { label: 'Groups', path: '/groups' },
    { label: 'Events', path: '/events' },
  ];
  // const supabase = useSupabase();
  const signOut = async () => {
    try {
      setState({ loading: true });
      // await supabase.auth.signOut();
      showNotification({ message: 'Successful sign out.' });
      window.location.href = '/';
    } finally {
      setState({ loading: false });
    }
  };
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!state.navbarOpened}
          width={{ sm: 150, lg: 150 }}
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
                mb={6}
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
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
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
              {user.isLoggedIn() ? (
                <>
                  <Menu.Label>Signed in as {user.name}</Menu.Label>
                  <Divider />
                  <Menu.Item onClick={signOut}>Sign out</Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Label>Not signed in</Menu.Label>
                  <Divider />
                  <Menu.Item onClick={() => navigate('/signin')}>
                    Sign in
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
      <Outlet />
    </AppShell>
  );
};

export default PageLayout;
