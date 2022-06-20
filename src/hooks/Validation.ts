import { z } from 'zod';

const rules = {
  email: z.string().email(),
  nickname: z.string().max(40),
  password: z.string().max(40),
};

const useValidation = () => ({ rules });

export default useValidation;
