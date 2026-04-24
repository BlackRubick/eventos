import { Outlet, NavLink } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  .layout-root {
    min-height: 100vh;
    background: #0a0908;
    color: #e2ddd4;
    font-family: 'DM Sans', sans-serif;
  }

  .layout-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    height: 60px;
    background: rgba(10,9,8,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,168,76,0.1);
  }

  .layout-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: #c9a84c;
    text-decoration: none;
    flex-shrink: 0;
  }

  .layout-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
  }

  .layout-links a {
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4a4540;
    text-decoration: none;
    padding: 0.4rem 0.85rem;
    transition: color 0.2s;
    position: relative;
  }

  .layout-links a::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0.85rem;
    right: 0.85rem;
    height: 1px;
    background: #c9a84c;
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }

  .layout-links a:hover {
    color: #9a9080;
  }

  .layout-links a.active {
    color: #c9a84c;
  }

  .layout-links a.active::after {
    transform: scaleX(1);
  }

  .layout-main {
    padding: 2.5rem 3rem 5rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .layout-nav { padding: 0 1.25rem; }
    .layout-links { gap: 0; }
    .layout-links a { padding: 0.4rem 0.5rem; font-size: 0.65rem; }
    .layout-main { padding: 1.5rem 1.25rem 4rem; }
  }
`;

export default function MainLayout() {
  useDarkMode();

  return (
    <>
      <style>{css}</style>
      <div className="layout-root">
        <nav className="layout-nav">
          <a href="/" className="layout-logo">Eventum</a>
          <ul className="layout-links">
            {[
              { to: '/', label: 'Inicio' },
              { to: '/dashboard', label: 'Dashboard' },
              { to: '/guests', label: 'Invitados' },
              { to: '/tables', label: 'Mesas' },
              { to: '/qr', label: 'QR' },
              { to: '/pdf', label: 'PDF' },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}