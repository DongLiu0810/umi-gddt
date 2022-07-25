import { useRequest as useRequestUmi } from 'ahooks';
import { message } from 'antd';

function useRequest(service: any, refreshDeps = [], originOptions: any = {}) {
  // 第二参数传options对象，originOptions将被覆盖
  if (refreshDeps.constructor === Object) {
    originOptions = refreshDeps;
    refreshDeps = [];
  }

  const options: any = {
    ...originOptions,
  };
  if (Array.isArray(refreshDeps) && refreshDeps.length) {
    options.refreshDeps = refreshDeps;
  }
  options.formatResult = (response: any) => {
    if (originOptions.showOriginRes) {
      return response;
    }
    if (response && response.code === 0) {
      return response.data;
    }
    if (originOptions.showMessage !== false && response?.message) {
      message.error(response.message);
    }
    if (originOptions.showError) {
      return new Error();
    }
    return undefined;
  };
  if (typeof originOptions.formatResult === 'function') {
    options.formatResult = originOptions.formatResult;
  }
  return useRequestUmi((...args) => {
    const ret = service(...args);
    if (ret?.then && typeof ret.then === 'function') {
      return ret;
    }
    return Promise.resolve();
  }, options);
}

export default useRequest;
