import moment from 'moment';
import { request } from 'umi';

// 每三位加逗号，num为保留几位小数
export const formatNumber = (num = 0, fixNum = 0) => {
  if (Number.isNaN(Number(num))) {
    return num;
  }
  return Number(num)
    .toFixed(fixNum)
    .toString()
    .replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
};
// 获取百分比
export const getPercentFormat = (value: number = 0, totalValue: number = 0) => {
  return totalValue <= 0
    ? '0%'
    : Math.round((value / totalValue) * 10000) / 100.0 + '%';
};

//求和
export const getSum = (value: Array<any> = []) => {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum += value[i];
  }
  return sum;
};

export const formatDate = (
  date: string | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  return moment(date || moment()).format(format);
};

const dataType = (data: any) => {
  const str = Object.prototype.toString.call(data);
  const type = str.slice(8, -1);
  return type.toLocaleLowerCase();
};

// 判断是否为空
const isEmpty = (obj: any) => {
  let type = dataType(obj);
  if (type === 'boolean') return false;
  if (type === 'string') return obj.length === 0;
  if (type === 'number') return false;
  if (type === 'array') return obj.length === 0;
  if (type === 'object') return Object.keys(obj).length === 0;
  if (!obj) return true;
};

/**
 * 传入内容为空时，用指定符号或内容代替传入内容
 */
export const useSymbolInsteadOfNull = (
  str: number | string,
  symbol: number | string = 0,
) => {
  if (isEmpty(str)) return symbol;
  return str;
};

/**
 * 字典转数组
 * @param {Object} obj
 */
export const dict2Array = (obj: any, value = 'value', label = 'label') => {
  const arr: Array<any> = [];
  Object.keys(obj).map((key) => {
    arr.push({
      [value]: key,
      [label]: obj[key],
    });
  });
  return arr;
};

/**
 * 是否对象
 * @param {*} obj
 */
const isObject = (obj: any) => {
  return typeof obj === 'object' && obj != null;
};

/**
 * 简单深拷贝
 * @param {*} source
 */
export const deepClone = (source: any) => {
  // 非对象返回自身
  if (!isObject(source)) return source;
  const target: any = dataType(source) === 'array' ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

/**
 * 函数防抖
 * @param {Function} fn 待执行的方法
 * @param {Number} wait 延迟时间
 * 常用于窗口的resize、scroll，输入框内容校验等，防止过高频率引起的卡顿
 * 示例：window.addEventListener('scroll', debounce(handle, 1000));
 */
export const debounce = (fn: () => any, delay: number) => {
  let timeout: any = null;
  return function () {
    const args: any = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * 过滤对象中值为空的属性
 */
const filterParams = (opts: any) => {
  if (dataType(opts) !== 'object') return opts;
  const res: any = {};
  Object.keys(opts).forEach((prop) => {
    if (!opts[prop] && typeof opts[prop] !== 'number') return;
    res[prop] = opts[prop];
  });
  return res;
};

export const downLoad = (url: string, params: any) => {
  params = filterParams(params);
  if (dataType(params) === 'object' && !isEmpty(params))
    //@ts-ignore
    url = `${url}?${qs.stringify(params)}`;
  window.open(url, '_blank');
  // 一下方法可以给下载的文件修改名称
  // params = filterParams(params);
  // if (dataType(params) === 'object' && !isEmpty(params)) url = `${url}?${qs.stringify(params)}`;
  // fetch(url).then((res) =>
  //   res.blob().then((blob) => {
  //     var a = document.createElement('a');
  //     var link = window.URL.createObjectURL(blob);
  //     a.href = link;
  //     a.download = fileName;
  //     a.click();
  //     window.URL.revokeObjectURL(link);
  //   }),
  // );
};
// 获取颜色变化点位
export const getPercent = (rangeLimit: any, value: number) => {
  if (value < rangeLimit.min) return 0;
  if (value > rangeLimit.max) return 1;
  const step = rangeLimit.max - rangeLimit.min;
  return (value - rangeLimit.min) / step;
};
export const strCut = (data: string, startOffset = 15, endOffset = 8) => {
  if (!data) {
    return '';
  }
  if (typeof data === 'number') {
    const dataString = String(data);
    return (
      dataString.substring(0, startOffset) +
      '...' +
      dataString.substring(dataString.length - endOffset, dataString.length)
    );
  }
  return (
    data.substring(0, startOffset) +
    '...' +
    data.substring(data.length - endOffset, data.length)
  );
};

//下载文件
export const downLoadFile = async (url: string, params: any) => {
  const options: any = {
    getResponse: true,
    method: 'get',
    params: params,
    responseType: 'blob',
  };
  console.log(await request(url, options), '===');
  return request(url, options);
};
