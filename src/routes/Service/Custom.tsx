import { Tabs } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
import { ICustomItems, ICustomProps, ICustomStates } from './';
// 样式
const styles = require('./index.less');
// antd组件设置
const TabPane = Tabs.TabPane;

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
              <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Custom;
