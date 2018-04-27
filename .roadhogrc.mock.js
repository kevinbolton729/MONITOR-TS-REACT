import mockjs from 'mockjs';
// import {} from "./mock/api";
import { delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
// "POST /api/forms": (req, res) => {
//   res.send({ message: "Ok" });
// },
// "GET /api/tags": mockjs.mock({
//   "list|100": [{ name: "@city", "value|1-100": 150, "type|0-2": 1 }]
// }),
const proxy = {
  'GET /api/fetchspread': {
    status: 1,
    message: '获取数据成功',
    extData: {
      count: 1,
      data: [
        {
          bid: 'BXXX1234',
          company: '四川海力智能燃气示范公司',
          method: '自动',
          status: 1,
          uptime: '2018-04-27 15:51:25',
          duty: {
            department: '技术中心',
            name: '鱼子酱',
            phone: '028-12345678',
            tel: '13912345678',
            email: '12345678@qq.com',
          },
        },
      ],
    },
  },
};

export default (noProxy ? {} : delay(proxy, 1500));
