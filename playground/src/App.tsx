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
import BreadcrumbPage from './pages/components/BreadcrumbPage';
import CalendarPage from './pages/components/CalendarPage';
import FileInputPage from './pages/components/FileInputPage';
import TooltipPage from './pages/components/TooltipPage';
import NavbarPage from './pages/components/NavbarPage';
import FooterPage from './pages/components/FooterPage';
import DrawerPage from './pages/components/DrawerPage';
import TabsPage from './pages/components/TabsPage';
import ProgressPage from './pages/components/ProgressPage';
import CheckboxPage from './pages/components/CheckboxPage';
import GlobePage from './pages/components/GlobePage';
import MenuBarPage from './pages/components/MenuBarPage';
import ConfettiPage from './pages/components/ConfettiPage';
import BackgroundPage from './pages/components/BackgroundPage';
import DocsPage from './pages/DocsPage';
import ThemingPage from './pages/ThemingPage';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="docs" element={<DocsPage />} />
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
          <Route path="components/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="components/calendar" element={<CalendarPage />} />
          <Route path="components/file-input" element={<FileInputPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />
          <Route path="components/navbar" element={<NavbarPage />} />
          <Route path="components/footer" element={<FooterPage />} />
          <Route path="components/drawer" element={<DrawerPage />} />
          <Route path="components/tabs" element={<TabsPage />} />
          <Route path="components/progress" element={<ProgressPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/globe" element={<GlobePage />} />
          <Route path="components/menubar" element={<MenuBarPage />} />
          <Route path="components/confetti" element={<ConfettiPage />} />
          <Route path="components/backgrounds" element={<BackgroundPage />} />
          <Route path="theming" element={<ThemingPage />} />
          <Route path="components/:slug" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
