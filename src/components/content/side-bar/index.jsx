import React from 'react';
import { history, Link } from 'umi';

import LogoImageUrl from 'images/logo.png';
import IconMap from 'components/common/IconMap';

const SideBar = ({ Sider, Menu, collapse }) => {
  const pathname = history.location.pathname;
  const routeList = sessionStorage.getItem('routeList')
    ? JSON.parse(sessionStorage.getItem('routeList'))
    : [];

  return (
    <Sider theme="light" className="side-bar" collapse={collapse}>
      {/* left-header */}
      <div className="brand">
        <div className="logo">
          <img src={LogoImageUrl} alt="" />
          {!collapse && <h1>中国银行</h1>}
        </div>
      </div>
      {/* left-body */}
      <div className="menu-container">
        <Menu mode="inline" selectedKeys={[pathname]}>
          {routeList?.map((item) => {
            return (
              <Menu.Item key={item.route}>
                <Link to={item.route}>
                  {IconMap[item.icon]} <span>{item.zhName}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </Sider>
  );
};

export default SideBar;
