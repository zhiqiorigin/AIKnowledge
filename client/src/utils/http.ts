import request from './request/request.ts';
import { AxiosRequestConfig } from 'axios';

/**
 * 网络请求响应格式，T 是具体的接口返回类型数据
 */
interface CustomSuccessData<T> {
  code?: number;
  msg?: string;
  message?: string;
  data: T;
  [keys: string]: any;
}

/**
 * @description: 封装get请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const get = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  const mergedConfig: AxiosRequestConfig = {
    method: 'get', // `method` 是创建请求时使用的方法
    url, // `url` 是用于请求的服务器 URL
    ...config,
  };
  if (params) {
    mergedConfig.params = params;
  }
  return request(mergedConfig);
};

/**
 * @description: 封装post请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const post = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  const mergedConfig: AxiosRequestConfig = {
    method: 'post',
    url,
    ...config,
  };
  if (data) {
    mergedConfig.data = data;
  }
  return request(mergedConfig);
};

/**
 * @description: 封装patch请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const patch = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  const mergedConfig: AxiosRequestConfig = {
    method: 'patch',
    url,
    ...config,
  };
  if (data) {
    mergedConfig.data = data;
  }
  return request(mergedConfig);
};

/**
 * @description: 封装delete请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const remove = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  const mergedConfig: AxiosRequestConfig = {
    method: 'delete',
    url,
    ...config,
  };
  if (params) {
    mergedConfig.params = params;
  }
  return request(mergedConfig);
};

// 包裹请求方法的容器,使用 http 统一调用
const http = {
  get,
  post,
  patch,
  remove,
};

export default http;


// // 使用案例
// (async () => {
//   try {
//     // GET 请求示例
//     const userData = await http.get<{ id: number; name: string }>('/api/user', { userId: 1 });
//     console.log('GET Response:', userData);

//     // POST 请求示例
//     const postData = await http.post<{ success: boolean }>('/api/data', { key: 'value' });
//     console.log('POST Response:', postData);

//     // PATCH 请求示例
//     const patchData = await http.patch<{ success: boolean }>('/api/data/1', { key: 'new_value' });
//     console.log('PATCH Response:', patchData);

//     // DELETE 请求示例
//     const deleteData = await http.remove<{ success: boolean }>('/api/data/1');
//     console.log('DELETE Response:', deleteData);
//   } catch (error) {
//     console.error('Request failed:', error);
//   }
// })();



