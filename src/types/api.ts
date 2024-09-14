/**
 * @description API response type
 * 修改为接口返回格式定义
 */
export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};
