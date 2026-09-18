import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './MainLayout.css';

export const MainLayout: React.FC = () => {
  const { theme, displayName } = useApp();

  return (
    <div className={`app-container ${theme}`}>
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="user-profile">
          <div className="avatar">
            {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="username">{displayName}</span>
        </div>

        <nav className="navigation">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Trang chủ
          </NavLink>

          <NavLink 
            to="/private" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Vùng kín
          </NavLink>

          <NavLink 
            to="/settings" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Cài đặt
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Dynamic Area */}
      <main className="content-body">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;