import '@/styles/common.less';
import { Button, Col, Drawer, Popover, Row } from 'antd';
import light from '../public/assets/light.svg';
import dark from '../public/assets/dark.svg';
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ToolOutlined
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Content, Header } from 'antd/lib/layout/layout';
import ThemeMode from './components/ThemeMode';
import { useStore } from './hooks/globalProvider';
import MicroMenu from './components/MicroMenu';

const drawerLightStyle = {
  backgroundColor: '#fff',
  color: '#333'
};
const drawerDarkStyle = {
  backgroundColor: '#333',
  color: '#fff'
};

const App = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useStore();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const renderSettingTitle = () => {
    return (
      <div className='container-header-setting-title'>
        <b>自定义设置</b>
        <Button onClick={() => setOpenSetting(false)} icon={<CloseOutlined />} type='text' />
      </div>
    );
  };

  return (
    <div className='container'>
      <Header className='container-header'>
        <Row>
          <Col span={2}>
            &nbsp; &nbsp; &nbsp;
            <Popover content='导航'>
              <span onClick={toggleCollapsed} className='container-header-btn'>
                {collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: '22px' }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: '22px' }} />
                )}
              </span>
            </Popover>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <ToolOutlined style={{ fontSize: '18px', padding: '0px 10px' }} />
            <span className='container-header-title'>工作台</span>
          </Col>
          <Drawer
            placement='left'
            open={collapsed}
            closable={false}
            onClose={toggleCollapsed}
            style={{ transform: 'translateY(50px)' }}
            bodyStyle={{ padding: 0 }}
            drawerStyle={theme === 'light' ? drawerLightStyle : drawerDarkStyle}
            width={200}
          >
            <MicroMenu onClose={toggleCollapsed}></MicroMenu>
          </Drawer>
          <Col span={20}></Col>
          <Col span={2} className='container-header-setting'>
            <Popover content='自定义设置'>
              <SettingOutlined
                style={{ fontSize: '18px', padding: '0 0 0 10px' }}
                onClick={() => {
                  setOpenSetting(true);
                }}
              />
            </Popover>
            <Drawer
              title={renderSettingTitle()}
              onClose={() => setOpenSetting(false)}
              open={openSetting}
              closable={false}
              drawerStyle={theme === 'light' ? drawerLightStyle : drawerDarkStyle}
              style={{ transform: 'translateY(50px)' }}
            >
              <ThemeMode
                modes={[
                  { key: 'light', imgUrl: light },
                  { key: 'dark', imgUrl: dark }
                ]}
              ></ThemeMode>
            </Drawer>
          </Col>
        </Row>
      </Header>

      <Row className='container-main'>
        <Col span={24}>
          <Content>
            <Outlet></Outlet>
          </Content>
        </Col>
      </Row>
    </div>
  );
};
export default App;
