import { Button, Divider } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
// 常量
import { BTN_BACK, BTN_CONFIG } from '../../utils/consts';
// 声明
import { IDetailItems, IDetailProps, IDetailStates } from './';
// 样式
// const styles = require('./');

@connect(({ detail }: any) => ({
  loading: detail.loading,
}))
class Detail extends React.PureComponent<IDetailProps, IDetailStates> implements IDetailItems {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props, 'props');
  }

  // 路由 返回前一页
  gotoBack = () => {
    const { history }: any = this.props;
    history.goBack();
  };

  // 根据路由match.url
  // 判断是客户服务监控，还是业务数据监控的详情页
  matchUrl = (url?: string) => url && this.props.match.url.indexOf(url) !== -1;

  render() {
    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <div className="areaTop">
            <div className="hangTitle">
              <span>指令追踪：</span>
            </div>
            <div>……</div>
            <div className="hangSubTitle">
              <span>指令详细：</span>
            </div>
            <div>……</div>
            <Divider />
            <div className="hangSubTitle">
              <span>扩频表：</span>
            </div>
            <div>……</div>
            <div className="hangSubTitle">
              <span>燃气用户：</span>
            </div>
            <div>……</div>
          </div>
          <div style={{ marginTop: '20px' }}>
            {this.matchUrl('/datamonitor/') && [
              <Button key="save" type="primary" htmlType="submit">
                {BTN_CONFIG}
              </Button>,
              <Divider key="divider" type="vertical" />,
            ]}
            <Button onClick={this.gotoBack}>{BTN_BACK}</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
