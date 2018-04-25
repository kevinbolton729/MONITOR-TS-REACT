import React from 'react';
import { Icon } from 'antd';
// import { parseResponse } from '@/utils/parse';
// 常量
import { SERVICE_INFO } from '@/utils/consts';
// 方法
// import { gotoPage } from '@/utils/fns';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    globalConfirmLoading: false,
    notices: [],
    copyright: (
      <div>
        Copyright <Icon type="copyright" /> {SERVICE_INFO}
      </div>
    ),
    sitetypes: [],
    channeltypes: [],
    // 当前站点 默认：'59607e3c682e090ca074ecfd'
    currentSiteid: '59607e3c682e090ca074ecfd',
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    changeConfirmLoading(state, { payload }) {
      return {
        ...state,
        globalConfirmLoading: payload,
      };
    },
    getSiteType(state, { payload }) {
      return {
        ...state,
        sitetypes: payload,
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
