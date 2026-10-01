import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const MainLayout: React.FC = () => {
  const { theme, toggleTheme, displayName } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex min-h-screen bg-slate-100 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
        <aside className="fixed w-100/100 h-11 overflow-hidden flex items-center justify-between bg-white/80 px-5 py-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-blue-600 font-bold text-white shadow-sm">{displayName ? displayName.charAt(0).toUpperCase() : 'U'}</div>
            <div>
              <span className="text-base font-semibold text-slate-800 dark:text-slate-100">
                {displayName}
              </span>
            </div>
          </div>

          <nav className="h-100/100 flex items-center justify-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [
                  'block py-4 px-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 dark:text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              <i className="fa-solid fa-house"></i>
            </NavLink>

            <NavLink
              to="/topics"
              end
              className={({ isActive }) =>
                [
                  'block  py-4 px-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 dark:text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              <i className="fa-solid fa-list"></i>
            </NavLink>

            <NavLink
              to="/private"
              className={({ isActive }) =>
                [
                  'block  py-4 px-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 dark:text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              <i className="fa-solid fa-shield-halved"></i>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                [
                  'block py-4 px-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 dark:text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              <i className="fa-solid fa-gear"></i>
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="items-center px-4 h-10 justify-center gap-2 border border-slate-200 bg-slate-100 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
            {isDark ? 'Light' : 'Dark'}
          </button>
        </aside>

        <main className="flex-1 p-6 md:p-10 mt-5">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;