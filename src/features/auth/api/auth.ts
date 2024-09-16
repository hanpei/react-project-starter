import type { User } from '../types/user';
import { api } from '@/lib/api-request';

const testUser: User = {
  id: '1',
  username: 'test',
};

export async function getUser(): Promise<User> {
  const res = await api.get<User>('/user');
  return res.data;
}

// TODO: 实际的登录逻辑
export async function login() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const token = generateAuthToken();

  return { token, user: testUser } as const;
}

function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}
