import { GraphQLClient } from 'graphql-request';

import { useAuth } from './Auth';
import { Config, useConfig } from './Config';
import useGlobalState from './GlobalState';

const createGraphQLClient = (config: Config) => {
  const client = new GraphQLClient(config.endpoint);
  client.setHeader('apikey', config.anonKey);
  return client;
};

const useGraphQLClient = () => {
  const config = useConfig();
  const [client] = useGlobalState('graphQLClient', createGraphQLClient(config));

  const auth = useAuth();
  if (auth.isSignedIn) {
    client.setHeader('Authorization', `Bearer ${auth.accessToken}`);
  }

  return client;
};

export default useGraphQLClient;
