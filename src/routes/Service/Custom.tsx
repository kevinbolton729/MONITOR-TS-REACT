import { Radio, Table, Tabs } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
import DetailHandler from '../../components/Handler/DetailHandler';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
import { ICustomItems, ICustomProps, ICustomStates } from './';
// 模块
import { customCols } from './columns';
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

const expandedRowRender = (record: any): any => [
  <p key="1" style={{ margin: 0 }}>{`部门: ${record.duty.department}`}</p>,
  <p key="2" style={{ margin: 0 }}>
    姓名: <span className="expandSpan">{record.duty.name}</span>
  </p>,
  <p key="4" style={{ margin: 0 }}>
    手机号码: <span className="expandSpan">{record.duty.tel}</span>
  </p>,
  <p key="3" style={{ margin: 0 }}>{`办公电话: ${record.duty.phone}`}</p>,
  <p key="5" style={{ margin: 0 }}>{`电子邮箱: ${record.duty.email}`}</p>,
];

@connect(({ custom }: any) => ({
  loading: custom.loading,
  spreadList: custom.spreadList,
  concentratorList: custom.concentratorList,
  shippingList: custom.shippingList,
  nblotList: custom.nblotList,
  nblotShippingList: custom.nblotShippingList,
}))
class Custom extends React.PureComponent<ICustomProps, ICustomStates> implements ICustomItems {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: '',
      currentRadio: '',
      currentTable: '',
    };
  }
  componentDidMount() {
    // 初始化
    this.setState({
      currentTab: 'spread',
      currentRadio: 'spread',
      currentTable: 'spread',
    });
  }
  componentDidUpdate() {
    // 根据currentTab/currentRadio等发起相应API请求
    this.startFetch();
  }

  // 获取数据
  // 生成最终显示的列表数据
  showData = (type: string) => {
    const { spreadList, concentratorList, shippingList, nblotList, nblotShippingList } = this.props;
    const { currentTab } = this.state;
    const list = {
      spread: spreadList,
      concentrator: concentratorList,
      shipping: shippingList,
      nblot: nblotList,
      nblotShipping: nblotShippingList,
    };
    if (currentTab === 'unusual') return [];
    if (type === 'shipping' && currentTab === 'nblot') return list.nblotShipping;

    return list[type];
  };
  // 获取扩频表>扩频表列表
  getSpreadList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'custom/fetchSpread',
    });
  };
  // 获取集中器列表
  getConcentratorList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'custom/fetchConcentrator',
    });
  };
  // 获取扩频表>发货记录
  getShippingList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'custom/fetchShipping',
    });
  };
  // 获取物联网表>物联网表列表
  getNblotList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'custom/fetchNblot',
    });
  };
  // 获取物联网表>发货记录
  getNblotShippingList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'custom/fetchNblotShipping',
    });
  };

  // Tab切换时
  tabChange = (key: any) => {
    this.setState({
      currentTab: key,
      currentRadio: key === 'unusual' ? 'spread' : key,
      currentTable: key,
    });
  };
  // Radio切换时
  radioChange = (e: any) => {
    const { currentTab } = this.state;
    const { value } = e.target;
    this.setState({
      currentRadio: value,
      currentTable: value === 'spread' || value === 'nblot' ? currentTab : value,
    });
  };
  // 根据Tab | Radio 发起API请求
  startFetch = () => {
    const { spreadList, concentratorList, shippingList, nblotList, nblotShippingList } = this.props;
    const { currentTab, currentRadio } = this.state;
    // 获取扩频表 > 扩频表列表
    if (currentTab !== 'unusual' && currentRadio === 'spread' && spreadList.length === 0) {
      this.getSpreadList();
    }
    // 获取集中器列表;
    if (currentRadio === 'concentrator' && concentratorList.length === 0) {
      this.getConcentratorList();
    }
    // 获取扩频表 > 发货记录列表;
    if (currentTab === 'spread' && currentRadio === 'shipping' && shippingList.length === 0) {
      this.getShippingList();
    }
    // 获取物联网表 > 物联网表列表
    if (currentTab !== 'unusual' && currentRadio === 'nblot' && nblotList.length === 0) {
      this.getNblotList();
    }
    // 获取物联网表 > 发货记录列表
    if (currentTab === 'nblot' && currentRadio === 'shipping' && nblotShippingList.length === 0) {
      this.getNblotShippingList();
    }
  };
  // 查看
  handlerShow = (record: any) => {
    console.log(record, 'show');
  };
  // 编辑
  handlerEdit = (record: any) => {
    console.log(record, 'edit');
  };
  // 分页
  onChangePage = (page: number, pageSize: number) => {
    console.log(page, 'page');
    console.log(pageSize, 'pageSize');
  };
  // 页长
  onShowSizeChange = (current: number, size: number) => {
    console.log(current, 'current');
    console.log(size, 'size');
  };

  render() {
    const { loading } = this.props;
    const { currentTab, currentRadio, currentTable } = this.state;
    // 获取Table的Columns
    const getColumns = customCols.apply(this, [this.handlerShow]);
    // 生成Table渲染数据
    const data = this.showData(currentRadio);
    const pagination = {
      size: 'small',
      showSizeChanger: true,
      defaultCurrent: 1,
      defaultPageSize: 20,
      pageSizeOptions: ['10', '20', '30', '50'],
      total: 0,
      onChange: this.onChangePage,
      onShowSizeChange: this.onShowSizeChange,
    };
    return (
      <div>
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <div className="areaTop">
            <Tabs onChange={this.tabChange} animated={false}>
              <TabPane tab={sortGroup.spread} key="spread">
                <Radio.Group value={currentRadio} onChange={this.radioChange}>
                  <Radio.Button value="spread">扩频表</Radio.Button>
                  <Radio.Button value="concentrator">集中器</Radio.Button>
                  <Radio.Button value="shipping">发货记录</Radio.Button>
                </Radio.Group>
              </TabPane>
              <TabPane tab={sortGroup.nblot} key="nblot">
                <Radio.Group value={currentRadio} onChange={this.radioChange}>
                  <Radio.Button value="nblot">物联网表</Radio.Button>
                  <Radio.Button value="shipping">发货记录</Radio.Button>
                </Radio.Group>
              </TabPane>
              <TabPane tab={sortGroup.unusual} key="unusual">
                <Radio.Group value={currentRadio} onChange={this.radioChange}>
                  <Radio.Button value="spread">扩频表</Radio.Button>
                  <Radio.Button value="nblot">物联网表</Radio.Button>
                </Radio.Group>
              </TabPane>
            </Tabs>
          </div>
          <DetailHandler sort={currentTab} />
          {/* <Divider /> */}
          <div style={{ marginTop: '20px' }}>
            {currentTable === 'spread' || currentTable === 'nblot' ? (
              <Table
                rowKey="id"
                columns={getColumns[currentTable]}
                loading={loading}
                dataSource={data}
                expandedRowRender={expandedRowRender}
                pagination={pagination}
              />
            ) : (
              <Table
                rowKey="id"
                columns={getColumns[currentTable]}
                loading={loading}
                dataSource={data}
                pagination={pagination}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Custom;
