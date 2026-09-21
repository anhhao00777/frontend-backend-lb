import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  displayName: string;
  setDisplayName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = window.localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [displayName, setDisplayName] = useState<string>('Người dùng');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, displayName, setDisplayName }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};