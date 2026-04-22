import { Outlet, NavLink } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

export default function MainLayout() {
  useDarkMode(); // Solo para mantener el efecto, sin botón
  return (
    <div className="min-h-screen bg-softgray text-black dark:bg-black dark:text-white font-sans">
      <nav className="flex justify-between items-center px-6 py-4 shadow-soft bg-white dark:bg-black">
        <div className="font-display text-2xl text-gold tracking-wide">Eventos</div>
        <div className="flex gap-4 text-lg items-center">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-gold' : ''}>Inicio</NavLink>
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'text-gold' : ''}>Dashboard</NavLink>
          <NavLink to="/guests" className={({isActive}) => isActive ? 'text-gold' : ''}>Invitados</NavLink>
          <NavLink to="/tables" className={({isActive}) => isActive ? 'text-gold' : ''}>Mesas</NavLink>
          <NavLink to="/qr" className={({isActive}) => isActive ? 'text-gold' : ''}>QR</NavLink>
          <NavLink to="/pdf" className={({isActive}) => isActive ? 'text-gold' : ''}>PDF</NavLink>
        </div>
      </nav>
      <main className="p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
