import { Outlet, NavLink, useNavigate, useParams } from 'react-router-dom';
import { events } from '../../infrastructure/mocks/event.mock';

const css = `
  .ctx-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    padding: 0.9rem 1.1rem;
    border: 1px solid rgba(201,168,76,0.12);
    background: rgba(10,9,8,0.72);
    backdrop-filter: blur(12px);
  }

  .ctx-back {
    border: 1px solid rgba(201,168,76,0.18);
    background: transparent;
    color: #c9a84c;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.55rem 0.9rem;
    cursor: pointer;
  }

  .ctx-event-name {
    color: #e8e4dc;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 400;
  }

  .ctx-tabs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .ctx-tabs a {
    color: #4a4540;
    text-decoration: none;
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.45rem 0.75rem;
    border: 1px solid transparent;
  }

  .ctx-tabs a.active {
    color: #c9a84c;
    border-color: rgba(201,168,76,0.22);
    background: rgba(201,168,76,0.06);
  }

  @media (max-width: 768px) {
    .ctx-bar {
      align-items: flex-start;
    }
    .ctx-event-name {
      width: 100%;
      order: 3;
    }
  }
`;

export default function EventLayout() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const event = events.find(item => item.id === eventId);

  return (
    <>
      <style>{css}</style>
      <div className="ctx-bar">
        <button type="button" onClick={() => navigate('/dashboard')} className="ctx-back">
          ← Mis Evento
        </button>
        <span className="ctx-event-name">{event?.name ?? eventId}</span>
        <nav className="ctx-tabs">
          <NavLink to={`/event/${eventId}/guests`} className={({ isActive }) => isActive ? 'active' : ''}>Invitados</NavLink>
          <NavLink to={`/event/${eventId}/tables`} className={({ isActive }) => isActive ? 'active' : ''}>Mesas</NavLink>
          <NavLink to={`/event/${eventId}/qr`} className={({ isActive }) => isActive ? 'active' : ''}>QR &amp; Fotos</NavLink>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
