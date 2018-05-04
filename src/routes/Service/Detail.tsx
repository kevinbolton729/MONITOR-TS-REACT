import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
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

  render() {
    const { match } = this.props;

    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <span className="areaTop">
            {`此处显示查看Custom 或 DataMonitor详细内容，且传入页面的参数: id=${match.params.id}`}
          </span>
        </div>
      </div>
    );
  }
}

export default Detail;
