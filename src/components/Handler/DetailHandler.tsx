/*
 * @Author: Kevin Bolton
 * @Date: 2018-01-03 23:18:25
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-06-11 16:12:36
 */

import { Button, Cascader, DatePicker, Form, Input, message } from 'antd';
import PropTypes from 'prop-types';
import * as React from 'react';
// 常量
import { MESSAGE_NOINPUT } from '../../utils/consts';
// 方法
import { getCityOptions } from '../../utils/fns';
// 组件:Components
import Loading from '../Loading';
// 声明
import { IDetailProps, IDetailStates } from './';
// 样式
const styles = require('./DetailHandler.less');

const { RangePicker }: any = DatePicker;
const { Search } = Input;

// 枚举
const searcHolder: any = {
  default: '请输入查询关键字',
  unusual: '请输入查询关键字',
  spread: '请输入表号',
  nblot: '请输入表号',
  shipping: '请输入表号',
  concentrator: '请输入集中器编号',
  company: '请输入燃气公司名称',
};

// 获取省份/城市级联菜单的项
const cityOptions = getCityOptions();
// 级联菜单: 搜索
const filter: any = (inputValue: string, path: string[]) =>
  path.some((option: any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

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
    const { loading } = this.props;
    if (!value) {
      message.warning(MESSAGE_NOINPUT);
    } else {
      // console.log(value, 'search data');
      if (!loading && this.props.filterData) this.props.filterData(value);
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
    const { loading, form, sort, hideSearch, hideDatePicker, showSelectCity } = this.props;
    const { getFieldDecorator } = form;
    const noHandler = hideSearch && hideDatePicker && !showSelectCity;
    const isSearching = () =>
      loading ? <Loading type="loading" style={{ color: '#fff', fontSize: '18px' }} /> : !loading;

    return noHandler ? (
      <div />
    ) : (
      <div className={styles.hander}>
        <Form>
          {showSelectCity && (
            <div className={styles.item}>
              <span>选择：</span>
              {getFieldDecorator('city')(
                <Cascader
                  placeholder="省份/城市"
                  size="default"
                  expandTrigger="hover"
                  notFoundContent="请输入正确的城市名"
                  style={{ width: 150 }}
                  options={cityOptions}
                  showSearch={{ filter }}
                  onChange={this.changeCity}
                />
              )}
            </div>
          )}
          {hideSearch || [
            <div key="search" className={styles.item}>
              <span>查询：</span>
              {getFieldDecorator('search')(
                <Search
                  style={{ width: 300 }}
                  placeholder={searcHolder[sort || 'default']}
                  enterButton={isSearching()}
                  onSearch={this.getSearch}
                  onPressEnter={this.enterSearch}
                />
              )}
            </div>,
            <div key="reset" className={styles.item}>
              <Button onClick={this.clickReset}>重置</Button>
            </div>,
          ]}
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
