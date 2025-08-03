import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const roles = user?.roles || [];

  const isManager = roles.includes('Manager');
  const isUser = roles.includes('Engineer');

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        {isUser && (
          <li>
            <NavLink to="/my-performance" activeClassName="active">
              My Performance
            </NavLink>
          </li>
        )}
        {isManager && (
          <>
            <li className="sidebar-section">Team Performance</li>
            <li className="sidebar-subitem">
              <NavLink to="/team/goals-setting" activeClassName="active">
                Goals Setting
              </NavLink>
            </li>
            <li className="sidebar-subitem">
              <NavLink to="/team/annual-assessment" activeClassName="active">
                Annual Assessment
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;