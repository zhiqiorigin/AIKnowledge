// 假设这些类型在 '@/types/user' 文件中定义
import { loginDataType, userInfoType } from '@/types/user';
import http from '@/utils/http';

// api接口 - 此处用了统一保存接口url路径
const api = {
  login: '/auth/login', // 用户登录接口
  register: '/users', // 用户注册接口
  userInfo: '/users/get_userinfo', // 用户信息
};

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return 返回请求登录接口的结果
 */
export function postLoginAPI(data: loginDataType) {
  return http.post<{ access_token: string }>(api.login, data);
}

/**
 * @description: 用户注册
 * @param {loginDataType} data 注册参数
 * @return 注册结果
 */
export function postRegisterAPI(data: loginDataType) {
  return http.post(api.register, data);
}

/**
 * @description: 获取用户信息
 * @return 用户信息
 */
export function getUserInfoAPI() {
  return http.get<userInfoType>(api.userInfo);
}

// 其他可能的 API 接口可以继续在这里添加

// 示例：获取用户列表
// const api = {
//   ...
//   userList: '/api/user/list', // 用户列表接口
// };

// export function getUserListAPI(params?: any) {
//   return http.get<userListType>(api.userList, params);
// }



