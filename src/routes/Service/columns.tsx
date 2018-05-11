import { Icon } from 'antd';
import * as React from 'react';
// 样式
const styles = require('./index.less');

// 操作区显示的按钮
// type: 0:查看 1:配置 and 查看
const showAction: (opts?: any, type?: number) => React.ReactNode = (opts = 0, type = 0) => {
  if (opts === 0) {
    console.log('请传入操作区的处理函数(或方法)');
    return <div />;
  }

  // 分隔
  // const divider = <Divider type="vertical" />;
  // 查看详情
  const show = (
    <span className={styles.handleHref} onClick={opts.fn.bind(null, opts.record, opts.key)}>
      <Icon type="eye-o" className={styles.iconStyle} />
    </span>
  );
  // 配置(或编辑)
  const edit = (
    <span className={styles.handleHref} onClick={opts.fn.bind(null, opts.record)}>
      <Icon type="setting" className={styles.iconStyle} />
    </span>
  );

  if (type === 0) return <div>{show}</div>;
  if (type === 1) return <div>{edit}</div>;

  console.log('请检查type的传入值是否正确？ type: 0:查看 1:配置 and 查看');
  return <div />;
};

// 客户服务监控
// Columns of Table
export const customCols = (fn: any) => {
  // 扩频表
  const spread = [
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
        return showAction({ fn, record, key: 'spread' });
      },
    },
  ];
  // 物联网表
  const nblot = [
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
        return <div>{showAction({ fn, record, key: 'nblot' })}</div>;
      },
    },
  ];
  // 异常报警
  const unusual = [
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
      render: (text: any, record: any) => <span>{`${record.method} / ${record.num}`}</span>,
    },
    {
      title: '报警时间',
      dataIndex: 'datetime',
      key: 'datetime',
      render: (text: any) => <span>{text}</span>,
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
        return showAction({ fn, record, key: 'unusual' });
      },
    },
  ];
  // 集中器
  const concentrator = [
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
        return showAction({ fn, record, key: 'concentrator' });
      },
    },
  ];
  // 发货记录
  const shipping = [
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
      render: (text: any, record: any) => (
        <span>{`${record.express} / ${record.expressid} / ${record.expresstime}`}</span>
      ),
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
        return showAction({ fn, record, key: 'shipping' });
      },
    },
  ];

  return { spread, nblot, unusual, concentrator, shipping };
};

// 业务数据监控的
// Columns of Table
export const dataMonitorCols = (fn: any) => {
  // 扩频表
  const spread = [
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
        return showAction({ fn, record, key: 'spread' });
      },
    },
  ];
  // 物联网表
  const nblot = [
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
        return showAction({ fn, record, key: 'nblot' });
      },
    },
  ];
  // 集中器
  const concentrator = [
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
        return showAction({ fn, record, key: 'concentrator' });
      },
    },
  ];

  return { spread, nblot, concentrator };
};
