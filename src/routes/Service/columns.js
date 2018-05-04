import { Divider, Icon } from 'antd';
import React from 'react';
// 样式
const styles = require('./index.less');

// 操作区显示的按钮
const showAction = (opts = 0, type = 0) => {
  if (opts.fn === 0) {
    console.log('请传入操作区的处理函数(或方法)');
    return;
  }

  // 分隔
  const divider = <Divider type="vertical" />; // eslint-disable-line
  // 查看详情
  const show = (
    <span className={styles.handleHref} onClick={opts.fn.bind(this, opts.record)}>
      <Icon type="eye-o" className={styles.iconStyle} />
    </span>
  );

  if (type === 0) {
    return <div>{show}</div>;
  }
  return <div />;
};

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
        return showAction({ fn: handlerShow, record });
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
        return <div>{showAction({ fn: handlerShow, record })}</div>;
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
      render: (text, record) => <span>{`${record.method} / ${record.num}`}</span>,
    },
    {
      title: '报警时间',
      dataIndex: 'datetime',
      key: 'datetime',
      render: text => <span>{text}</span>,
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
        return showAction({ fn: handlerShow, record });
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
        return showAction({ fn: handlerShow, record });
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
        return showAction({ fn: handlerShow, record });
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
        return showAction({ fn: handlerShow, record });
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
        return showAction({ fn: handlerShow, record });
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
        return showAction({ fn: handlerShow, record });
      },
    },
  ];

  return { spread, nblot, concentrator };
};
