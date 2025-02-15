import axios, { AxiosError, AxiosResponse } from 'axios';
import { message } from 'antd'; // 导入 antd 的 message 组件

// 假设 useSettingStore 是一个自定义的状态管理 store，这里我们假设它是一个简单的对象
// 实际项目中请根据实际情况导入或实现这个 store
const useSettingStore = {
  getState: () => ({
    token: localStorage.getItem('token') || '', // 假设 token 存储在 localStorage 中
  }),
};

// 创建新的 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || '/', // 设置基础 URL
  timeout: 5000, // 设置超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 直接从 localStorage 获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    message.loading({ content: '加载中...', key: 'loading' });
    return config;
  },
  (error) => {
    message.destroy();
    message.error('请求错误，请稍后再试');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    message.destroy(); // 关闭所有提示
    const { status, data } = response;
    console.log(status, data);
    if (status >= 200 && status < 300) {
      // 修改这里：根据你的API返回结构进行调整
      if (data.status === 200) {  // 检查返回的status字段
        return data.data;  // 返回实际的数据部分
      } else {
        message.error(data.message || '未知错误');
        return Promise.reject(data);
      }
    }
    return response;
  },
  (error: AxiosError) => {
    message.destroy();
    if (error.message.includes('Network Error')) {
      message.error('网络超时');
    }

    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          message.error('请求参数错误');
          break;
        case 401:
          message.error('未授权，请重新登录');
          break;
        default:
          message.error('请求失败，请稍后再试');
      }
    }
    return Promise.reject(error);
  }
);

export default service;