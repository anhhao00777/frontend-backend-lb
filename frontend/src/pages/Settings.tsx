import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, displayName, setDisplayName } = useApp();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Lấy thông tin Cài đặt từ Backend khi load trang
  useEffect(() => {
    fetch('http://localhost:5000/api/profile')
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải thông tin profile');
        return res.json();
      })
      .then((data) => {
        if (data.displayName) setDisplayName(data.displayName);
        if (data.password) setPassword(data.password);
        if (data.theme && data.theme !== theme) {
          toggleTheme();
        }
      })
      .catch((err) => console.error('Lỗi khi fetch profile:', err));
  }, []);

  // 2. Gửi thông tin cập nhật lên Backend khi bấm Lưu
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName, theme, password }),
      });

      if (response.ok) {
        alert('Cập nhật cài đặt thành công!');
      } else {
        alert('Lưu thất bại! Vui lòng kiểm tra lại server Backend.');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API PUT profile:', error);
      alert('Không thể kết nối tới server Backend!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Cài đặt hệ thống
      </h2>

      <div className="space-y-5">
        {/* Tên hiển thị */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
            Tên hiển thị
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Nhập tên hiển thị..."
          />
        </div>

        {/* Chuyển đổi Theme */}
        <div className="flex items-center justify-between py-2 border-y border-slate-100 dark:border-slate-800">
          <div>
            <div className="font-medium text-slate-700 dark:text-slate-300">
              Giao diện (Theme)
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Chế độ hiện tại: <span className="font-semibold uppercase">{theme}</span>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            type="button"
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-sm transition-colors text-slate-800 dark:text-slate-200"
          >
            Chuyển sang {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>
        </div>

        {/* Mật khẩu bảo mật */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
            Mật khẩu vùng kín
          </label>
          <input
            type="password"
            placeholder="Nhập mật khẩu bảo mật..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Nút lưu */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  );
};