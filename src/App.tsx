import { useState } from 'react';
import {
  Anchor,
  AppShell,
  Burger,
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
import logo from './logo.svg';

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Here comes the navigation.</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          <Text>Here comes the footer.</Text>
        </Footer>
      }
      header={
        <Header height={60} p="md">
          <Group position="apart">
            <Anchor
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
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          </Group>
        </Header>
      }
    >
      <Title order={2}>Content Title</Title>
      <Text>Here comes the content.</Text>
    </AppShell>
  );
};

export default App;
