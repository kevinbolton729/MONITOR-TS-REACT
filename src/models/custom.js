import { message as openMessage } from 'antd';
import { fetchSpread, fetchConcentrator, fetchShipping, fetchNblot } from '@/services/api';
import { parseResponse } from '@/utils/parse';
// 常量
// import {} from '@/utils/consts';
// 方法
// import { gotoPage } from '@/utils/fns';

export default {
  namespace: 'custom',

  state: {
    loading: false,
    spreadList: [], // 扩频表
    concentratorList: [], // 集中器
    shippingList: [], // 扩频表>发货记录
    nblotList: [], // 物联网表
  },

  effects: {
    // 获取扩频表列表
    *fetchSpread(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fetchSpread);
      const { status, message, data } = yield call(parseResponse, response);

      if (status > 0) {
        // console.log(data, 'spread data');
        yield put({
          type: 'changeSpreadList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    // 获取集中器列表
    *fetchConcentrator(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fetchConcentrator);
      const { status, message, data } = yield call(parseResponse, response);

      if (status > 0) {
        // console.log(data, 'spread data');
        yield put({
          type: 'changeConcentratorList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    // 获取扩频表>集中器列表
    *fetchShipping(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fetchShipping);
      const { status, message, data } = yield call(parseResponse, response);

      if (status > 0) {
        // console.log(data, 'spread data');
        yield put({
          type: 'changeShippingList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    // 获取物联网表列表
    *fetchNblot(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fetchNblot);
      const { status, message, data } = yield call(parseResponse, response);

      if (status > 0) {
        // console.log(data, 'spread data');
        yield put({
          type: 'changeNblotList',
          payload: data,
        });
      } else {
        yield openMessage.warn(message);
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    changeLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
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
