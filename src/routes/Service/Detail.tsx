import { Button, Divider } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
// 常量
import { BTN_BACK, BTN_SAVE } from '../../utils/consts';
// 声明
import { IDetailItems, IDetailProps, IDetailStates } from './';
// 样式

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

  // 根据路由match.url
  // 判断是客户服务监控，还是业务数据监控的详情页
  matchUrl = (url?: string) => url && this.props.match.url.indexOf(url) !== -1;

  render() {
    const { match } = this.props;

    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <div className="areaTop">{`此页为详情页，且传入页面的参数: id=${match.params.id}`}</div>
          <div style={{ marginTop: '20px' }}>
            {this.matchUrl('/datamonitor/') && [
              <Button key="save" type="primary" htmlType="submit">
                {BTN_SAVE}
              </Button>,
              <Divider key="divider" type="vertical" />,
            ]}
            <Button>{BTN_BACK}</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
