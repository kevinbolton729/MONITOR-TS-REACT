import { message as openMessage } from 'antd';
import {
  fetchDataSpread,
  fetchDataConcentrator,
  fetchDataNblot,
  fetchConfig,
} from '@/services/api';
import { parseNewResponse } from '@/utils/parse';
// 常量
// import {} from '@/utils/consts';
// 方法
// import { gotoPage } from '@/utils/fns';

export default {
  namespace: 'datamonitor',

  state: {
    spreadList: [], // 扩频表
    concentratorList: [], // 集中器
    nblotList: [], // 物联网表
  },

  effects: {
    // 获取扩频表列表
    *fetchDataSpread(_, { call, put }) {
      const response = yield call(fetchDataSpread);
      const { isSuccessed, message, data } = yield call(parseNewResponse, response);

      if (isSuccessed) {
        // console.log(data, 'data');
        yield put({
          type: 'changeSpreadList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
    },
    // 获取集中器列表
    *fetchDataConcentrator(_, { call, put }) {
      const response = yield call(fetchDataConcentrator);
      const { isSuccessed, message, data } = yield call(parseNewResponse, response);

      if (isSuccessed) {
        // console.log(data, 'data');
        yield put({
          type: 'changeConcentratorList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
    },
    // 获取物联网表列表
    *fetchDataNblot(_, { call, put }) {
      const response = yield call(fetchDataNblot);
      const { isSuccessed, message, data } = yield call(parseNewResponse, response);

      if (isSuccessed) {
        // console.log(data, 'data');
        yield put({
          type: 'changeNblotList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
    },
    // 更新配置
    *fetchConfig(_, { call }) {
      const response = yield call(fetchConfig);
      const { isSuccessed, message } = yield call(parseNewResponse, response);

      if (isSuccessed) {
        yield openMessage.success(message);
      }
    },
  },

  reducers: {
    changeSpreadList(state, { payload }) {
      return {
        ...state,
        spreadList: payload,
      };
    },
    changeConcentratorList(state, { payload }) {
      return {
        ...state,
        concentratorList: payload,
      };
    },
    changeNblotList(state, { payload }) {
      return {
        ...state,
        nblotList: payload,
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
