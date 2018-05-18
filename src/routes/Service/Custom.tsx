import { Radio, Table, Tabs } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
import DetailHandler from '../../components/Handler/DetailHandler';
import { openModal } from '../../components/Modal';
// 常量
import { MODEL_WIDTH_EDIT } from '../../utils/consts';
// 方法
import { dispatchAction } from '../../utils/fns';
// 声明
import { ICustomItems, ICustomProps, ICustomStates } from './';
// 模块
import { customCols } from './columns';
import tpl from './detailTpl';
// 样式
// const styles = require('./index.less');
// antd组件设置
const TabPane = Tabs.TabPane;

// 枚举
enum sortGroup {
  spread = '扩频表',
  nblot = '物联网表',
  unusual = '异常报警',
  concentrator = '集中器',
  shipping = '发货记录',
}

// const expandedRowRender = (record: any): React.ReactNode => [
//   <p key="1" style={{ margin: 0 }}>{`部门: ${record.duty.department}`}</p>,
//   <p key="2" style={{ margin: 0 }}>
//     姓名: <span className="expandSpan">{record.duty.name}</span>
//   </p>,
//   <p key="4" style={{ margin: 0 }}>
//     手机号码: <span className="expandSpan">{record.duty.tel}</span>
//   </p>,
//   <p key="3" style={{ margin: 0 }}>{`办公电话: ${record.duty.phone}`}</p>,
//   <p key="5" style={{ margin: 0 }}>{`电子邮箱: ${record.duty.email}`}</p>,
// ];

@connect(({ loading, custom }: any) => ({
  loading: loading.models.custom,
  spreadList: custom.spreadList,
  concentratorList: custom.concentratorList,
  shippingList: custom.shippingList,
  nblotList: custom.nblotList,
  nblotShippingList: custom.nblotShippingList,
  unusualSpreadList: custom.unusualSpreadList,
  unusualNblotList: custom.unusualNblotList,
}))
class Custom extends React.PureComponent<ICustomProps, ICustomStates> implements ICustomItems {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: '',
      currentRadio: '',
      currentTable: '',
      // 请求数据
      isFetch: true,
      // Modal
      visible: false,
      modalSort: 'spread', // 'spread':扩频表 'concentrator':集中器 'nblot':物联网表
      selectedRecord: [],
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

  // 设置是否已请求过数据
  covertFetch = (fetch = false) => {
    this.setState({ isFetch: fetch });
  };
  // 获取数据
  // 生成最终显示的列表数据
  showData = (type: string) => {
    const {
      spreadList,
      concentratorList,
      shippingList,
      nblotList,
      nblotShippingList,
      unusualSpreadList,
      unusualNblotList,
    } = this.props;
    const { currentTab } = this.state;
    const list = {
      spread: spreadList,
      concentrator: concentratorList,
      shipping: shippingList,
      nblot: nblotList,
      nblotShipping: nblotShippingList,
      unusualSpread: unusualSpreadList,
      unusualNblot: unusualNblotList,
    };
    if (currentTab === 'unusual' && type === 'spread') return list.unusualSpread;
    if (currentTab === 'unusual' && type === 'nblot') return list.unusualNblot;
    if (currentTab === 'nblot' && type === 'shipping') return list.nblotShipping;

    return list[type];
  };
  // Dispatch Action
  dispatchAction = (type: string, payload?: any) => {
    payload ? dispatchAction(this.props, { type, payload }) : dispatchAction(this.props, { type });
  };

  // Tab切换时
  tabChange = (key: any) => {
    this.setState({
      currentTab: key,
      currentRadio: key === 'unusual' ? 'spread' : key,
      currentTable: key,
    });
    this.covertFetch(true);
  };
  // Radio切换时
  radioChange = (e: any) => {
    const { currentTab } = this.state;
    const { value } = e.target;
    this.setState({
      currentRadio: value,
      currentTable: value === 'spread' || value === 'nblot' ? currentTab : value,
    });
    this.covertFetch(true);
  };
  // 根据Tab | Radio 发起API请求
  startFetch = () => {
    const {
      spreadList,
      concentratorList,
      shippingList,
      nblotList,
      nblotShippingList,
      unusualSpreadList,
      unusualNblotList,
    } = this.props;
    const { currentTab, currentRadio, isFetch } = this.state;
    // 获取扩频表 > 扩频表列表
    if (
      isFetch &&
      currentTab !== 'unusual' &&
      currentRadio === 'spread' &&
      spreadList.length === 0
    ) {
      this.dispatchAction('custom/fetchSpread');
    }
    // 获取集中器列表;
    if (isFetch && currentRadio === 'concentrator' && concentratorList.length === 0) {
      this.dispatchAction('custom/fetchConcentrator');
    }
    // 获取扩频表 > 发货记录列表;
    if (
      isFetch &&
      currentTab === 'spread' &&
      currentRadio === 'shipping' &&
      shippingList.length === 0
    ) {
      this.dispatchAction('custom/fetchShipping');
    }
    // 获取物联网表 > 物联网表列表
    if (isFetch && currentTab !== 'unusual' && currentRadio === 'nblot' && nblotList.length === 0) {
      this.dispatchAction('custom/fetchNblot');
    }
    // 获取物联网表 > 发货记录列表
    if (
      isFetch &&
      currentTab === 'nblot' &&
      currentRadio === 'shipping' &&
      nblotShippingList.length === 0
    ) {
      this.dispatchAction('custom/fetchNblotShipping');
    }
    // 获取异常报警 > 扩频表列表
    if (
      isFetch &&
      currentTab === 'unusual' &&
      currentRadio === 'spread' &&
      unusualSpreadList.length === 0
    ) {
      this.dispatchAction('custom/fetchUnusualSpread');
    }
    // 获取异常报警 > 物联网表列表
    if (
      isFetch &&
      currentTab === 'unusual' &&
      currentRadio === 'nblot' &&
      unusualNblotList.length === 0
    ) {
      this.dispatchAction('custom/fetchUnusualNblot');
    }

    // 已请求过数据
    this.covertFetch(false);
  };
  // 查看
  handlerShow = (record: any, key: string) => {
    this.setState({
      selectedRecord: [record],
    });
    this.openModal(key);
  };
  // 编辑
  handlerEdit = (record: any) => {
    console.log(record, 'custom edit');
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
  // [Modal]
  openModal = (modalSort: string = 'spread') => {
    this.setState({ modalSort, visible: true });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    const { loading } = this.props;
    const {
      visible,
      modalSort,
      selectedRecord,
      currentTab,
      currentRadio,
      currentTable,
    } = this.state;
    // 获取Table的Columns
    const getColumns = customCols(this.handlerShow);
    // 生成Table渲染数据
    const dataSource = this.showData(currentRadio);
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
    // Modal
    const passChildren = tpl(
      selectedRecord,
      { closeModal: this.closeModal },
      {
        sortGroup,
        modalSort,
        isConfig: false,
        tab: sortGroup[currentTab],
        radio: sortGroup[currentRadio],
      }
    );

    return (
      <div>
        {// Modal
        openModal.apply(this, [
          {
            title: '详情',
            width: MODEL_WIDTH_EDIT,
            children: passChildren,
            visible,
            closable: true,
            loading,
            footer: null,
          },
        ])}
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
                rowKey="companyCode"
                columns={getColumns[currentTable]}
                loading={loading}
                dataSource={dataSource}
                // expandedRowRender={expandedRowRender}
                pagination={pagination}
              />
            ) : (
              <Table
                rowKey="companyCode"
                columns={getColumns[currentTable]}
                loading={loading}
                dataSource={dataSource}
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
