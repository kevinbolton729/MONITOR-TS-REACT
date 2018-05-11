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
        <p>指令详细：</p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>指令类型：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>指令状态：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>到达时间：</p>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="hangTitle">
        <p>
          {opts.tab && opts.radio
            ? `${opts.tab}/${opts.radio}`
            : `${opts.sortGroup[opts.modalSort]}`}：
        </p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>表编号：</p>
          </Col>
          <Col span={opts.modalSort !== 'nblot' ? 8 : 16}>
            <p>燃气公司：</p>
          </Col>
          {opts.modalSort !== 'nblot' && (
            <Col sm={24} md={8}>
              <p>集中器：</p>
            </Col>
          )}
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>价格(元)：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>价格类型：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>价格版本：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>价格状态：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>调价时间：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>有效期至：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>电池状态：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>电池电压：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>时长(使用/理想)：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>阀门状态：</p>
          </Col>
          <Col span={16}>
            <p>指令执行后(阀门控制)：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>上报状态：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>未上报/已上报：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>上报时间：</p>
          </Col>
        </Row>
      </div>
      <div className="hangTitle">
        <p>燃气用户：</p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>姓名：</p>
          </Col>
          <Col span={16}>
            <p>卡号：</p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p>详细地址：</p>
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
