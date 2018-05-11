import { Form, Radio, Table, Tabs } from 'antd';
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
import { IDataMonitorItems, IDataMonitorProps, IDataMonitorStates } from './';
// 模块
import { dataMonitorCols } from './columns';
import tpl from './detailTpl';
// 样式
// const styles = require('./index.less');
// antd组件设置
const TabPane = Tabs.TabPane;

// 枚举
enum sortGroup {
  spread = '扩频表',
  concentrator = '集中器',
  nblot = '物联网表',
}

const expandedRowRender = (record: any): React.ReactNode => [
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

@connect(({ loading, datamonitor }: any) => ({
  loading: loading.models.datamonitor && !loading.effects['datamonitor/fetchConfig'],
  confirmLoading: loading.effects['datamonitor/fetchConfig'],
  spreadList: datamonitor.spreadList,
  concentratorList: datamonitor.concentratorList,
  nblotList: datamonitor.nblotList,
}))
class DataMonitor extends React.PureComponent<IDataMonitorProps, IDataMonitorStates>
  implements IDataMonitorItems {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: '',
      currentRadio: '',
      currentTable: '',
      // Modal
      visible: false,
      modalSort: 'spread', // 'spread':扩频表 'concentrator':集中器 'nblot':物联网表
      selectedRecord: [],
      isEditConfig: false,
      isClick: false, // 更新配置时，是否点击【保存】
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
    // 点击【保存】后，更新成功时关闭编辑配置
    this.afterSaveCloseConfig();
  }
  // 获取数据
  // 生成最终显示的列表数据
  showData = (type: string) => {
    const { spreadList, concentratorList, nblotList } = this.props;
    const list = {
      spread: spreadList,
      concentrator: concentratorList,
      nblot: nblotList,
    };

    return list[type];
  };
  // Dispatch Action
  dispatchAction = (type: any, payload?: any) => {
    payload ? dispatchAction(this.props, { type, payload }) : dispatchAction(this.props, { type });
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
    const { spreadList, concentratorList, nblotList } = this.props;
    const { currentTab, currentRadio } = this.state;
    // 获取扩频表 > 扩频表列表
    if (currentTab !== 'unusual' && currentRadio === 'spread' && spreadList.length === 0) {
      this.dispatchAction('datamonitor/fetchDataSpread');
    }
    // 获取集中器列表;
    if (currentRadio === 'concentrator' && concentratorList.length === 0) {
      this.dispatchAction('datamonitor/fetchDataConcentrator');
    }
    // 获取物联网表 > 物联网表列表
    if (currentTab !== 'unusual' && currentRadio === 'nblot' && nblotList.length === 0) {
      this.dispatchAction('datamonitor/fetchDataNblot');
    }
  };
  // 查看
  handlerShow = (record: any, key: string) => {
    this.setState({
      selectedRecord: record,
    });
    this.closeConfig();
    this.openModal(key);
  };
  // 编辑
  handlerEdit = (record: any) => {
    console.log(record, 'datamonitor edit');
  };
  // 配置
  handlerConfig = () => {
    this.setState({
      isEditConfig: true,
    });
  };
  // 关闭编辑配置
  closeConfig = () => {
    this.setState({
      isEditConfig: false,
      isClick: false,
    });
  };
  // 点击【保存】后，关闭编辑配置
  afterSaveCloseConfig = () => {
    if (this.state.isClick && !this.props.confirmLoading) {
      this.closeConfig();
    }
  };
  // 表单
  // 保存
  onSubmit = (data: any, event: any) => {
    event.preventDefault();
    console.log('已点击【保存】');
    this.setState({ isClick: true });

    const { confirmLoading, form } = this.props;

    if (!confirmLoading) {
      form.validateFields({ force: true }, (err: any, values: any) => {
        if (!err) {
          console.log(data.id, 'id');

          this.dispatchAction('datamonitor/fetchConfig');
        }
      });
    }
  };
  // 重置
  onReset = () => {
    console.log('重置');
    const { form } = this.props;
    form.resetFields(['department', 'name', 'phone', 'tel', 'email']);
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
    const { loading, confirmLoading, form } = this.props;
    const {
      visible,
      modalSort,
      selectedRecord,
      currentTab,
      currentRadio,
      currentTable,
      isEditConfig,
    } = this.state;
    // 获取Table的Columns
    const getColumns = dataMonitorCols(this.handlerShow);
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
      {
        closeModal: this.closeModal,
        handlerConfig: this.handlerConfig,
        closeConfig: this.closeConfig,
        onSubmit: this.onSubmit,
        onReset: this.onReset,
      },
      {
        form,
        sortGroup,
        modalSort,
        isConfig: true, // 是否显示配置按钮
        isEditConfig, // 是否为配置编辑状态
        confirmLoading,
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
                </Radio.Group>
              </TabPane>
              <TabPane tab={sortGroup.nblot} key="nblot" />
            </Tabs>
          </div>
          <DetailHandler sort={currentTab} />
          <div style={{ marginTop: '20px' }}>
            {currentTable === 'spread' || currentTable === 'nblot' ? (
              <Table
                rowKey="id"
                columns={getColumns[currentTable]}
                loading={loading}
                dataSource={dataSource}
                expandedRowRender={expandedRowRender}
                pagination={pagination}
              />
            ) : (
              <Table
                rowKey="id"
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

export default Form.create()(DataMonitor) as any;
