import { useState } from 'react';
import { events } from '../../infrastructure/mocks/event.mock';
import { tables } from '../../infrastructure/mocks/tables.mock';
import { photos } from '../../infrastructure/mocks/photos.mock';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

/* ================= STYLES ================= */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  .qp-root { font-family: 'DM Sans', sans-serif; color: #e2ddd4; }

  /* ── HEADER ── */
  .qp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(201,168,76,0.15);
    margin-bottom: 3rem;
  }
  .qp-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a5040;
    margin-bottom: 0.4rem;
  }
  .qp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 300;
    line-height: 1;
    color: #f0ece2;
    margin: 0;
  }
  .qp-title em { font-style: italic; color: #c9a84c; }
  .qp-gold-line { width: 2.5rem; height: 1px; background: #c9a84c; margin-top: 0.75rem; }

  /* ── BACK BTN ── */
  .qp-back {
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
  .qp-back:hover { color: #c9a84c; }

  /* ── EVENT SELECTOR ── */
  .qp-select-label {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 1.5rem;
  }
  .qp-events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1px;
    background: rgba(201,168,76,0.08);
  }
  .qp-event-card {
    background: #0e0d0b;
    cursor: pointer;
    border: none;
    text-align: left;
    transition: background 0.2s;
    overflow: hidden;
    position: relative;
  }
  .qp-event-card:hover { background: #121009; }
  .qp-event-img {
    width: 100%;
    aspect-ratio: 16/7;
    object-fit: cover;
    display: block;
    filter: brightness(0.5) saturate(0.5);
    transition: filter 0.3s;
  }
  .qp-event-card:hover .qp-event-img { filter: brightness(0.65) saturate(0.7); }
  .qp-event-body {
    padding: 1.25rem 1.5rem 1.5rem;
  }
  .qp-event-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 400;
    color: #e8e4dc;
    margin-bottom: 0.3rem;
    display: block;
  }
  .qp-event-meta {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: #4a4540;
  }
  .qp-event-arrow {
    position: absolute;
    top: 0.9rem; right: 1rem;
    font-size: 0.85rem;
    color: #2a2520;
    transition: color 0.2s, transform 0.2s;
  }
  .qp-event-card:hover .qp-event-arrow { color: #c9a84c; transform: translate(2px,-2px); }

  /* ── TABLES GRID ── */
  .qp-tables-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1px;
    background: rgba(201,168,76,0.08);
  }
  .qp-table-card {
    background: #0e0d0b;
    padding: 2rem 1.5rem;
    cursor: pointer;
    border: none;
    text-align: center;
    transition: background 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
  }
  .qp-table-card:hover { background: #131109; }
  .qp-table-card-num {
    position: absolute;
    top: 0.9rem; left: 1rem;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3a3530;
  }
  .qp-table-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 400;
    color: #e8e4dc;
  }
  /* QR wrapper — dark bg for contrast */
  .qp-qr-wrap {
    background: #f0ece2;
    padding: 10px;
    display: inline-flex;
  }
  .qp-table-guests-count {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4540;
  }
  .qp-table-hint {
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2a2520;
    transition: color 0.2s;
  }
  .qp-table-card:hover .qp-table-hint { color: #c9a84c; }

  /* ── MODAL ── */
  .qp-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4,3,2,0.88);
    backdrop-filter: blur(10px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }
  .qp-modal {
    background: #141210;
    border: 1px solid rgba(201,168,76,0.2);
    width: 100%;
    max-width: 500px;
    max-height: 88vh;
    overflow-y: auto;
    position: relative;
  }
  .qp-modal::-webkit-scrollbar { width: 3px; }
  .qp-modal::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.15); }

  .qp-modal-top {
    padding: 2rem 2rem 1.5rem;
    border-bottom: 1px solid rgba(201,168,76,0.1);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }
  .qp-modal-eyebrow {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a5040;
    margin-bottom: 0.3rem;
  }
  .qp-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 300;
    color: #f0ece2;
    margin: 0;
  }
  .qp-modal-title em { font-style: italic; color: #c9a84c; }
  .qp-modal-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #4a4540;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0.25rem 0.5rem;
    transition: color 0.2s;
    flex-shrink: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .qp-modal-close:hover { color: #c9a84c; }

  /* QR section in modal */
  .qp-modal-qr-section {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid rgba(201,168,76,0.08);
  }
  .qp-modal-qr-frame {
    background: #f0ece2;
    padding: 16px;
    display: inline-flex;
  }
  .qp-modal-qr-label {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4a4540;
    text-align: center;
  }
  .qp-modal-qr-value {
    font-size: 0.75rem;
    color: #3a3530;
    font-family: monospace;
    letter-spacing: 0.08em;
  }

  /* Gallery section */
  .qp-gallery-section {
    padding: 1.5rem 2rem 2rem;
  }
  .qp-gallery-title {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .qp-gallery-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(201,168,76,0.08);
  }
  .qp-gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .qp-gallery-img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    display: block;
    filter: brightness(0.75) saturate(0.7);
    transition: filter 0.25s;
  }
  .qp-gallery-img:hover { filter: brightness(0.95) saturate(1); }
  .qp-gallery-empty {
    grid-column: 1/-1;
    text-align: center;
    padding: 2rem 0;
    font-size: 0.8rem;
    font-style: italic;
    color: #3a3530;
  }

  .qp-modal-footer {
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid rgba(201,168,76,0.08);
  }
  .qp-btn-close {
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
  .qp-btn-close:hover { border-color: #c9a84c; color: #c9a84c; }

  /* no tables */
  .qp-no-tables {
    text-align: center;
    padding: 4rem 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 300;
    font-style: italic;
    color: #3a3530;
  }
`;

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

export default function QRPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const filteredTables = selectedEvent ? tables.filter(t => t.eventId === selectedEvent) : [];
  const activeEvent    = events.find(e => e.id === selectedEvent);
  const activeTable    = filteredTables.find(t => t.id === selectedTable);
  const tablePhotos    = selectedTable ? photos.filter(p => p.tableId === selectedTable) : [];

  return (
    <>
      <style>{css}</style>
      <div className="qp-root">

        {/* HEADER */}
        <div className="qp-header">
          <div>
            <p className="qp-eyebrow">
              {activeEvent ? `Evento · ${activeEvent.name}` : 'Acceso rápido'}
            </p>
            <h1 className="qp-title">
              {activeEvent ? <>Códigos <em>QR</em></> : <>QR y <em>galería</em></>}
            </h1>
            <div className="qp-gold-line" />
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
            <p className="qp-select-label">Selecciona un evento</p>
            <div className="qp-events-grid">
              {events.map(event => (
                <motion.button
                  key={event.id}
                  className="qp-event-card"
                  variants={fadeUp}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <img src={event.coverImage} alt={event.name} className="qp-event-img" />
                  <div className="qp-event-body">
                    <span className="qp-event-name">{event.name}</span>
                    <span className="qp-event-meta">{event.date} · {event.location}</span>
                  </div>
                  <span className="qp-event-arrow">↗</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: MESAS CON QR ── */}
        {selectedEvent && (
          <>
            <button className="qp-back" onClick={() => setSelectedEvent(null)}>
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" fill="none">
                <polyline points="8,1 3,6 8,11"/>
              </svg>
              Cambiar evento
            </button>

            {filteredTables.length === 0 ? (
              <p className="qp-no-tables">Este evento no tiene mesas configuradas.</p>
            ) : (
              <motion.div
                className="qp-tables-grid"
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                {filteredTables.map((table, i) => (
                  <motion.button
                    key={table.id}
                    className="qp-table-card"
                    variants={fadeUp}
                    onClick={() => setSelectedTable(table.id)}
                  >
                    <span className="qp-table-card-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="qp-table-name">{table.name}</span>
                    <div className="qp-qr-wrap">
                      <QRCodeCanvas value={`mesa-${table.id}`} size={80} />
                    </div>
                    <span className="qp-table-guests-count">{table.guests.length} invitados</span>
                    <span className="qp-table-hint">Ver galería</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* ── MODAL ── */}
        <AnimatePresence>
          {selectedTable && activeTable && (
            <motion.div
              className="qp-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTable(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.26 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="qp-modal">

                  {/* Header */}
                  <div className="qp-modal-top">
                    <div>
                      <p className="qp-modal-eyebrow">Código QR · Galería</p>
                      <h2 className="qp-modal-title"><em>{activeTable.name}</em></h2>
                    </div>
                    <button className="qp-modal-close" onClick={() => setSelectedTable(null)}>✕</button>
                  </div>

                  {/* QR */}
                  <div className="qp-modal-qr-section">
                    <div className="qp-modal-qr-frame">
                      <QRCodeCanvas value={`mesa-${selectedTable}`} size={140} />
                    </div>
                    <p className="qp-modal-qr-label">Escanea para subir fotos</p>
                    <p className="qp-modal-qr-value">mesa-{selectedTable}</p>
                  </div>

                  {/* Gallery */}
                  <div className="qp-gallery-section">
                    <p className="qp-gallery-title">Fotos del evento</p>
                    <div className="qp-gallery-grid">
                      {tablePhotos.length > 0 ? (
                        tablePhotos.map(photo => (
                          <img
                            key={photo.id}
                            src={photo.url}
                            alt="Foto evento"
                            className="qp-gallery-img"
                          />
                        ))
                      ) : (
                        <p className="qp-gallery-empty">Aún no hay fotos en esta mesa</p>
                      )}
                    </div>
                  </div>

                  <div className="qp-modal-footer">
                    <button className="qp-btn-close" onClick={() => setSelectedTable(null)}>
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