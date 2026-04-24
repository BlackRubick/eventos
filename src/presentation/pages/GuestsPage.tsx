import { useState } from 'react';
import { guests } from '../../infrastructure/mocks/guests.mock';
import { tables } from '../../infrastructure/mocks/tables.mock';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ================= TYPES ================= */
type RSVP = 'yes' | 'no' | 'pending';

type Guest = {
  id: string;
  name: string;
  email: string;
  rsvp: RSVP;
  tableId?: string;
  eventId?: string;
};

type FormState = {
  name: string;
  email: string;
  rsvp: RSVP;
  tableId: string;
};

/* ================= HOOK ================= */
const useGuests = (eventId: string | undefined) => {
  const [allGuests, setAllGuests] = useState<Guest[]>(
    guests.filter((g: Guest) => g.eventId === eventId)
  );
  const addGuest = (guest: Guest) => setAllGuests(gs => [...gs, guest]);
  return { allGuests, addGuest };
};

/* ================= STYLES ================= */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  .gp-root { font-family: 'DM Sans', sans-serif; color: #e2ddd4; }

  /* ── HEADER ── */
  .gp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(201,168,76,0.15);
    margin-bottom: 3rem;
  }
  .gp-header-left {}
  .gp-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a5040;
    margin-bottom: 0.4rem;
  }
  .gp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 300;
    line-height: 1;
    color: #f0ece2;
    margin: 0;
  }
  .gp-title em { font-style: italic; color: #c9a84c; }
  .gp-gold-line {
    width: 2.5rem; height: 1px;
    background: #c9a84c;
    margin-top: 0.75rem;
  }

  /* ── STATS PILLS ── */
  .gp-stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }
  .gp-stat-pill {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    border: 1px solid rgba(201,168,76,0.15);
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
  .gp-stat-pill-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 300;
    color: #c9a84c;
    line-height: 1;
  }
  .gp-stat-pill-label {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5a5040;
  }

  /* ── BTN NEW ── */
  .gp-btn-new {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 1px solid #c9a84c;
    color: #c9a84c;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.65rem 1.4rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    white-space: nowrap;
  }
  .gp-btn-new:hover { background: #c9a84c; color: #0a0908; }

  /* ── TABLE ── */
  .gp-table-wrap {
    margin-bottom: 4rem;
    overflow-x: auto;
  }
  .gp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .gp-table thead tr {
    border-bottom: 1px solid rgba(201,168,76,0.2);
  }
  .gp-table th {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4a4540;
    font-weight: 400;
    padding: 0 1rem 0.75rem;
    text-align: left;
  }
  .gp-table th:first-child { padding-left: 0; }
  .gp-table tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s;
  }
  .gp-table tbody tr:hover { background: rgba(201,168,76,0.03); }
  .gp-table td {
    padding: 1rem 1rem;
    vertical-align: middle;
    color: #9a9080;
  }
  .gp-table td:first-child {
    padding-left: 0;
    color: #e2ddd4;
    font-weight: 400;
  }
  .gp-guest-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(201,168,76,0.12);
    border: 1px solid rgba(201,168,76,0.2);
    font-size: 0.65rem;
    color: #c9a84c;
    font-weight: 500;
    margin-right: 0.6rem;
    flex-shrink: 0;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .gp-name-cell { display: flex; align-items: center; }

  /* RSVP badges */
  .gp-badge {
    display: inline-block;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    font-weight: 500;
  }
  .gp-badge-yes {
    background: rgba(201,168,76,0.12);
    color: #c9a84c;
    border: 1px solid rgba(201,168,76,0.25);
  }
  .gp-badge-no {
    background: rgba(180,60,40,0.12);
    color: #c0604a;
    border: 1px solid rgba(180,60,40,0.2);
  }
  .gp-badge-pending {
    background: rgba(255,255,255,0.04);
    color: #4a4540;
    border: 1px solid rgba(255,255,255,0.08);
  }

  /* empty row */
  .gp-empty-row td {
    text-align: center;
    padding: 3rem 0;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: #3a3530;
  }

  /* ── SECTION TITLE ── */
  .gp-section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }
  .gp-section-title h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 300;
    color: #e8e4dc;
    margin: 0;
  }
  .gp-section-line {
    flex: 1;
    height: 1px;
    background: rgba(201,168,76,0.1);
  }

  /* ── TABLES GRID ── */
  .gp-tables-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1px;
    background: rgba(201,168,76,0.08);
    margin-bottom: 3rem;
  }
  .gp-table-card {
    background: #0e0d0b;
    padding: 1.5rem;
    transition: background 0.2s;
  }
  .gp-table-card:hover { background: #121009; }
  .gp-table-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .gp-table-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: #e8e4dc;
  }
  .gp-table-card-count {
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #c9a84c;
    background: rgba(201,168,76,0.1);
    padding: 0.2rem 0.5rem;
  }
  .gp-table-guests {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .gp-table-guest-item {
    font-size: 0.8rem;
    color: #5a5040;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .gp-table-guest-item::before {
    content: '';
    display: inline-block;
    width: 3px; height: 3px;
    border-radius: 50%;
    background: rgba(201,168,76,0.3);
    flex-shrink: 0;
  }
  .gp-table-empty {
    font-size: 0.75rem;
    font-style: italic;
    color: #2a2520;
  }

  /* ── BACK LINK ── */
  .gp-back {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4a4540;
    text-decoration: none;
    transition: color 0.2s;
    margin-top: 1rem;
  }
  .gp-back:hover { color: #c9a84c; }

  /* ── MODAL ── */
  .gp-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4,3,2,0.82);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }
  .gp-modal {
    background: #141210;
    border: 1px solid rgba(201,168,76,0.2);
    width: 100%;
    max-width: 460px;
    padding: 2.5rem;
    position: relative;
  }
  .gp-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem;
    font-weight: 300;
    color: #f0ece2;
    margin: 0 0 0.2rem;
  }
  .gp-modal-sub {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 2rem;
  }
  .gp-modal-close {
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
  }
  .gp-modal-close:hover { color: #c9a84c; }

  .gp-field {
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
  }
  .gp-field label {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5a5040;
    margin-bottom: 0.4rem;
  }
  .gp-field input,
  .gp-field select {
    background: #0c0b09;
    border: 1px solid rgba(201,168,76,0.15);
    color: #e2ddd4;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    padding: 0.65rem 0.85rem;
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
    -webkit-appearance: none;
  }
  .gp-field input:focus,
  .gp-field select:focus { border-color: rgba(201,168,76,0.5); }
  .gp-field input::placeholder { color: #2a2520; }
  .gp-field select option { background: #141210; }

  .gp-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }
  .gp-field-row .gp-field { margin-bottom: 0; }

  .gp-form-error {
    font-size: 0.78rem;
    color: #c06050;
    margin-bottom: 0.75rem;
  }

  .gp-btn-submit {
    width: 100%;
    background: #c9a84c;
    border: none;
    color: #0a0908;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .gp-btn-submit:hover:not(:disabled) { background: #d4b86a; }
  .gp-btn-submit:disabled { opacity: 0.45; cursor: not-allowed; }

  .gp-success {
    text-align: center;
    padding: 2rem 0;
  }
  .gp-success-ring {
    width: 48px; height: 48px;
    border: 1px solid #c9a84c;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem;
  }
  .gp-success p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 300;
    color: #c9a84c;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* empty state page */
  .gp-empty-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
    gap: 1.5rem;
  }
  .gp-empty-page h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: #c9a84c;
  }
  .gp-empty-page p { font-size: 0.9rem; color: #4a4540; line-height: 1.8; }
  .gp-empty-page a { color: #c9a84c; text-decoration: none; border-bottom: 1px solid rgba(201,168,76,0.3); }
`;

/* ================= COMPONENT ================= */
export default function GuestsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const filteredTables = eventId ? tables.filter(t => t.eventId === eventId) : [];
  const { allGuests, addGuest } = useGuests(eventId);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', rsvp: 'pending', tableId: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email) { setError('Nombre y email son obligatorios'); return; }
    setLoading(true);
    setTimeout(() => {
      addGuest({ id: String(Date.now()), name: form.name, email: form.email, rsvp: form.rsvp, tableId: form.tableId || undefined, eventId });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ name: '', email: '', rsvp: 'pending', tableId: '' });
      }, 1200);
    }, 900);
  };

  const closeModal = () => { setShowModal(false); setError(''); };

  const initials = (name: string) => name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const confirmed = allGuests.filter(g => g.rsvp === 'yes').length;
  const declined  = allGuests.filter(g => g.rsvp === 'no').length;
  const pending   = allGuests.filter(g => g.rsvp === 'pending').length;

  /* ── EMPTY STATE ── */
  if (!eventId) {
    return (
      <>
        <style>{css}</style>
        <div className="gp-root">
          <div className="gp-empty-page">
            <h1>Invitados</h1>
            <p>
              Selecciona un evento en el{' '}
              <Link to="/dashboard">dashboard</Link>{' '}
              para ver los invitados y mesas.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="gp-root">

        {/* HEADER */}
        <div className="gp-header">
          <div className="gp-header-left">
            <p className="gp-eyebrow">Evento · {eventId}</p>
            <h1 className="gp-title">
              Lista de <em>invitados</em>
            </h1>
            <div className="gp-gold-line" />
          </div>
          <button className="gp-btn-new" onClick={() => setShowModal(true)}>
            <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" fill="none">
              <line x1="6" y1="1" x2="6" y2="11"/><line x1="1" y1="6" x2="11" y2="6"/>
            </svg>
            Agregar invitado
          </button>
        </div>

        {/* STATS */}
        <div className="gp-stats">
          {[
            { num: allGuests.length, label: 'Total' },
            { num: confirmed, label: 'Confirmados' },
            { num: pending, label: 'Pendientes' },
            { num: declined, label: 'No asisten' },
          ].map(s => (
            <div className="gp-stat-pill" key={s.label}>
              <span className="gp-stat-pill-num">{s.num}</span>
              <span className="gp-stat-pill-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="gp-table-wrap">
          <table className="gp-table">
            <thead>
              <tr>
                <th>Invitado</th>
                <th>Email</th>
                <th>Estatus</th>
                <th>Mesa</th>
              </tr>
            </thead>
            <tbody>
              {allGuests.length === 0 ? (
                <tr className="gp-empty-row">
                  <td colSpan={4}>Aún no hay invitados registrados</td>
                </tr>
              ) : (
                allGuests.map((guest, i) => (
                  <motion.tr
                    key={guest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <td>
                      <div className="gp-name-cell">
                        <span className="gp-guest-avatar">{initials(guest.name)}</span>
                        {guest.name}
                      </div>
                    </td>
                    <td>{guest.email}</td>
                    <td>
                      <span className={`gp-badge ${
                        guest.rsvp === 'yes' ? 'gp-badge-yes'
                        : guest.rsvp === 'no' ? 'gp-badge-no'
                        : 'gp-badge-pending'
                      }`}>
                        {guest.rsvp === 'yes' ? 'Confirmado' : guest.rsvp === 'no' ? 'No asistirá' : 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      {guest.tableId
                        ? filteredTables.find(t => t.id === guest.tableId)?.name ?? '—'
                        : <span style={{ color: '#2a2520' }}>Sin asignar</span>
                      }
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MESAS */}
        {filteredTables.length > 0 && (
          <>
            <div className="gp-section-title">
              <h2>Mesas del evento</h2>
              <div className="gp-section-line" />
            </div>
            <div className="gp-tables-grid">
              {filteredTables.map(table => {
                const seated = table.guests
                  .map(gId => allGuests.find(g => g.id === gId))
                  .filter(Boolean) as Guest[];
                return (
                  <div className="gp-table-card" key={table.id}>
                    <div className="gp-table-card-header">
                      <span className="gp-table-card-name">{table.name}</span>
                      <span className="gp-table-card-count">{seated.length} asientos</span>
                    </div>
                    {seated.length > 0 ? (
                      <ul className="gp-table-guests">
                        {seated.map(g => (
                          <li className="gp-table-guest-item" key={g.id}>{g.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="gp-table-empty">Sin invitados asignados</p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* BACK */}
        <Link to="/dashboard" className="gp-back">
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" fill="none">
            <polyline points="8,1 3,6 8,11"/>
          </svg>
          Volver al dashboard
        </Link>

        {/* MODAL */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="gp-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.28 }}
              >
                <form className="gp-modal" onSubmit={handleSubmit} noValidate>
                  <button type="button" className="gp-modal-close" onClick={closeModal}>✕</button>

                  {success ? (
                    <div className="gp-success">
                      <div className="gp-success-ring">
                        <svg width="20" height="20" viewBox="0 0 20 20" stroke="#c9a84c" strokeWidth="1.5" fill="none">
                          <polyline points="4,10 8,14 16,6"/>
                        </svg>
                      </div>
                      <p>Invitado agregado</p>
                    </div>
                  ) : (
                    <>
                      <h2 className="gp-modal-title">Nuevo invitado</h2>
                      <p className="gp-modal-sub">Completa los datos del invitado</p>

                      <div className="gp-field">
                        <label>Nombre completo</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Ej. Ana García" />
                      </div>

                      <div className="gp-field">
                        <label>Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
                      </div>

                      <div className="gp-field-row">
                        <div className="gp-field">
                          <label>Confirmación</label>
                          <select name="rsvp" value={form.rsvp} onChange={handleChange}>
                            <option value="pending">Pendiente</option>
                            <option value="yes">Confirmado</option>
                            <option value="no">No asistirá</option>
                          </select>
                        </div>
                        <div className="gp-field">
                          <label>Mesa</label>
                          <select name="tableId" value={form.tableId} onChange={handleChange}>
                            <option value="">Sin mesa</option>
                            {filteredTables.map(t => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {error && <p className="gp-form-error">{error}</p>}

                      <button className="gp-btn-submit" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"
                              style={{ animation: 'spin 0.8s linear infinite' }}>
                              <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                              <path d="M12 2a10 10 0 0 1 10 10"/>
                            </svg>
                            Guardando…
                          </>
                        ) : 'Agregar invitado'}
                      </button>
                    </>
                  )}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}