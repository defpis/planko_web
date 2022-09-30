import { FC, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Avatar, Space, Dropdown } from 'antd';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  TableOutlined,
} from '@ant-design/icons';
import './MainLayout.scss';

const MainLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout className="main-layout">
      <Layout.Sider collapsible trigger={null} collapsed={collapsed}>
        <div className="sidenav-logo" />

        <Menu
          theme="dark"
          mode="inline"
          onClick={(ev) => navigate(ev.key)}
          items={[
            {
              key: '/home',
              label: 'Home',
              icon: <HomeOutlined />,
            },
            {
              key: '/about',
              label: 'About',
              icon: <InfoCircleOutlined />,
            },
            {
              key: '/sticky-note',
              label: 'StickyNote',
              icon: <TableOutlined />,
            },
          ]}
        />
      </Layout.Sider>

      <Layout>
        <Layout.Header className="content-header">
          <Space>
            <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </Space>
          <Space>
            <Dropdown
              overlay={
                <Menu
                  onClick={(ev) => console.log(ev.key)}
                  items={[
                    {
                      key: '/auth/logout',
                      label: 'Logout',
                      icon: <LogoutOutlined />,
                    },
                  ]}
                />
              }
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Layout.Header>
        <Layout.Content className="pl-4 pr-4 overflow-auto">
          <Breadcrumb className="mt-4 mb-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
