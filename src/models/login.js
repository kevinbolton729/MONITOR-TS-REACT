import { routerRedux } from 'dva/router';
import { message as openMessage } from 'antd';
import { fakeAccountLogin, accountLoginOut } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { parseNewResponse } from '@/utils/parse';
// import qs from 'qs';
// 常量
import { MESSAGE_LOGINON_SUCCESS, PAGELOGIN } from '@/utils/consts';
// 方法
import {} from '@/utils/fns';
// 用户权限
// const authorityCollection = {
//   1000: 'admin',
//   2000: 'custom',
//   3000: 'devloper',
// };

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      const { code, message } = yield call(parseNewResponse, response);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          currentAuthority: 'admin', // 此值应接口返回
        },
      });
      // Login successfully
      if (code === 0) {
        reloadAuthorized();
        // const { token } = yield data[0];
        yield openMessage.success(MESSAGE_LOGINON_SUCCESS);
        // yield localStorage.setItem(LOCALSTORAGENAME, qs.stringify({ token }));
        yield put(routerRedux.push('/'));
      } else {
        yield openMessage.error(message);
      }
    },
    *logout(_, { put, call, select }) {
      const response = yield call(accountLoginOut);
      const { code, message } = yield call(parseNewResponse, response);
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        if (code === 0) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: false,
              currentAuthority: 'guest',
            },
          });
          reloadAuthorized();
          // yield openMessage.success(MESSAGE_LOGINOUT_SUCCESS);
          yield openMessage.success(message);
          yield put(routerRedux.push(PAGELOGIN));
        } else {
          yield openMessage.error(message);
        }
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
