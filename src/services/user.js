import request from '@/utils/request';
// 方法
import { setMd5 } from '@/utils/fns';
// 常量
// import {} from '@/utils/consts';
// Config
import { API_DOMAIN } from '@/config';

export async function query() {
  return request('/api/users');
}
// 获取当前用户信息
export async function queryCurrent() {
  return request(`${API_DOMAIN.novalue}/api/admin/currentUser`);
}
// 修改登录密码
export async function editPassword(params) {
  const oldpwd = setMd5(params.oldpwd);
  const newpwd = setMd5(params.newpwd);

  return request(`${API_DOMAIN.novalue}/api/admin/updatepwd`, {
    method: 'POST',
    params: { oldpwd, newpwd },
  });
}
// 修改用户信息
export async function editUser(params = {}) {
  return request(`${API_DOMAIN.novalue}/api/admin/updateuser`, {
    method: 'POST',
    params,
  });
}
