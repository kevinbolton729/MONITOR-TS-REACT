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

@connect(({ loading, global, custom }: any) => ({
  loading: loading.models.custom,
  spreadList: custom.spreadList,
  concentratorList: custom.concentratorList,
  shippingList: custom.shippingList,
  nblotList: custom.nblotList,
  nblotShippingList: custom.nblotShippingList,
  unusualSpreadList: custom.unusualSpreadList,
  unusualNblotList: custom.unusualNblotList,
  totalNum: custom.totalNum,
  dutyList: global.dutyList,
}))
class Custom extends React.PureComponent<ICustomProps, ICustomStates> implements ICustomItems {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: '',
      currentRadio: '',
      currentTable: '',
      // 是否第一次进入
      isFirst: true,
      // 请求数据
      isFetch: true,
      // 请求责任部门（或责任人）数据
      isFetchDuty: true,
      // Modal
      visible: false,
      modalSort: 'spread', // 'spread':扩频表 'concentrator':集中器 'nblot':物联网表
      selectedRecord: [],
      // 分页
      curPage: 1,
      pageSize: 50,
      // 搜索关键字
      searchCode: '',
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
    // 根据currentTab/currentRadio发起获取责任部门（或责任人）API请求
    this.fetchDutyApi();
  }

  // 非首次进入切换isFirst状态
  covertFirst = (isFirst = false) => {
    this.setState({ isFirst });
  };
  // 设置是否已请求过数据
  covertFetch = (fetch = false) => {
    this.setState({ isFetch: fetch });
  };
  // 设置是否已请求过责任部门（或责任人）数据
  covertFetchDuty = (fetch = false) => {
    this.setState({ isFetchDuty: fetch });
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
    this.covertFirst(true);
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
    this.covertFirst(true);
  };
  // 判断是否请求数据和是否首次请求
  isGet = (type = 'default') => {
    const { currentTab, currentRadio, isFetch, isFirst } = this.state;
    const basic = isFetch && !isFirst;

    if (type === 'fetchSpread') {
      return basic && currentTab !== 'unusual' && currentRadio === 'spread';
    }
    if (type === 'fetchConcentrator') {
      return basic && currentRadio === 'concentrator';
    }
    if (type === 'fetchShipping') {
      return basic && currentTab === 'spread' && currentRadio === 'shipping';
    }
    if (type === 'fetchNblot') {
      return basic && currentTab !== 'unusual' && currentRadio === 'nblot';
    }
    if (type === 'fetchNblotShipping') {
      return basic && currentTab === 'nblot' && currentRadio === 'shipping';
    }
    if (type === 'fetchUnusualSpread') {
      return basic && currentTab === 'unusual' && currentRadio === 'spread';
    }
    if (type === 'fetchUnusualNblot') {
      return basic && currentTab === 'unusual' && currentRadio === 'nblot';
    }
    return basic;
  };
  // 根据Tab | Radio 发起API请求
  startFetch = () => {
    const { curPage, pageSize, searchCode } = this.state;
    // 分页参数
    const pagination = { curPage, pageSize };
    // 搜索参数
    const searchParams = { ...pagination, searchCode };
    // 获取扩频表 > 扩频表列表
    if (this.isGet('fetchSpread')) {
      this.dispatchAction('custom/fetchSpread', searchParams);
    }
    // 获取集中器列表;
    if (this.isGet('fetchConcentrator')) {
      this.dispatchAction('custom/fetchConcentrator', searchParams);
    }
    // 获取扩频表 > 发货记录列表;
    if (this.isGet('fetchShipping')) {
      this.dispatchAction('custom/fetchShipping', searchParams);
    }
    // 获取物联网表 > 物联网表列表
    if (this.isGet('fetchNblot')) {
      this.dispatchAction('custom/fetchNblot', searchParams);
    }
    // 获取物联网表 > 发货记录列表
    if (this.isGet('fetchNblotShipping')) {
      this.dispatchAction('custom/fetchNblotShipping', searchParams);
    }
    // 获取异常报警 > 扩频表列表
    if (this.isGet('fetchUnusualSpread')) {
      this.dispatchAction('custom/fetchUnusualSpread', searchParams);
    }
    // 获取异常报警 > 物联网表列表
    if (this.isGet('fetchUnusualNblot')) {
      this.dispatchAction('custom/fetchUnusualNblot', searchParams);
    }

    // 已请求过数据
    this.covertFetch(false);
  };
  // 根据Tab | Radio 发起责任部门（或责任人）API请求
  fetchDutyApi = () => {
    const { dutyList } = this.props;
    const { currentRadio, isFetchDuty } = this.state;

    // 请求责任部门（或责任人）的数据接口
    if (
      isFetchDuty &&
      (currentRadio === 'spread' || currentRadio === 'nblot') &&
      dutyList.length === 0
    ) {
      this.dispatchAction('global/fetchDuty');
    }

    // 已请求过数据
    this.covertFetchDuty(false);
  };
  // 查看
  handlerShow = (record: any, key: string) => {
    const { dutyList } = this.props;
    if (dutyList.length !== 0) record.duty = dutyList;

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
    // console.log(page, 'page');
    // console.log(pageSize, 'pageSize');
    this.setState({ curPage: page, pageSize });
    this.covertFetch(true);
  };
  // 页长
  onShowSizeChange = (current: number, size: number) => {
    // console.log(current, 'current');
    // console.log(size, 'size');
    this.setState({ curPage: current, pageSize: size });
    this.covertFetch(true);
  };
  // Search 搜索数据
  searchData = (key: any) => {
    const { currentTab, currentRadio } = this.state;
    // 分页参数
    const pagination = { curPage: 1, pageSize: 50 };
    // 搜索参数
    const searchParams = { ...pagination, searchCode: key };

    // 物联网表 > 物联网表列表
    if (currentTab !== 'unusual' && currentRadio === 'nblot') {
      this.dispatchAction('custom/fetchNblot', searchParams);
    }
    // 物联网表 > 发货记录列表
    if (currentTab === 'nblot' && currentRadio === 'shipping') {
      this.dispatchAction('custom/fetchNblotShipping', searchParams);
    }
    this.covertFirst(false);
    this.setState({ searchCode: key });
  };
  // Reset 重置数据
  resetData = () => {
    const { currentTab, currentRadio } = this.state;
    console.log(currentTab, 'currentTab');
    console.log(currentRadio, 'currentRadio');

    // 物联网表 > 物联网表列表
    if (currentTab !== 'unusual' && currentRadio === 'nblot') {
      this.dispatchAction('custom/changeNblotList', []);
    }
    // 物联网表 > 发货记录列表
    if (currentTab === 'nblot' && currentRadio === 'shipping') {
      this.dispatchAction('custom/changeNblotShippingList', []);
    }
    this.covertFirst(true);
  };

  // [Modal]
  openModal = (modalSort: string = 'spread') => {
    this.setState({ modalSort, visible: true });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };

  // ...
  rowKeyTable = (record: any) => {
    const { currentRadio } = this.state;
    const result = { value: 'companyCode' };
    const condition = currentRadio === 'nblot' || currentRadio === 'shipping';

    // console.log(currentRadio, 'currentRadio');

    if (condition) {
      result.value = `${record.rowkeyId}`;
    }

    return result.value;
  };

  render() {
    const { loading, totalNum } = this.props;
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
      defaultPageSize: 50,
      pageSizeOptions: ['10', '20', '30', '50'],
      total: totalNum,
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
        isConfig: false, // 是否显示配置按钮
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
                  {/* <Radio.Button value="shipping">发货记录</Radio.Button> */}
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
          <DetailHandler
            resetData={this.resetData}
            filterData={this.searchData}
            hideDatePicker={true}
            sort={currentTab}
          />
          {/* <Divider /> */}
          {dataSource &&
            dataSource.length !== 0 && (
              <div style={{ marginTop: '20px' }}>
                {currentTable === 'spread' || currentTable === 'nblot' ? (
                  <Table
                    rowKey={this.rowKeyTable}
                    columns={getColumns[currentTable]}
                    loading={loading}
                    dataSource={dataSource}
                    // expandedRowRender={expandedRowRender}
                    pagination={pagination}
                  />
                ) : (
                  <Table
                    rowKey={this.rowKeyTable}
                    columns={getColumns[currentTable]}
                    loading={loading}
                    dataSource={dataSource}
                    pagination={pagination}
                  />
                )}
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Custom;
