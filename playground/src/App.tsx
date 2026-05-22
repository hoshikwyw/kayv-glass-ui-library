import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '../../src';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import ButtonPage from './pages/components/ButtonPage';
import BadgePage from './pages/components/BadgePage';
import ToastPage from './pages/components/ToastPage';
import CardPage from './pages/components/CardPage';
import AccordionPage from './pages/components/AccordionPage';
import AlertPage from './pages/components/AlertPage';
import InputPage from './pages/components/InputPage';
import SelectPage from './pages/components/SelectPage';
import AvatarPage from './pages/components/AvatarPage';
import ModalPage from './pages/components/ModalPage';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/badge" element={<BadgePage />} />
          <Route path="components/toast" element={<ToastPage />} />
          <Route path="components/card" element={<CardPage />} />
          <Route path="components/accordion" element={<AccordionPage />} />
          <Route path="components/alert" element={<AlertPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/avatar" element={<AvatarPage />} />
          <Route path="components/modal" element={<ModalPage />} />
          <Route path="components/:slug" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
