import { message as openMessage } from 'antd';
import { fetchCompany, fetchCompanyConfig } from '@/services/api';
import { parseNewResponse } from '@/utils/parse';
// 常量
import { API_DATA_ERROR, API_DATA_TIMEOUTMSG } from '@/utils/consts';
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
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeCompanyList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
    // 更新配置
    *fetchConfig(_, { call }) {
      const response = yield call(fetchCompanyConfig);
      const { code, message } = yield call(parseNewResponse, response);

      if (code === 0) {
        yield openMessage.success(message);
      } else {
        yield openMessage.warn(API_DATA_TIMEOUTMSG);
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
