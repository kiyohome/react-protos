import { z } from 'zod';

const rules = {
  users: {
    email: z.string().email(),
    password: z.string().max(40),
  },
  profiles: {
    nickname: z.string().max(40),
  },
  groups: {
    name: z.string().max(40),
    owner: z.string().uuid(),
  },
};

export default rules;
