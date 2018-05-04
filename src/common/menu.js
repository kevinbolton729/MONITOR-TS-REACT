import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Dashboard',
    icon: 'desktop',
    path: 'dashboard',
    children: [
      {
        name: '工作台',
        path: 'workspace',
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '监控中心',
    icon: 'line-chart',
    path: 'service',
    children: [
      {
        name: '服务监控',
        path: 'business',
      },
      {
        name: '业务数据监控',
        path: 'datamonitor',
      },
      {
        name: '客户服务监控',
        path: 'custom',
      },
    ],
  },
  {
    name: '运营管理',
    icon: 'bulb',
    path: 'operation',
    children: [
      {
        name: '燃气公司运营',
        path: 'company',
      },
    ],
  },
  {
    path: 'profile',
    hideInMenu: true,
    children: [
      {
        path: 'datamonitor',
        children: [
          {
            name: '详情',
            path: ':id',
          },
        ],
      },
      {
        path: 'custom',
        children: [
          {
            name: '详情',
            path: ':id',
          },
        ],
      },
    ],
  },
];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
