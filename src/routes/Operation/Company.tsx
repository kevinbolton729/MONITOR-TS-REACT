import { Table } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
// 组件
import BreadCrumb from '../../components/BreadCrumb';
import DetailHandler from '../../components/Handler/DetailHandler';
import { openModal } from '../../components/Modal';
// 常量
import { MODEL_WIDTH_EDIT } from '../../utils/consts';
// 方法
import { dispatchAction } from '../../utils/fns';
// 声明
import { ICompanyItems, ICompanyProps, ICompanyStates } from './';
// 模块
import { companyCols } from './columns';
import tpl from './detailTpl';
// 样式

// 枚举
enum sortGroup {
  company = '燃气公司',
}

@connect(({ loading, company }: any) => ({
  loading: loading.models.company,
  companyList: company.companyList,
}))
class Company extends React.PureComponent<ICompanyProps, ICompanyStates> implements ICompanyItems {
  constructor(props: any) {
    super(props);
    this.state = {
      // Modal
      visible: false,
      modalSort: 'company', // 'company':燃气公司
      selectedRecord: [],
    };
  }

  componentDidMount() {
    // 发起相应API请求
    this.startFetch();
  }

  // 获取数据
  // 生成最终显示的列表数据
  showData = (type: string = 'company') => {
    const { companyList } = this.props;
    const list = {
      company: companyList,
    };

    return list[type];
  };
  // Dispatch Action
  dispatchAction = (type: any, payload?: any) => {
    payload ? dispatchAction(this.props, { type, payload }) : dispatchAction(this.props, { type });
  };
  // 发起API请求
  startFetch = () => {
    const { companyList } = this.props;
    // 获取扩频表 > 扩频表列表
    if (companyList.length === 0) {
      this.dispatchAction('company/fetchCompany');
    }
  };
  // 查看
  handlerShow = (record: any, key: string) => {
    this.setState({
      selectedRecord: record,
    });
    this.openModal(key);
  };
  // 选择城市
  changeCity = (value: string[]) => {
    console.log(value, 'selected city');
  };
  // 分页
  onChangePage = (page: number, pageSize: number) => {
    console.log(page, 'page');
    console.log(pageSize, 'pageSize');
  };
  // 页长
  onShowSizeChange = (current: number, size: number) => {
    console.log(current, 'current');
    console.log(size, 'size');
  };
  // [Modal]
  openModal = (modalSort: string = 'company') => {
    this.setState({ modalSort, visible: true });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    const { loading } = this.props;
    const { visible, modalSort, selectedRecord } = this.state;
    // 获取Table的Columns
    const getColumns = companyCols(this.handlerShow);
    // 生成Table渲染数据
    const dataSource = this.showData();
    const pagination = {
      size: 'small',
      showSizeChanger: true,
      defaultCurrent: 1,
      defaultPageSize: 20,
      pageSizeOptions: ['10', '20', '30', '50'],
      total: 0,
      onChange: this.onChangePage,
      onShowSizeChange: this.onShowSizeChange,
    };
    // Modal
    const passChildren = tpl(
      selectedRecord,
      { closeModal: this.closeModal },
      {
        sortGroup,
        modalSort,
      }
    );

    return (
      <div>
        {// Modal
        openModal.apply(this, [
          {
            title: '详情',
            width: MODEL_WIDTH_EDIT,
            children: passChildren,
            visible,
            closable: true,
            loading,
            footer: null,
          },
        ])}
        <div className="componentBackground">
          <BreadCrumb />
        </div>
        <div className="contentArea">
          <div className="areaTop">
            <DetailHandler
              changeCity={this.changeCity}
              showSelectCity={true}
              hideDatePicker={true}
              sort="company"
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Table
              rowKey="companyCode"
              columns={getColumns.company}
              loading={loading}
              dataSource={dataSource}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
