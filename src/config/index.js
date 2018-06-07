// 密钥
export const SECRETKEY_USER = 'SECRETKEY-BOLTON';
// 接口
// 开发环境
// export const URL_PREFIX = 'http://192.168.5.104:7002/public';
// export const API_DOMAIN = 'http://192.168.5.104:7002';
export const URL_PREFIX = 'http://192.168.5.104:7002/public';
export const API_DOMAIN = {
  novalue: '',
  default: 'http://192.168.5.104:7002',
  online: 'http://192.168.5.93:8081/system-monitor',
};
// 生产环境
// export const URL_PREFIX = 'http://0.0.0.0:7002/public';
// export const API_DOMAIN = 'http://0.0.0.0:7002';
// API
export const API_DATA_NOGET = '什么也没有';
export const API_DATA_LOADING = '努力加载中...';
export const API_DATA_SUCCESS = '获取成功';
export const API_DATA_INFO = '获取数据普通提示';
export const API_DATA_WARNING = '获取数据警告提示';
export const API_DATA_ERROR = '数据获取失败';
export const API_DATA_NETERROR = '无法连接数据库';
export const API_DATA_DEFAULTUSER = '...';
export const API_DATA_TIMEOUTMSG = '连接超时，请稍后重试';
export const API_DATA_TIMEOUT = 30000; // 请求超时的时间(毫秒)
