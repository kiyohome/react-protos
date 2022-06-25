import { GraphQLClient } from 'graphql-request';

import { config } from '../AppConfig';
import { useAuth } from './Auth';

const client = new GraphQLClient(config.endpoint);
client.setHeader('apikey', config.anonKey);

const useGraphQLClient = () => {
  const auth = useAuth();
  if (auth.isSignedIn) {
    client.setHeader('Authorization', `Bearer ${auth.accessToken}`);
  }
  return client;
};

export default useGraphQLClient;
