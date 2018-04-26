import { Divider, Tabs } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
import DetailHandler from '../../components/Handler/DetailHandler';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
import { ICustomItems, ICustomProps, ICustomStates } from './';
// 样式
// const styles = require('./index.less');
// antd组件设置
const TabPane = Tabs.TabPane;

// 枚举
enum sortGroup {
  spread = '扩频表',
  nblot = '物联网表',
  unusual = '异常报警',
}

@connect()
class Custom extends React.PureComponent<ICustomProps, ICustomStates> implements ICustomItems {
  onChange = (key: any) => {
    console.log(key, 'key');
  };

  render() {
    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <div className="areaTop">
            <Tabs onChange={this.onChange}>
              <TabPane tab={sortGroup.spread} key="spread">
                {`显示${sortGroup.spread}的表格`}
              </TabPane>
              <TabPane tab={sortGroup.nblot} key="nblot">
                {`显示${sortGroup.nblot}的表格`}
              </TabPane>
              <TabPane tab={sortGroup.unusual} key="unusual">
                {`显示${sortGroup.unusual}的表格`}
              </TabPane>
            </Tabs>
          </div>
          <DetailHandler />
          <Divider />
        </div>
      </div>
    );
  }
}

export default Custom;
