/*
 * @Author: Kevin Bolton
 * @Date: 2018-01-03 23:18:25
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-05-11 18:30:09
 */

import { Button, Cascader, DatePicker, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import * as React from 'react';
import { MESSAGE_NOINPUT } from '../../utils/consts';
// 声明
import { IDetailProps, IDetailStates } from './';
// 样式
const styles = require('./DetailHandler.less');

const { RangePicker }: any = DatePicker;
const { Search } = Input;

// 枚举
const searcHolder: any = {
  spread: '表号/集中器编号/燃气公司名称',
  nblot: '表号/燃气公司名称',
  unusual: '请输入查询关键字',
  company: '请输入燃气公司名称',
};

const cityOptions = [
  {
    value: 'sichuan',
    label: '四川',
    children: [
      {
        value: 'chengdu',
        label: '成都',
      },
    ],
  },
  {
    value: 'yunnan',
    label: '云南',
    children: [
      {
        value: 'kunming',
        label: '昆明',
      },
    ],
  },
];

class DetailHandler extends React.PureComponent<IDetailProps, IDetailStates> {
  static contextTypes = {
    dispatch: PropTypes.func,
  };
  dateFormat = {
    dately: 'YYYY年MM月DD日',
  };

  constructor(props: any) {
    super(props);
  }

  // select date
  onChange = (dates: any, dateStrings: any) => {
    const { filterData } = this.props;
    console.log(dates, 'dates');
    console.log(dateStrings, 'dateStrings');
    if (dateStrings[0] !== '' || dateStrings[1] !== '') {
      filterData(`SELECTDATE,${dates[0]},${dates[1]}`);
    }
  };
  // search
  getSearch = (value: any) => {
    if (!value) {
      message.warning(MESSAGE_NOINPUT);
    } else {
      console.log(value);
      if (this.props.filterData) this.props.filterData(value);
    }
  };
  enterSearch = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    this.getSearch(value);
  };
  // reset
  resetFields = () => {
    const { form, hideDatePicker, showSelectCity } = this.props;
    const { setFieldsValue } = form;

    setFieldsValue({ search: '' });
    if (!hideDatePicker) setFieldsValue({ rangedate: null });
    if (showSelectCity) setFieldsValue({ city: null });
  };
  // click 重置 Button
  clickReset = () => {
    if (this.props.resetData) this.props.resetData();
    this.resetFields();
  };
  // 选择城市
  changeCity = (value: string[]) => {
    if (this.props.changeCity) this.props.changeCity(value);
  };

  render() {
    const { dately } = this.dateFormat;
    const { form, sort, hideDatePicker, showSelectCity } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.hander}>
        <Form>
          {showSelectCity && (
            <div className={styles.item}>
              {getFieldDecorator('city')(
                <Cascader
                  options={cityOptions}
                  onChange={this.changeCity}
                  placeholder="省份/城市"
                />
              )}
            </div>
          )}
          <div className={styles.item}>
            <span>查询：</span>
            {getFieldDecorator('search')(
              <Search
                enterButton={true}
                style={{ width: 300 }}
                placeholder={searcHolder[sort || 'spread']}
                onSearch={this.getSearch}
                onPressEnter={this.enterSearch}
              />
            )}
          </div>
          <div className={styles.item}>
            <Button onClick={this.clickReset}>重置</Button>
          </div>
          {hideDatePicker || (
            <div className={styles.item}>
              {getFieldDecorator('rangedate')(
                <RangePicker allowClear={false} onChange={this.onChange} format={dately} />
              )}
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default Form.create()(DetailHandler) as React.ClassicComponentClass<IDetailProps>;
