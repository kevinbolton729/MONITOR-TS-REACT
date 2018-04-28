import { Icon, Radio, Table, Tabs } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
import DetailHandler from '../../components/Handler/DetailHandler';
// 常量
// import { URL_PREFIX } from '../../utils/consts';
// 声明
import { ICustomItems, ICustomProps, ICustomStates } from './';
// 样式
const styles = require('./index.less');
// antd组件设置
const TabPane = Tabs.TabPane;

// 枚举
enum sortGroup {
  spread = '扩频表',
  nblot = '物联网表',
  unusual = '异常报警',
}

const iconStyle = { fontSize: '18px' };

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
}))
class Custom extends React.PureComponent<ICustomProps, ICustomStates> implements ICustomItems {
  columns = {
    spread: [
      {
        title: '表编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
      },
      {
        title: '公司名称',
        dataIndex: 'company',
        key: 'company',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '扫频方式',
        dataIndex: 'method',
        key: 'method',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '数据提取状态',
        dataIndex: 'status',
        key: 'status',
        width: 240,
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 180,
        render: (text: any, record: any) => {
          return (
            <div>
              <span className={styles.handleHref} onClick={this.handlerShow.bind(this, record)}>
                <Icon type="eye-o" className={styles.iconStyle} />
              </span>
              {/* <Divider type="vertical" /> */}
            </div>
          );
        },
      },
    ],
    nblot: [
      {
        title: '表编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
      },
      {
        title: '公司名称',
        dataIndex: 'company',
        key: 'company',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '在线状态',
        dataIndex: 'online',
        key: 'online',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '数据上传状态',
        dataIndex: 'status',
        key: 'status',
        width: 240,
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 180,
        render: (text: any, record: any) => {
          return (
            <div>
              <span className={styles.handleHref} onClick={this.handlerShow.bind(this, record)}>
                <Icon type="eye-o" className={styles.iconStyle} />
              </span>
            </div>
          );
        },
      },
    ],
    unusual: [
      {
        title: '表编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
      },
      {
        title: '公司名称',
        dataIndex: 'company',
        key: 'company',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '报警类型/报警次数',
        dataIndex: 'method',
        key: 'method',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '报警时间',
        dataIndex: 'datetime',
        key: 'datetime',
        render: (text: any, record: any) => (
          <span>{`${moment(parseInt(record.updateDate, 10)).format(
            'YYYY年MM月DD日 HH:mm:ss'
          )}`}</span>
        ),
      },
      {
        title: '预警状态',
        dataIndex: 'status',
        key: 'status',
        width: 240,
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 180,
        render: (text: any, record: any) => {
          return (
            <div>
              <span className={styles.handleHref} onClick={this.handlerShow.bind(this, record)}>
                <Icon type="eye-o" className={styles.iconStyle} />
              </span>
            </div>
          );
        },
      },
    ],
    concentrator: [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
      },
      {
        title: '公司名称',
        dataIndex: 'company',
        key: 'company',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '通信卡状态',
        dataIndex: 'card',
        key: 'card',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '集中器在线状态',
        dataIndex: 'online',
        key: 'online',
        width: 240,
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 180,
        render: (text: any, record: any) => {
          return (
            <div>
              <span className={styles.handleHref} onClick={this.handlerShow.bind(this, record)}>
                <Icon type="eye-o" className={styles.iconStyle} />
              </span>
            </div>
          );
        },
      },
    ],
    shipping: [
      {
        title: '表编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: any) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
      },
      {
        title: '公司名称',
        dataIndex: 'company',
        key: 'company',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '快递公司/发货单号/发货时间',
        dataIndex: 'express',
        key: 'express',
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '数据提取状态',
        dataIndex: 'status',
        key: 'status',
        width: 240,
        render: (text: any) => <span>{text}</span>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 180,
        render: (text: any, record: any) => {
          return (
            <div>
              <span className={styles.handleHref} onClick={this.handlerShow.bind(this, record)}>
                <Icon type="eye-o" className={styles.iconStyle} />
              </span>
            </div>
          );
        },
      },
    ],
  };
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: 'spread',
      currentRadio: 'spread',
      currentTable: 'spread',
    };
  }

  componentDidMount() {
    this.getSpreadList();
  }
  // 获取数据
  // 生成最终显示的列表数据
  showData = (type: string) => {
    const { spreadList, concentratorList } = this.props;
    const { currentTab } = this.state;
    const list = {
      spread: spreadList,
      concentrator: concentratorList,
    };
    if (currentTab === 'unusual') return [];

    return list[type];
  };
  // 获取扩频表列表
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

  tabChange = (key: any) => {
    this.setState({
      currentTab: key,
      currentRadio: key === 'unusual' ? 'spread' : key,
      currentTable: key,
    });
  };
  radioChange = async (e: any) => {
    const { currentTab } = this.state;
    const { value } = e.target;
    await this.setState({
      currentRadio: value,
      currentTable: value === 'spread' || value === 'nblot' ? currentTab : value,
    });
    // 根据currentTab/currentRadio等发起相应API请求
    this.startFetch();
  };
  // 根据Tab | Radio 发起API请求
  startFetch = () => {
    const { spreadList, concentratorList } = this.props;
    const { currentTab, currentRadio } = this.state;
    if (currentTab !== 'unusual' && currentRadio === 'spread' && spreadList.length === 0) {
      // 获取扩频表>扩频表列表
      this.getSpreadList();
    }
    if (currentRadio === 'concentrator' && concentratorList.length === 0) {
      // 获取扩频表 > 集中器列表;
      this.getConcentratorList();
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
  onShowSizeChange = (current: number, size: number) => {
    console.log(current, 'current');
    console.log(size, 'size');
  };

  render() {
    const { loading } = this.props;
    const { currentTab, currentRadio, currentTable } = this.state;
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
                columns={this.columns[currentTable]}
                loading={loading}
                dataSource={data}
                expandedRowRender={expandedRowRender}
                pagination={pagination}
              />
            ) : (
              <Table
                rowKey="id"
                columns={this.columns[currentTable]}
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
