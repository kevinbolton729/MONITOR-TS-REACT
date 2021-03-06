import { message as openMessage } from 'antd';
import {
  fetchDataSpread,
  fetchDataConcentrator,
  fetchDataNblot,
  fetchDutyConfig,
} from '@/services/api';
import { parseNewResponse } from '@/utils/parse';
// 常量
// import {} from '@/utils/consts';
// 方法
// import { gotoPage } from '@/utils/fns';
// Config
import { API_DATA_ERROR, API_DATA_TIMEOUTMSG } from '@/config';

export default {
  namespace: 'datamonitor',

  state: {
    spreadList: [], // 扩频表
    concentratorList: [], // 集中器
    nblotList: [], // 物联网表
  },

  effects: {
    // 获取扩频表列表
    *fetchDataSpread({ payload }, { call, put }) {
      const response = yield call(fetchDataSpread, payload);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeSpreadList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
    // 获取集中器列表
    *fetchDataConcentrator({ payload }, { call, put }) {
      const response = yield call(fetchDataConcentrator, payload);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeConcentratorList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
    // 获取物联网表列表
    *fetchDataNblot({ payload }, { call, put }) {
      const response = yield call(fetchDataNblot, payload);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeNblotList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
    // 更新配置
    *fetchConfig(_, { call }) {
      const response = yield call(fetchDutyConfig);
      const { code, message } = yield call(parseNewResponse, response);

      if (code === 0) {
        yield openMessage.success(message);
      } else {
        yield openMessage.warn(API_DATA_TIMEOUTMSG);
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
