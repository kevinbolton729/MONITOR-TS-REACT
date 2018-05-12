import { Button, Col, Divider, Form, Input, Row } from 'antd';
import * as React from 'react';
// 组件
// 常量
import { BTN_CANCEL, BTN_CLOSE, BTN_CONFIG, BTN_RESET, BTN_SAVE } from '../../utils/consts';
// 声明
// import {} from './';
// 样式
// const styles = require('./');

// 是否显示配置按钮
const isConfig = (opts: any) => opts.isConfig;
// 是否是配置编辑状态
const isEditConfig = (opts: any) => opts.isEditConfig;

// FormItem 样式
const itemStyle = {
  // labelCol: { span: 10 },
  // wrapperCol: { span: 14 },
};
// 栅格: Col设置
const colQuery = {
  sm: 24,
  md: 8,
};

export default (data: any, fn: any, opts: any) => {
  const getFieldDecorator = opts.form && opts.form.getFieldDecorator;
  const noEditSys = isEditConfig(opts) || [
    <div key="title" className="hangTitle">
      <p>系统详细：</p>
    </div>,
    <div key="subtitle" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <p>系统名称 / 版本号：</p>
        </Col>
        <Col {...colQuery}>
          <p>采集方式：</p>
        </Col>
        <Col {...colQuery}>
          <p>采集数据时间：</p>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <p>IP地址/端口号：</p>
        </Col>
        <Col {...colQuery}>
          <p>MAC地址：</p>
        </Col>
        <Col {...colQuery}>
          <p>数据库版本：</p>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <p>数据库时间是否与服务器时间同步：</p>
        </Col>
        <Col {...colQuery}>
          <p>读写器/其他设备型号：</p>
        </Col>
        <Col {...colQuery}>
          <p>DLL文件版本：</p>
        </Col>
      </Row>
    </div>,
  ];
  const noEditCompany = isEditConfig(opts) || [
    <Divider key="divider" />,
    <div key="title" className="hangTitle">
      <p>{opts.sortGroup[opts.modalSort]}：</p>
    </div>,
    <div key="subtitle" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <p>省份/城市：</p>
        </Col>
        <Col {...colQuery}>
          <p>燃气公司：</p>
        </Col>
        <Col {...colQuery}>
          <p>公司编号：</p>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <p>备注说明：</p>
        </Col>
      </Row>
    </div>,
  ];
  const saveSys = [
    <div key="title" className="hangTitle">
      <p>系统详细：</p>
    </div>,
    <div key="subtitle" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="系统名称：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('sysname', {
                initialValue: 'HL-6',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="版本号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('version', {
                initialValue: '6.5',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="采集方式：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('method', {
                initialValue: '静默采集',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="采集数据时间：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('updatetime', {
                initialValue: '2018-05-10 12:00:05',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="IP地址：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('ip', {
                initialValue: '192.168.5.100',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="端口号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('port', {
                initialValue: '8001',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="MAC地址：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('mac', {
                initialValue: 'H2-XX-XX-DD-27',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="数据库版本：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('sqlversion', {
                initialValue: '5.7',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="数据库时间是否与服务器时间同步：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('sync', {
                initialValue: '同步',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="读写器：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('read', {
                initialValue: 'r-001',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="其他设备型号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('other', {
                initialValue: 'other-111',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="DLL文件版本：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('dllverison', {
                initialValue: '2.11.3',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </div>,
  ];
  const saveCompany = [
    <Divider key="divider" />,
    <div key="title" className="hangTitle">
      <p>{opts.sortGroup[opts.modalSort]}：</p>
    </div>,
    <div key="subtitle" className="hangSubTitle">
      <Row gutter={24}>
        <Col {...colQuery}>
          <Form.Item label="省份/城市：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('city', {
                initialValue: '四川省成都市',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="燃气公司：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('company', {
                initialValue: '海力智能燃气示范公司',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...colQuery}>
          <Form.Item label="公司编号：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('companyCode', {
                initialValue: 'C000011',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="备注说明：" {...itemStyle}>
            {getFieldDecorator &&
              getFieldDecorator('des', {
                initialValue: '备注说明...',
              })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </div>,
  ];
  // 操作区
  const handler = isEditConfig(opts) ? (
    <Form key="editConfigForm" onSubmit={fn.onSubmit.bind(null, data)}>
      {saveSys}
      {saveCompany}
      <div style={{ marginTop: '48px' }}>
        <Button loading={opts.confirmLoading} key="save" type="primary" htmlType="submit">
          {BTN_SAVE}
        </Button>
        <Divider type="vertical" />
        <Button onClick={fn.onReset}>{BTN_RESET}</Button>
        <Divider type="vertical" />
        <Button onClick={fn.closeConfig}>{BTN_CANCEL}</Button>
      </div>
    </Form>
  ) : (
    <div key="handler" style={{ marginTop: '48px' }}>
      {isConfig(opts) && [
        <Button key="config" type="primary" onClick={fn.handlerConfig}>
          {BTN_CONFIG}
        </Button>,
        <Divider key="divider" type="vertical" />,
      ]}
      <Button onClick={fn.closeModal}>{BTN_CLOSE}</Button>
    </div>
  );
  // 燃气公司(主模板)
  const main = (
    <div key="main">
      {noEditSys}
      {noEditCompany}
    </div>
  );
  // 什么都没有
  const nocontent = <div>什么都没有</div>;

  // 返回的值
  const content = {
    company: [main, handler],
  };

  return content[opts.modalSort] || nocontent;
};
