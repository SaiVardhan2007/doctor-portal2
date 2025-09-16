import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" /> 
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/doctors">Doctors</Link>
          </Menu.Item>
          
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;