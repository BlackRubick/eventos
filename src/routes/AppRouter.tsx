import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../presentation/pages/LandingPage';
import DashboardPage from '../presentation/pages/DashboardPage';
import GuestsPage from '../presentation/pages/GuestsPage';
import TablesPage from '../presentation/pages/TablesPage';
import QRPage from '../presentation/pages/QRPage';
import PDFPage from '../presentation/pages/PDFPage';
import RSVPPage from '../presentation/pages/RSVPPage';
import PlanesPage from '../presentation/pages/PlanesPage';

import LoginPage from '../presentation/pages/LoginPage';
import MainLayout from '../presentation/layouts/MainLayout';
import EventLayout from '../presentation/layouts/EventLayout';
import RequireAuth from './RequireAuth';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/planes" element={<PlanesPage />} />
        <Route path="/login_magic" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rsvp/:code" element={<RSVPPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/guests" element={<GuestsPage />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/qr" element={<QRPage />} />
            <Route path="/pdf" element={<PDFPage />} />
            <Route path="/event/:eventId" element={<EventLayout />}>
              <Route path="guests" element={<GuestsPage />} />
              <Route path="tables" element={<TablesPage />} />
              <Route path="qr" element={<QRPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
