import type { AuthedUser } from '../types/user';
const testUser: AuthedUser = {
  id: '1',
  username: 'test',
};

export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // // 随机决定是否失败
  // const isFailure = Math.random() < 0.5;

  // if (isFailure) {
  //   throw new Error('登录失败');
  // }

  const token = generateAuthToken();

  return { token, user: testUser } as const;
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
