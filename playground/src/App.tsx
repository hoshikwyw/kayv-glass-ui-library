import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import ButtonPage from './pages/components/ButtonPage';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/:slug" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
