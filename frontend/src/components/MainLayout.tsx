import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const MainLayout: React.FC = () => {
  const { theme, toggleTheme, displayName } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex min-h-screen bg-slate-100 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
        <aside className="w-72 border-r border-slate-200 bg-white/80 px-5 py-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-sm">
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                User
              </p>
              <span className="text-base font-semibold text-slate-800 dark:text-slate-100">
                {displayName}
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [
                  'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              Trang chủ
            </NavLink>

            <NavLink
              to="/private"
              className={({ isActive }) =>
                [
                  'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              Private
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                [
                  'block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              Cài đặt
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
            {isDark ? 'Chế độ sáng' : 'Chế độ tối'}
          </button>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;