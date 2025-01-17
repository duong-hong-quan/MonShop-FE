import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { refreshAccessToken, logout } from "../../services/userService"
import { isTokenExpired } from "../../services/jwtHelper";
const SideMenu = ({ collapsed }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (user && isTokenExpired()) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        refreshAccessToken();
      } else {
        logout();
      }
    }
  }, [user]);

  return (
    <Sider breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline"  inlineCollapsed={collapsed}>
        <Menu.Item key="1" icon={<i className="fa-solid fa-bag-shopping"></i>}>
          <NavLink style={{ textDecoration: 'none' }} to="/management/product" >Product</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<i className="fa-solid fa-bag-shopping"></i>}>
          <NavLink style={{ textDecoration: 'none' }} to="/management/inventory" >Product Inventory</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<i className="fa-solid fa-user"></i>}>
          <NavLink style={{ textDecoration: 'none' }} to="/management/user">User</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<i className="fa-solid fa-comments"></i>}>
          <NavLink style={{ textDecoration: 'none' }} to="/management/chat">Chat</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<i className="fa-solid fa-receipt"></i>}>
          <NavLink style={{ textDecoration: 'none' }} to="/management/orders">Orders</NavLink>
        </Menu.Item>
        <Menu.Item key="6" icon={<i className="fa-solid fa-gears"></i>}>
          <NavLink style={{ textDecoration: 'none' }} to="/management/settings">Settings</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
