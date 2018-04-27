import { Button, Divider, Radio, Table, Tabs } from 'antd';
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
// const styles = require('./index.less');
// antd组件设置
const TabPane = Tabs.TabPane;

// 枚举
enum sortGroup {
  spread = '扩频表',
  nblot = '物联网表',
  unusual = '异常报警',
}

// 可删
const loading = false;
const data: any[] = [];

@connect()
class Custom extends React.PureComponent<ICustomProps, ICustomStates> implements ICustomItems {
  columns = {
    spread: [
      {
        title: '表编号',
        dataIndex: 'bid',
        key: 'bid',
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
              <Button onClick={this.handlerShow.bind(this, record)}>查看</Button>
              <Divider type="vertical" />
            </div>
          );
        },
      },
    ],
    nblot: [
      {
        title: '表编号',
        dataIndex: 'bid',
        key: 'bid',
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
              <Button onClick={this.handlerShow.bind(this, record)}>查看</Button>
              <Divider type="vertical" />
            </div>
          );
        },
      },
    ],
    unusual: [
      {
        title: '表编号',
        dataIndex: 'bid',
        key: 'bid',
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
              <Button onClick={this.handlerShow.bind(this, record)}>查看</Button>
              <Divider type="vertical" />
            </div>
          );
        },
      },
    ],
    concentrator: [
      {
        title: '编号',
        dataIndex: 'cid',
        key: 'cid',
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
              <Button onClick={this.handlerShow.bind(this, record)}>查看</Button>
              <Divider type="vertical" />
            </div>
          );
        },
      },
    ],
    shipping: [
      {
        title: '表编号',
        dataIndex: 'bid',
        key: 'bid',
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
              <Button onClick={this.handlerShow.bind(this, record)}>查看</Button>
              <Divider type="vertical" />
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
  tabChange = (key: any) => {
    this.setState({
      currentTab: key,
      currentRadio: key === 'unusual' ? 'spread' : key,
      currentTable: key,
    });
  };
  radioChange = (e: any) => {
    const { currentTab } = this.state;
    const { value } = e.target;
    this.setState({
      currentRadio: value,
      currentTable: value === 'spread' || value === 'nblot' ? currentTab : value,
    });
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
  onShowSizeChange = (e: any) => {
    console.log(e, 'event');
  };

  render() {
    const { currentTab, currentRadio, currentTable } = this.state;
    const expandedRowRender = (record: any): any => (
      <p style={{ margin: 0 }}>{`副标题: ${record.subtitle}`}</p>
    );
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
          <Divider />
          <Table
            rowKey="rowId"
            columns={this.columns[currentTable]}
            loading={loading}
            dataSource={data}
            expandedRowRender={expandedRowRender}
            pagination={{
              size: 'small',
              showSizeChanger: true,
              defaultCurrent: 1,
              defaultPageSize: 20,
              pageSizeOptions: ['10', '20', '30', '50'],
              total: 0,
              onShowSizeChange: this.onShowSizeChange,
            }}
          />
        </div>
      </div>
    );
  }
}

export default Custom;
