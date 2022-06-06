import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
    [theme.fn.smallerThan('sm')]: {
      paddingTop: 40,
      paddingBottom: 40,
    },
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors.gray[2],
    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

type Props = {
  label: string;
  title: string;
  description: string;
};

const ErrorPageLayout = ({ label, title, description }: Props) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>{label}</div>
      <Title className={classes.title}>{title}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {description}
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={() => navigate('/')}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};

export default ErrorPageLayout;
