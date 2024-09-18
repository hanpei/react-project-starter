import type { User } from '@/features/auth/types/user';
import MockAdapter from 'axios-mock-adapter';
import { api } from './api-request';

export function mockApi() {
  // 创建模拟适配器
  const mock = new MockAdapter(api, { delayResponse: 1000 }); // 1秒延迟

  // 设置模拟响应
  // mock.onGet('/user').reply(401);
  mock.onGet('/user').reply(200, { id: '1', username: '张三' } as User);

}