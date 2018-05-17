import { Icon, Tag } from 'antd';
import * as React from 'react';
// 方法
import { unixFormatter } from '../../utils/fns';
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

// 格式化运行状态
const runStats = {
  0: { label: '异常', color: 'red' },
  1: { label: '正常', color: 'green' },
};
const formatRunStatus = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={runStats[stats].color}>{runStats[stats].label}</Tag>;
};
// 格式化采集方式
const methodStats = {
  0: { label: '静默定时', color: 'cyan' },
  1: { label: '静默实时', color: 'gold' },
};
const formatGetMethod = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return (
    <Tag key="getMethod" color={methodStats[stats].color}>
      {methodStats[stats].label}
    </Tag>
  );
};

// 燃气公司运营
// Columns of Table
export const companyCols = (fn: any) => {
  // 燃气公司
  const company = [
    {
      title: '燃气公司',
      dataIndex: 'company',
      key: 'company',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '系统名称/版本号',
      dataIndex: 'sysName',
      key: 'sysName',
      width: 200,
      render: (text: any, record: any) => [
        <span key="sysName">{record.detail.sysName}</span>,
        <span key="sysVersion">{` / ${record.detail.sysVersion}`}</span>,
      ],
    },
    {
      title: '采集方式',
      dataIndex: 'getMethod',
      key: 'getMethod',
      render: (text: any, record: any) => [
        formatGetMethod(record.detail.getMethod),
        <span key="getDataAt">{` ${unixFormatter(record.detail.getDataAt)}`}</span>,
      ],
    },
    {
      title: '运行状态',
      dataIndex: 'runStatus',
      key: 'runStatus',
      width: 120,
      render: (text: any, record: any) => formatRunStatus(record.detail.runStatus),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => {
        return showAction({ fn, record, key: 'company' });
      },
    },
  ];

  return { company };
};
