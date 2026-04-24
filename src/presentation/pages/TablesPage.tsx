import { tables } from '../../infrastructure/mocks/tables.mock';
import { guests } from '../../infrastructure/mocks/guests.mock';
import { events } from '../../infrastructure/mocks/event.mock';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ================= STYLES ================= */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  .tp-root { font-family: 'DM Sans', sans-serif; color: #e2ddd4; }

  /* ── HEADER ── */
  .tp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(201,168,76,0.15);
    margin-bottom: 3rem;
  }
  .tp-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a5040;
    margin-bottom: 0.4rem;
  }
  .tp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 300;
    line-height: 1;
    color: #f0ece2;
    margin: 0;
  }
  .tp-title em { font-style: italic; color: #c9a84c; }
  .tp-gold-line { width: 2.5rem; height: 1px; background: #c9a84c; margin-top: 0.75rem; }

  /* ── EVENT SELECTOR ── */
  .tp-select-label {
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 1.5rem;
  }
  .tp-events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1px;
    background: rgba(201,168,76,0.08);
  }
  .tp-event-card {
    background: #0e0d0b;
    padding: 1.75rem 1.5rem;
    cursor: pointer;
    text-align: left;
    border: none;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .tp-event-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: #c9a84c;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }
  .tp-event-card:hover { background: #121009; }
  .tp-event-card:hover::after { transform: scaleX(1); }
  .tp-event-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 400;
    color: #e8e4dc;
    margin-bottom: 0.4rem;
    display: block;
  }
  .tp-event-card-meta {
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: #4a4540;
  }
  .tp-event-card-arrow {
    position: absolute;
    top: 1.25rem; right: 1.25rem;
    color: #2a2520;
    font-size: 0.9rem;
    transition: color 0.2s, transform 0.2s;
  }
  .tp-event-card:hover .tp-event-card-arrow {
    color: #c9a84c;
    transform: translate(2px, -2px);
  }

  /* ── BACK BTN ── */
  .tp-back {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4540;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
    margin-bottom: 3rem;
    font-family: 'DM Sans', sans-serif;
  }
  .tp-back:hover { color: #c9a84c; }

  /* ── TABLES GRID ── */
  .tp-tables-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1px;
    background: rgba(201,168,76,0.08);
  }
  .tp-table-card {
    background: #0e0d0b;
    padding: 1.75rem 1.5rem;
    cursor: pointer;
    border: none;
    text-align: left;
    transition: background 0.2s;
    position: relative;
  }
  .tp-table-card:hover { background: #131109; }
  .tp-table-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .tp-table-card-num {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c9a84c;
  }
  .tp-table-card-seats {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #3a3530;
    background: rgba(201,168,76,0.07);
    padding: 0.2rem 0.5rem;
  }
  .tp-table-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 400;
    color: #e8e4dc;
    margin-bottom: 1rem;
    display: block;
  }
  .tp-table-card-guests {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .tp-table-card-guest {
    font-size: 0.75rem;
    color: #4a4540;
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }
  .tp-table-card-guest::before {
    content: '';
    display: inline-block;
    width: 3px; height: 3px;
    border-radius: 50%;
    background: rgba(201,168,76,0.25);
    flex-shrink: 0;
  }
  .tp-table-card-empty {
    font-size: 0.75rem;
    font-style: italic;
    color: #2a2520;
  }
  .tp-table-card-hover-hint {
    position: absolute;
    bottom: 1rem; right: 1rem;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2a2520;
    transition: color 0.2s;
  }
  .tp-table-card:hover .tp-table-card-hover-hint { color: #c9a84c; }

  /* ── MODAL ── */
  .tp-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4,3,2,0.85);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }
  .tp-modal {
    background: #141210;
    border: 1px solid rgba(201,168,76,0.2);
    width: 100%;
    max-width: 420px;
    padding: 2.5rem;
    position: relative;
  }
  .tp-modal-eyebrow {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a5040;
    margin-bottom: 0.35rem;
  }
  .tp-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: #f0ece2;
    margin: 0 0 2rem;
    line-height: 1.1;
  }
  .tp-modal-title em { font-style: italic; color: #c9a84c; }
  .tp-modal-close {
    position: absolute;
    top: 1.5rem; right: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #4a4540;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0.25rem 0.5rem;
    transition: color 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .tp-modal-close:hover { color: #c9a84c; }
  .tp-modal-divider {
    height: 1px;
    background: rgba(201,168,76,0.1);
    margin-bottom: 1.5rem;
  }
  .tp-modal-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .tp-modal-guest-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .tp-modal-guest-row:last-child { border-bottom: none; }
  .tp-modal-avatar {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.62rem;
    color: #c9a84c;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .tp-modal-guest-name {
    font-size: 0.88rem;
    color: #c0bab0;
  }
  .tp-modal-empty {
    font-size: 0.85rem;
    font-style: italic;
    color: #3a3530;
    text-align: center;
    padding: 1.5rem 0;
  }
  .tp-modal-footer {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }
  .tp-btn-close {
    background: transparent;
    border: 1px solid rgba(201,168,76,0.25);
    color: #7a7060;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.6rem 1.4rem;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .tp-btn-close:hover { border-color: #c9a84c; color: #c9a84c; }

  /* empty state */
  .tp-no-tables {
    text-align: center;
    padding: 4rem 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 300;
    font-style: italic;
    color: #3a3530;
  }
`;

const initials = (name: string) =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TablesPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const filteredTables = selectedEvent ? tables.filter(t => t.eventId === selectedEvent) : [];
  const filteredGuests = selectedEvent ? guests.filter(g => g.eventId === selectedEvent) : [];

  const activeEvent = events.find(e => e.id === selectedEvent);
  const activeTable = filteredTables.find(t => t.id === selectedTable);
  const tableGuests = activeTable
    ? activeTable.guests.map(gid => filteredGuests.find(g => g.id === gid)).filter(Boolean)
    : [];

  return (
    <>
      <style>{css}</style>
      <div className="tp-root">

        {/* HEADER */}
        <div className="tp-header">
          <div>
            <p className="tp-eyebrow">
              {activeEvent ? `Evento · ${activeEvent.name}` : 'Gestión de espacios'}
            </p>
            <h1 className="tp-title">
              {activeEvent ? <><em>Mesas</em> del evento</> : <>Orden de <em>mesas</em></>}
            </h1>
            <div className="tp-gold-line" />
          </div>
          {activeEvent && (
            <span style={{ fontSize: '0.75rem', color: '#4a4540', letterSpacing: '0.1em' }}>
              {filteredTables.length} mesa{filteredTables.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* ── STEP 1: ELEGIR EVENTO ── */}
        {!selectedEvent && (
          <motion.div variants={stagger} initial="hidden" animate="show">
            <p className="tp-select-label">Selecciona un evento</p>
            <div className="tp-events-grid">
              {events.map(event => (
                <motion.button
                  key={event.id}
                  className="tp-event-card"
                  variants={fadeUp}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <span className="tp-event-card-name">{event.name}</span>
                  <span className="tp-event-card-meta">{event.date} · {event.location}</span>
                  <span className="tp-event-card-arrow">↗</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: VER MESAS ── */}
        {selectedEvent && (
          <>
            <button className="tp-back" onClick={() => setSelectedEvent(null)}>
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" fill="none">
                <polyline points="8,1 3,6 8,11"/>
              </svg>
              Cambiar evento
            </button>

            {filteredTables.length === 0 ? (
              <p className="tp-no-tables">Este evento no tiene mesas configuradas.</p>
            ) : (
              <motion.div
                className="tp-tables-grid"
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                {filteredTables.map((table, i) => {
                  const seated = table.guests
                    .map(gid => filteredGuests.find(g => g.id === gid))
                    .filter(Boolean);
                  return (
                    <motion.button
                      key={table.id}
                      className="tp-table-card"
                      variants={fadeUp}
                      onClick={() => setSelectedTable(table.id)}
                    >
                      <div className="tp-table-card-top">
                        <span className="tp-table-card-num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="tp-table-card-seats">{seated.length} asientos</span>
                      </div>
                      <span className="tp-table-card-name">{table.name}</span>
                      {seated.length > 0 ? (
                        <ul className="tp-table-card-guests">
                          {seated.slice(0, 4).map(g => g && (
                            <li key={g.id} className="tp-table-card-guest">{g.name}</li>
                          ))}
                          {seated.length > 4 && (
                            <li className="tp-table-card-guest" style={{ color: '#3a3530' }}>
                              +{seated.length - 4} más
                            </li>
                          )}
                        </ul>
                      ) : (
                        <p className="tp-table-card-empty">Sin invitados asignados</p>
                      )}
                      <span className="tp-table-card-hover-hint">Ver detalle</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </>
        )}

        {/* ── MODAL DETALLE ── */}
        <AnimatePresence>
          {selectedTable && activeTable && (
            <motion.div
              className="tp-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTable(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="tp-modal">
                  <button className="tp-modal-close" onClick={() => setSelectedTable(null)}>✕</button>
                  <p className="tp-modal-eyebrow">Detalle de mesa</p>
                  <h2 className="tp-modal-title"><em>{activeTable.name}</em></h2>
                  <div className="tp-modal-divider" />

                  {tableGuests.length > 0 ? (
                    <ul className="tp-modal-list">
                      {tableGuests.map(g => g && (
                        <li key={g.id} className="tp-modal-guest-row">
                          <span className="tp-modal-avatar">{initials(g.name)}</span>
                          <span className="tp-modal-guest-name">{g.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="tp-modal-empty">Sin invitados asignados a esta mesa</p>
                  )}

                  <div className="tp-modal-footer">
                    <button className="tp-btn-close" onClick={() => setSelectedTable(null)}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}