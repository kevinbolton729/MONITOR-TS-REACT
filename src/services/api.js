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
// 获取扩频表列表
export async function fetchSpread(params = {}) {
  return request('/api/fetchspread', {
    params,
  });
}
// 获取集中器列表
export async function fetchConcentrator(params = {}) {
  return request('/api/fetchconcentrator', {
    params,
  });
}
