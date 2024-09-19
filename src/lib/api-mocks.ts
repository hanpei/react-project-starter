import type { User } from '@/features/auth/types/user';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';

export function mockApi(api: AxiosInstance) {
  // 创建模拟适配器
  const mock = new MockAdapter(api, { delayResponse: 1000,
    onNoMatch: 'passthrough'

  }); // 1秒延迟

  // 设置模拟响应
  // mock.onGet('/user').reply(401);
  mock.onGet('/user').reply(200, { id: '1', username: '张三' } as User);

}