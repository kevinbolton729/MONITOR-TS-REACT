import { Icon } from 'antd';
import moment from 'moment';
import React from 'react';
// 样式
const styles = require('./index.less');

// 客户服务监控
// Columns of Table
export const customCols = (handlerShow) => {
  // 扩频表
  const spread = [
    {
      title: '表编号',
      dataIndex: 'id',
      key: 'id',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '扫频方式',
      dataIndex: 'method',
      key: 'method',
      render: text => <span>{text}</span>,
    },
    {
      title: '数据提取状态',
      dataIndex: 'status',
      key: 'status',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
            {/* <Divider type="vertical" /> */}
          </div>
        );
      },
    },
  ];
  // 物联网表
  const nblot = [
    {
      title: '表编号',
      dataIndex: 'id',
      key: 'id',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '在线状态',
      dataIndex: 'online',
      key: 'online',
      render: text => <span>{text}</span>,
    },
    {
      title: '数据上传状态',
      dataIndex: 'status',
      key: 'status',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
          </div>
        );
      },
    },
  ];
  // 异常报警
  const unusual = [
    {
      title: '表编号',
      dataIndex: 'id',
      key: 'id',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '报警类型/报警次数',
      dataIndex: 'method',
      key: 'method',
      render: text => <span>{text}</span>,
    },
    {
      title: '报警时间',
      dataIndex: 'datetime',
      key: 'datetime',
      render: (text, record) => (
        <span>
          {`${moment(parseInt(record.updateDate, 10)).format('YYYY年MM月DD日 HH:mm:ss')}`}
        </span>
      ),
    },
    {
      title: '预警状态',
      dataIndex: 'status',
      key: 'status',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
          </div>
        );
      },
    },
  ];
  // 集中器
  const concentrator = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '通信卡状态',
      dataIndex: 'card',
      key: 'card',
      render: text => <span>{text}</span>,
    },
    {
      title: '集中器在线状态',
      dataIndex: 'online',
      key: 'online',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
          </div>
        );
      },
    },
  ];
  // 发货记录
  const shipping = [
    {
      title: '表编号',
      dataIndex: 'id',
      key: 'id',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '快递公司/发货单号/发货时间',
      dataIndex: 'express',
      key: 'express',
      render: (text, record) => (
        <span>{`${record.express} / ${record.expressid} / ${record.expresstime}`}</span>
      ),
    },
    {
      title: '数据提取状态',
      dataIndex: 'status',
      key: 'status',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
          </div>
        );
      },
    },
  ];

  return { spread, nblot, unusual, concentrator, shipping };
};

// 业务数据监控的
// Columns of Table
export const dataMonitorCols = (handlerShow) => {
  // 扩频表
  const spread = [
    {
      title: '表编号',
      dataIndex: 'bid',
      key: 'bid',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '扫频方式',
      dataIndex: 'method',
      key: 'method',
      render: text => <span>{text}</span>,
    },
    {
      title: '数据提取状态',
      dataIndex: 'status',
      key: 'status',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
          </div>
        );
      },
    },
  ];
  // 物联网表
  const nblot = [
    {
      title: '表编号',
      dataIndex: 'bid',
      key: 'bid',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '在线状态',
      dataIndex: 'online',
      key: 'online',
      render: text => <span>{text}</span>,
    },
    {
      title: '数据上传状态',
      dataIndex: 'status',
      key: 'status',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
          </div>
        );
      },
    },
  ];
  // 集中器
  const concentrator = [
    {
      title: '编号',
      dataIndex: 'cid',
      key: 'cid',
      render: text => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      render: text => <span>{text}</span>,
    },
    {
      title: '通信卡状态',
      dataIndex: 'card',
      key: 'card',
      render: text => <span>{text}</span>,
    },
    {
      title: '集中器在线状态',
      dataIndex: 'online',
      key: 'online',
      width: 240,
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <span className={styles.handleHref} onClick={handlerShow.bind(this, record)}>
              <Icon type="eye-o" className={styles.iconStyle} />
            </span>
          </div>
        );
      },
    },
  ];

  return { spread, nblot, concentrator };
};