import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
import { IDataMonitorItems, IDataMonitorProps, IDataMonitorStates } from './';
// 样式

@connect()
class DataMonitor extends React.PureComponent<IDataMonitorProps, IDataMonitorStates>
  implements IDataMonitorItems {
  render() {
    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <span className="areaTop">此处显示DataMonitor内容...</span>
        </div>
      </div>
    );
  }
}

export default DataMonitor;
