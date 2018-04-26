import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
// import {} from './';
// 样式

@connect()
class Business extends React.PureComponent<any, any> {
  render() {
    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div style={{ marginTop: '24px' }}>此处显示Business内容...</div>
      </div>
    );
  }
}

export default Business;
