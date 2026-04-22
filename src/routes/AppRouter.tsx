import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../presentation/pages/LandingPage';
import DashboardPage from '../presentation/pages/DashboardPage';
import GuestsPage from '../presentation/pages/GuestsPage';
import TablesPage from '../presentation/pages/TablesPage';
import QRPage from '../presentation/pages/QRPage';
import PDFPage from '../presentation/pages/PDFPage';

import LoginPage from '../presentation/pages/LoginPage';
import MainLayout from '../presentation/layouts/MainLayout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="/pdf" element={<PDFPage />} />
          {/* Rutas por evento */}
          <Route path="/event/:eventId/guests" element={<GuestsPage />} />
          <Route path="/event/:eventId/tables" element={<TablesPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
