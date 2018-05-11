import request from '@/utils/axios';
// 方法
import { setMd5 } from '@/utils/fns';
// 常量
import { API_DOMAIN } from '@/utils/consts';

// [POST]
// 登录
export async function fakeAccountLogin(params) {
  const { username } = params;
  const password = setMd5(params.password);
  // await console.log(username, 'username');
  // await console.log(password, 'password');
  return request(`${API_DOMAIN}/api/server/loginon`, {
    method: 'POST',
    body: { username, password },
  });
}
// 注册
export async function fakeRegister(params = {}) {
  return request(`${API_DOMAIN}/api/server/register`, {
    method: 'POST',
    body: params,
  });
}
// [图片]

// [GET]
// -- 客户服务监控
// 获取扩频表>扩频表列表
export async function fetchSpread(params = {}) {
  return request('/api/fetchspread', {
    params,
  });
}
// 获取扩频表>集中器列表
export async function fetchConcentrator(params = {}) {
  return request('/api/fetchconcentrator', {
    params,
  });
}
// 获取扩频表>发货记录列表
export async function fetchShipping(params = {}) {
  return request('/api/fetchshipping', {
    params,
  });
}
// 获取物联网表>物联网表列表
export async function fetchNblot(params = {}) {
  return request('/api/fetchnblot', {
    params,
  });
}
// 获取物联网表>发货记录列表
export async function fetchNblotShipping(params = {}) {
  return request('/api/fetchnblotshipping', {
    params,
  });
}
// 获取异常报警>扩频表列表
export async function fetchUnusualSpread(params = {}) {
  return request('/api/fetchunusualspread', {
    params,
  });
}
// 获取异常报警>物联网表列表
export async function fetchUnusualNblot(params = {}) {
  return request('/api/fetchunusualnblot', {
    params,
  });
}
// -- 业务数据监控
// 获取扩频表>扩频表列表
export async function fetchDataSpread(params = {}) {
  return request('/api/fetchdataspread', {
    params,
  });
}
// 获取扩频表>集中器列表
export async function fetchDataConcentrator(params = {}) {
  return request('/api/fetchdataconcentrator', {
    params,
  });
}
// 获取物联网表>物联网表列表
export async function fetchDataNblot(params = {}) {
  return request('/api/fetchdatanblot', {
    params,
  });
}
// 更新配置
export async function fetchConfig(params = {}) {
  return request('/api/spread/fetchconfig', {
    method: 'POST',
    body: params,
  });
}
