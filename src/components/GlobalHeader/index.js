import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin, Dropdown, Avatar, Divider } from 'antd';
// import moment from 'moment';
// import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
// import { Link } from 'dva/router';
// import NoticeIcon from '../NoticeIcon';
// import HeaderSearch from '../HeaderSearch';
// Config
import { URL_PREFIX } from '@/config';
// 常量
import { COLLAPSEDWIDTH, NOCOLLAPSEDWIDTH } from '@/utils/consts';
// 样式
import styles from './index.less';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const { currentUser, collapsed, isMobile, logo, onMenuClick } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="usercenter">
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item key="security">
          <Icon type="laptop" />安全中心
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />安全退出
        </Menu.Item>
      </Menu>
    );
    return (
      <Header style={{ position: 'fixed', width: '100%' }} className={styles.header}>
        {isMobile && [
          <div className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </div>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div
          className={styles.right}
          style={
            isMobile
              ? null
              : collapsed
                ? { paddingRight: COLLAPSEDWIDTH }
                : { paddingRight: NOCOLLAPSEDWIDTH }
          }
        >
          {currentUser.nickname ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={`${URL_PREFIX}${currentUser.portrait}`}
                />
                <span className={styles.name}>{currentUser.nickname}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </Header>
    );
  }
}
