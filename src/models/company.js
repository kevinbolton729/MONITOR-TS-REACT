import { message as openMessage } from 'antd';
import { fetchCompany, fetchConfig } from '@/services/api';
import { parseResponse } from '@/utils/parse';
// 常量
// import {} from '@/utils/consts';
// 方法
// import { gotoPage } from '@/utils/fns';

export default {
  namespace: 'company',

  state: {
    companyList: [], // 燃气公司
  },

  effects: {
    // 获取扩频表列表
    *fetchCompany(_, { call, put }) {
      const response = yield call(fetchCompany);
      const { status, message, data } = yield call(parseResponse, response);

      if (status > 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeCompanyList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
    },
    // 更新配置
    *fetchConfig(_, { call }) {
      const response = yield call(fetchConfig);
      const { status, message } = yield call(parseResponse, response);

      if (status > 0) {
        yield openMessage.success(message);
      }
    },
  },

  reducers: {
    changeCompanyList(state, { payload }) {
      return {
        ...state,
        companyList: payload,
      };
    },
  },

  subscriptions: {
    // setup({ history }) {
    //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
    //   return history.listen(({ pathname, search }) => {
    //     if (typeof window.ga !== 'undefined') {
    //       window.ga('send', 'pageview', pathname + search);
    //     }
    //   });
    // },
  },
};
