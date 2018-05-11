import { Button, Col, Divider, Form, Input, Popover, Row, Steps } from 'antd';
import * as React from 'react';
// 组件
// 常量
import { BTN_CANCEL, BTN_CLOSE, BTN_CONFIG, BTN_RESET, BTN_SAVE } from '../../utils/consts';
// 声明
import {} from './';
// 样式
const styles = require('./');

// UI
const { Step } = Steps;
const customDot = (dot: React.ReactNode, { status, index }: { status: string; index: number }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

// 是否显示配置按钮
const isConfig = (opts: any) => opts.isConfig && opts.modalSort !== 'concentrator';
// 是否是配置编辑状态
const isEditConfig = (opts: any) => opts.isEditConfig;

// FormItem 样式
const itemStyle = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default (data: any, fn: any, opts: any) => {
  const { getFieldDecorator } = opts.form;
  // 责任部门（或责任人）
  const noForm = isEditConfig(opts) || (
    <div className="hangSubTitle">
      <Row>
        <Col sm={24} md={8}>
          <p>部门：</p>
        </Col>
        <Col sm={24} md={16}>
          <p>姓名：</p>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={8}>
          <p>办公室电话：</p>
        </Col>
        <Col sm={24} md={8}>
          <p>手机号码：</p>
        </Col>
        <Col sm={24} md={8}>
          <p>电子邮箱：</p>
        </Col>
      </Row>
    </div>
  );
  const saveForm = (
    <div key="saveForm" className="hangSubTitle">
      <Row>
        <Col sm={24} md={8}>
          <Form.Item label="部门：" {...itemStyle}>
            {getFieldDecorator('department', {
              initialValue: '技术中心/办公室',
            })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item label="姓名：" {...itemStyle}>
            {getFieldDecorator('name', {
              initialValue: '鱼子酱',
            })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={8}>
          <Form.Item label="办公室电话：" {...itemStyle}>
            {getFieldDecorator('phone', {
              initialValue: '028-12345678',
            })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item label="手机号码：" {...itemStyle}>
            {getFieldDecorator('tel', {
              initialValue: '13912345678',
            })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item label="电子邮箱：" {...itemStyle}>
            {getFieldDecorator('email', {
              initialValue: 'k123456@qq.com',
            })(<Input size="large" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
  // 操作区
  const handler = isEditConfig(opts) ? (
    <Form key="editConfigForm" onSubmit={fn.onSubmit.bind(null, data)}>
      {saveForm}
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
  // 扩频表/物联网表(主模板)
  const main = (
    <div key="main">
      <div className="hangTitle">
        <p>指令追踪：</p>
      </div>
      <div>
        {opts.modalSort !== 'nblot' ? (
          <Steps current={1} progressDot={customDot}>
            <Step title="网关" />
            <Step
              title="数据中心"
              description={[
                <p key="name" className={styles.dotp}>
                  用户已支付
                </p>,
                <span key="date" className={styles.dotspan}>
                  2018-05-10 18:55
                </span>,
              ]}
            />
            <Step title="集中器" />
            <Step title="扩频表" />
            <Step title="集中器" />
            <Step title="数据中心" />
          </Steps>
        ) : (
          <Steps current={2} progressDot={customDot}>
            <Step title="网关" />
            <Step title="数据中心" />
            <Step
              title="物联网表"
              description={[
                <p key="name" className={styles.dotp}>
                  用户已支付
                </p>,
                <span key="date" className={styles.dotspan}>
                  2018-05-10 18:55
                </span>,
              ]}
            />
            <Step title="数据中心" />
          </Steps>
        )}
      </div>
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
      <Divider />
      <div className="hangTitle">
        <p>责任部门（或责任人）：</p>
      </div>
      {noForm}
    </div>
  );
  // 集中器
  const concentrator = (
    <div key="concentrator">
      <div className="hangTitle">
        <p>集中器：</p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>编号：</p>
          </Col>
          <Col span={16}>
            <p>燃气公司：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>通信卡：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>在线状态：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>实际表数/计划表数：</p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p>安装地址：</p>
          </Col>
        </Row>
      </div>
    </div>
  );
  // 异常报警
  const unusual = (
    <div key="unusual">
      <div className="hangTitle">
        <p>异常报警：</p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>编号：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>燃气公司：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>预警状态：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>报警类型：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>报警次数：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>报警时间：</p>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="hangTitle">
        <p>责任部门（或责任人）：</p>
      </div>
      {noForm}
    </div>
  );
  // 发货记录
  const shipping = (
    <div key="shipping">
      <div className="hangTitle">
        <p>发货记录：</p>
      </div>
      <div className="hangSubTitle">
        <Row>
          <Col sm={24} md={8}>
            <p>编号：</p>
          </Col>
          <Col span={16}>
            <p>燃气公司：</p>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={8}>
            <p>快递公司：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>发货单号：</p>
          </Col>
          <Col sm={24} md={8}>
            <p>发货时间：</p>
          </Col>
        </Row>
      </div>
    </div>
  );
  // 什么都没有
  const nocontent = <div>什么都没有</div>;

  // 返回的值
  const content = {
    spread: [main, handler],
    nblot: [main, handler],
    concentrator: [concentrator, handler],
    unusual: [unusual, handler],
    shipping: [shipping, handler],
  };

  return content[opts.modalSort] || nocontent;
};
