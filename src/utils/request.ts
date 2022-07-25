/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';

/**
 * 异常处理程序
 */
const errorHandler = () => {};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// 对于http状态码是200，但是返回response是错误的处理
request.interceptors.response.use(async (response) => {
  if (response.status >= 200 && response.status < 300) {
    const res = await response.clone().json();
    if (res.code === 40001) window.location.hash = '/login';
    return {
      ...res,
      msg: res.message,
      status: res.code === 0,
    };
  } else return { status: false };
});

request.interceptors.request.use((url, options) => {
  const accessToken =
    window.localStorage.getItem('hyperchainToken') ||
    'abcdefghijklmnopqrstuvwxyz';
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };
  return {
    url,
    options: { ...options, headers },
  };
});

export default request;
