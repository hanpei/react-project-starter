import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url(),
  MOCK_API: z.preprocess((val) => val === 'true', z.boolean()).optional(),
});

const env = envSchema.parse({
  API_URL: import.meta.env.VITE_APP_API_URL,
  MOCK_API: import.meta.env.VITE_APP_MOCK_API,
});

export { env };
