import { GraphQLClient } from 'graphql-request';
import { useAuth } from './Auth';
import { Env, useEnv } from './Env';
import useGlobalState from './GlobalState';

const createGraphQLClient = (env: Env) => {
  const client = new GraphQLClient(env.endpoint);
  client.setHeader('apikey', env.anonKey);
  return client;
};

const useGraphQLClient = () => {
  const env = useEnv();
  const [client] = useGlobalState('graphQLClient', createGraphQLClient(env));

  const auth = useAuth();
  if (auth.isSignedIn) {
    client.setHeader('Authorization', `Bearer ${auth.accessToken}`);
  }

  return client;
};

export default useGraphQLClient;
