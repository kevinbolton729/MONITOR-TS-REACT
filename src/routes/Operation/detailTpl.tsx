import { Button, Col, Divider, Row } from 'antd';
import * as React from 'react';
// 组件
// 常量
import { BTN_CLOSE } from '../../utils/consts';
// 声明
// import {} from './';
// 样式
// const styles = require('./');

export default (data: any, fn: any, opts: any) => {
  // 操作区
  const handler = (
    <div key="handler" style={{ marginTop: '48px' }}>
      <Button onClick={fn.closeModal}>{BTN_CLOSE}</Button>
    </div>
  );
  // 燃气公司(主模板)
  const main = (
    <div key="main">
      <div className="hangTitle">
        <p>系统详细：</p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>IP地址/端口号：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>MAC地址：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>数据库版本：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>数据库时间是否与服务器时间同步：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>读写器/其他设备型号：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>DLL文件版本：</p>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="hangTitle">
        <p>{opts.sortGroup[opts.modalSort]}：</p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>省份/城市：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>燃气公司：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>公司编号：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>系统名称 / 版本号：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>采集方式：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>采集数据时间：</p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p>备注说明：</p>
          </Col>
        </Row>
      </div>
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
