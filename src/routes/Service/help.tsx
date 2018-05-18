import { Icon, Tag } from 'antd';
import * as React from 'react';
// 方法
// import {} from '../../utils/fns';
// 样式
const styles = require('./index.less');

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

// 格式化扫频方式
const scanStats = {
  0: { label: '手动', color: 'cyan' },
  1: { label: '自动', color: 'gold' },
};
export const formatScanMethod = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={scanStats[stats].color}>{scanStats[stats].label}</Tag>;
};
// 格式化数据提取状态
const extractStats = {
  0: { label: '失败', color: 'red' },
  1: { label: '成功', color: 'green' },
};
export const formatExtractStatus = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={extractStats[stats].color}>{extractStats[stats].label}</Tag>;
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
// 格式化数据上传状态
const uploadStats = {
  0: { label: '失败', color: 'red' },
  1: { label: '成功', color: 'green' },
};
export const formatUploadStatus = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={uploadStats[stats].color}>{uploadStats[stats].label}</Tag>;
};
// 格式化预警状态
const alarmStats = {
  0: { label: '异常', color: 'red' },
  1: { label: '成功', color: 'green' },
};
export const formatAlarmStatus = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={alarmStats[stats].color}>{alarmStats[stats].label}</Tag>;
};
// 格式化集中器状态
const cardStats = {
  0: { label: '异常', color: 'red' },
  1: { label: '成功', color: 'green' },
};
export const formatCardStatus = (status: number | string) => {
  const stats = parseInt(`${status}`, 10);
  return <Tag color={cardStats[stats].color}>{cardStats[stats].label}</Tag>;
};
// 格式化快递公司
export const formatExpress = (express: string) => <Tag key="express">{express}</Tag>;
// 格式化报警类型
export const formatAlarmType = (alarmType: string) => (
  <Tag key="alarmType" color="red">
    {alarmType}
  </Tag>
);
