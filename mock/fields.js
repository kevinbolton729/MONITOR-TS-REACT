const group = {
  dataMonitor: '业务数据监控',
  custom: '客户服务监控',
};

const api = '接口';
const field = '字段';
const type = '类型';
const number = 'Number';

const fieldType = `${field}${type}`;

// 接口
export const apiCustom = `[${group.custom}] ${api}:`; // [客户服务监控] 接口:
export const apiDataMonitor = `[${group.dataMonitor}] ${api}:`; // [业务数据监控] 接口:

// 参数[字段]
export const typeNumer = `[${fieldType}: ${number}]`; // [字段类型: Number]
