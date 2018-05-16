import { message as openMessage } from 'antd';
import { queryCurrent, editPassword, editUser } from '@/services/user';
import { parseNewResponse } from '@/utils/parse';
// 常量
// import {} from '@/utils/consts';
// 方法
import { noToken } from '@/utils/fns';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
    confirmLoading: false,
  },

  effects: {
    // 获取当前登录用户信息
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      // yield console.log(response, 'response');
      const { code, message, data } = yield call(parseNewResponse, response);
      if (code === 0) {
        const currentUser = yield data[0];
        yield put({
          type: 'saveCurrentUser',
          payload: currentUser,
        });
      } else {
        yield call(noToken, { message, put });
      }
    },
    // 修改登录密码
    *editPassword({ payload }, { call, put }) {
      yield put({
        type: 'changeConfirmLoading',
        payload: true,
      });
      const response = yield call(editPassword, payload);
      const { code, message } = yield call(parseNewResponse, response);

      if (code === 0) {
        // edit password successfully
        yield openMessage.success(message);
        yield put({
          type: 'login/logout',
        });
      } else if (status !== -1) {
        yield openMessage.error(message);
      }
      yield put({
        type: 'changeConfirmLoading',
        payload: false,
      });
    },
    // 修改用户信息
    *editUser({ payload }, { call, put }) {
      yield put({
        type: 'changeConfirmLoading',
        payload: true,
      });
      const response = yield call(editUser, payload);
      const { code, message } = yield call(parseNewResponse, response);

      if (code === 0) {
        // edit user successfully
        yield openMessage.success(message);
        yield put({
          type: 'fetchCurrent',
        });
      } else if (status !== -1) {
        yield openMessage.error(message);
      }
      yield put({
        type: 'changeConfirmLoading',
        payload: false,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeConfirmLoading(state, { payload }) {
      return {
        ...state,
        confirmLoading: payload,
      };
    },
  },
};
