import request from '@/utils/axios';
// 方法
import { setMd5 } from '@/utils/fns';
// 常量
import { API_DOMAIN } from '@/utils/consts';

// [LOGIN]
// -- 登录
export async function fakeAccountLogin(params) {
  const { username } = params;
  const password = setMd5(params.password);
  // await console.log(username, 'username');
  // await console.log(password, 'password');
  return request(`${API_DOMAIN.default}/api/admin/loginon`, {
    method: 'POST',
    body: { username, password },
  });
}
// 安全退出 accountLoginOut
export async function accountLoginOut(params = {}) {
  return request(`${API_DOMAIN.default}/api/admin/loginout`, {
    method: 'POST',
    body: params,
  });
}
// -- 注册
export async function fakeRegister(params = {}) {
  return request(`${API_DOMAIN.default}/api/server/register`, {
    method: 'POST',
    body: params,
  });
}

// [API]
// -- 客户服务监控
// 获取扩频表>扩频表列表
export async function fetchSpread(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/custom/fetchspread`, {
    params,
  });
}
// 获取扩频表>集中器列表
export async function fetchConcentrator(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/custom/fetchconcentrator`, {
    params,
  });
}
// 获取扩频表>发货记录列表
export async function fetchShipping(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/custom/fetchshipping`, {
    params,
  });
}
// 获取物联网表>物联网表列表
export async function fetchNblot(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/custom/fetchnblot`, {
    params,
  });
}
// 获取物联网表>发货记录列表
export async function fetchNblotShipping(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/custom/nblot/fetchshipping`, {
    params,
  });
}
// 获取异常报警>扩频表列表
export async function fetchUnusualSpread(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/custom/unusual/fetchspread`, {
    params,
  });
}
// 获取异常报警>物联网表列表
export async function fetchUnusualNblot(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/custom/unusual/fetchnblot`, {
    params,
  });
}
// -- 业务数据监控
// 获取扩频表>扩频表列表
export async function fetchDataSpread(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/monitor/fetchspread`, {
    params,
  });
}
// 获取扩频表>集中器列表
export async function fetchDataConcentrator(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/monitor/fetchconcentrator`, {
    params,
  });
}
// 获取物联网表>物联网表列表
export async function fetchDataNblot(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/monitor/fetchnblot`, {
    params,
  });
}
// 更新配置
export async function fetchConfig(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/monitor/spread/fetchconfig`, {
    method: 'POST',
    body: params,
  });
}
// -- 燃气公司运营
// 获取公司列表
export async function fetchCompany(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/company/fetchcompany`, {
    params,
  });
}
// 更新配置
export async function fetchCompanyConfig(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/company/fetchconfig`, {
    method: 'POST',
    body: params,
  });
}
// -- 责任部门（或责任人）
// 获取责任部门（或责任人）
export async function fetchDuty(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/duty/fetchduty`, {
    params,
  });
}
// 更新责任部门（或责任人）
export async function fetchDutyConfig(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/duty/fetchconfig`, {
    method: 'POST',
    body: params,
  });
}
