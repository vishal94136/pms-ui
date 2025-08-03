import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { logout } from './redux/actions/authActions';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <span className="logo-per">Performance</span>
          <span className="logo-global"> Management System</span>
        </div>
        <div className="header-right">
          <span className="user-info">Welcome, {user?.name || 'User'}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;