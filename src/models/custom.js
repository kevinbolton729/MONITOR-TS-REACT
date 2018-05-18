import { message as openMessage } from 'antd';
import {
  fetchSpread,
  fetchConcentrator,
  fetchShipping,
  fetchNblot,
  fetchNblotShipping,
  fetchUnusualSpread,
  fetchUnusualNblot,
} from '@/services/api';
import { parseNewResponse } from '@/utils/parse';
// 常量
import { API_DATA_ERROR } from '@/utils/consts';
// 方法
// import { gotoPage } from '@/utils/fns';

export default {
  namespace: 'custom',

  state: {
    spreadList: [], // 扩频表
    concentratorList: [], // 集中器
    shippingList: [], // 扩频表>发货记录
    nblotList: [], // 物联网表
    nblotShippingList: [], // 物联网表>发货记录
    unusualSpreadList: [], // 异常报警>扩频表
    unusualNblotList: [], // 异常报警>物联网表
  },

  effects: {
    // 获取扩频表列表
    *fetchSpread(_, { call, put }) {
      const response = yield call(fetchSpread);
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
    *fetchConcentrator(_, { call, put }) {
      const response = yield call(fetchConcentrator);
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
    // 获取扩频表>发货记录列表
    *fetchShipping(_, { call, put }) {
      const response = yield call(fetchShipping);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeShippingList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
    // 获取物联网表列表
    *fetchNblot(_, { call, put }) {
      const response = yield call(fetchNblot);
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
    // 获取扩频表>发货记录列表
    *fetchNblotShipping(_, { call, put }) {
      const response = yield call(fetchNblotShipping);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeNblotShippingList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
    // 获取异常报警>扩频表列表
    *fetchUnusualSpread(_, { call, put }) {
      const response = yield call(fetchUnusualSpread);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeUnusualSpreadList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
      }
    },
    // 获取异常报警>物联网表列表
    *fetchUnusualNblot(_, { call, put }) {
      const response = yield call(fetchUnusualNblot);
      const { code, data } = yield call(parseNewResponse, response);

      if (code === 0) {
        // console.log(data, 'data');
        yield put({
          type: 'changeUnusualNblotList',
          payload: data,
        });
      } else {
        yield openMessage.warn(API_DATA_ERROR);
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
    changeShippingList(state, { payload }) {
      return {
        ...state,
        shippingList: payload,
      };
    },
    changeNblotList(state, { payload }) {
      return {
        ...state,
        nblotList: payload,
      };
    },
    changeNblotShippingList(state, { payload }) {
      return {
        ...state,
        nblotShippingList: payload,
      };
    },
    changeUnusualSpreadList(state, { payload }) {
      return {
        ...state,
        unusualSpreadList: payload,
      };
    },

    changeUnusualNblotList(state, { payload }) {
      return {
        ...state,
        unusualNblotList: payload,
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
