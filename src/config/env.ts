import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
});

const env = envSchema.parse({
  API_URL: import.meta.env.VITE_APP_API_URL,
});

export { env };
