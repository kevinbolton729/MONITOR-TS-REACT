import { Icon, Tag } from 'antd';
import * as React from 'react';
// 方法
// import {} from '../../utils/fns';
// 样式
const styles = require('../static/index.less');

// 操作区显示的按钮
// type: 0:查看 1:配置 and 查看
export const showAction: (opts?: any, type?: number) => React.ReactNode = (opts = 0, type = 0) => {
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

// 格式化状态 eg. 异常/正常
export const defaultStats = {
  0: { label: '异常', color: 'red' },
  1: { label: '正常', color: 'green' },
};
export const formatDefaultStatus = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={defaultStats[stats].color}>{defaultStats[stats].label}</Tag>;
};
// 格式化扫频方式
const scanStats = {
  0: { label: '手动', color: 'cyan' },
  1: { label: '自动', color: 'gold' },
};
export const formatScanMethod = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={scanStats[stats].color}>{scanStats[stats].label}</Tag>;
};
// 格式化在线状态
const onLineStats = {
  0: { label: '已离线', color: 'red' },
  1: { label: '在线', color: 'green' },
};
export const formatOnLineStatus = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={onLineStats[stats].color}>{onLineStats[stats].label}</Tag>;
};
// 格式化采集方式
const methodStats = {
  0: { label: '静默定时', color: 'cyan' },
  1: { label: '静默实时', color: 'gold' },
};
export const formatGetMethod = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return (
    <Tag key="getMethod" color={methodStats[stats].color}>
      {methodStats[stats].label}
    </Tag>
  );
};
// 格式化数据库时间是否与服务器时间同步
export const formatSync = (status: boolean) => (status ? '是' : '否');
// 格式化快递公司
export const formatExpress = (express: string) => <Tag key="express">{express}</Tag>;
// 格式化报警类型
export const formatAlarmType = (alarmType: string) => (
  <Tag key="alarmType" color="red">
    {alarmType}
  </Tag>
);
