// import {} from 'antd';
// import { connect } from 'dva';
// import moment from 'moment';
import * as React from 'react';
// 组件
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
import {} from './';
// 样式
// const styles = require('./Business.less');

class Company extends React.PureComponent<any, any> {
  render() {
    return (
      <div>
        <PageHeaderLayout />
        <div style={{ marginTop: '24px' }}>此处显示Company内容...</div>
      </div>
    );
  }
}

export default Company;
