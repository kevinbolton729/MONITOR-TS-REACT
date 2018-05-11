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
      title: '系统名称',
      dataIndex: 'sysname',
      key: 'sysname',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '采集方式',
      dataIndex: 'method',
      key: 'method',
      render: (text: any, record: any) => [
        <span key="method">{text}</span>,
        <span key="updatetime">{record.updatetime}</span>,
      ],
    },
    {
      title: '运行状态',
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
        return showAction({ fn, record, key: 'company' });
      },
    },
  ];

  return { company };
};
