import React from 'react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, displayName, setDisplayName } = useApp();

  return (
    <div>
      <h2>Cài đặt hệ thống</h2>
      <div style={{ marginTop: '16px' }}>
        <label>
          <strong>Tên hiển thị: </strong>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={{ padding: '6px 10px', marginLeft: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '16px' }}>
        <p><strong>Chế độ giao diện:</strong> {theme.toUpperCase()}</p>
        <button 
          onClick={toggleTheme} 
          style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', background: '#007bff', color: '#fff' }}
        >
          Chuyển sang {theme === 'light' ? 'Giao diện Tối (Dark)' : 'Giao diện Sáng (Light)'}
        </button>
      </div>
    </div>
  );
};

export default Settings;