import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { Private } from './pages/Private';
import { Settings } from './pages/Settings';
import ViewNote from './pages/ViewNote';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="private" element={<Private />} />
            <Route path="settings" element={<Settings />} />
            <Route path="note/:topic/:id" element={<ViewNote />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;