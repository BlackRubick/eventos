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
  rsvpCode?: string;
  rsvpUrl?: string;
  phone?: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rsvp: RSVP;
  tableId: string;
};

const generateRsvpCode = () =>
  `RSV-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

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
  .gp-gold-line { width: 2.5rem; height: 1px; background: #c9a84c; margin-top: 0.75rem; }

  /* ── STATS ── */
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
  .gp-table-wrap { margin-bottom: 4rem; overflow-x: auto; }
  .gp-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  .gp-table thead tr { border-bottom: 1px solid rgba(201,168,76,0.2); }
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
  .gp-table td { padding: 1rem; vertical-align: middle; color: #9a9080; }
  .gp-table td:first-child { padding-left: 0; color: #e2ddd4; font-weight: 400; }

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

  .gp-badge {
    display: inline-block;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    font-weight: 500;
  }
  .gp-badge-yes {
    background: rgba(29,158,117,0.12);
    color: #1D9E75;
    border: 1px solid rgba(29,158,117,0.25);
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
  .gp-section-line { flex: 1; height: 1px; background: rgba(201,168,76,0.1); }

  /* ── TABLES GRID ── */
  .gp-tables-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1px;
    background: rgba(201,168,76,0.08);
    margin-bottom: 3rem;
  }
  .gp-table-card { background: #0e0d0b; padding: 1.5rem; transition: background 0.2s; }
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
  .gp-table-guests { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
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
  .gp-table-empty { font-size: 0.75rem; font-style: italic; color: #2a2520; }

  /* ── BACK ── */
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

  /* ── EMPTY STATE ── */
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

  /* ════════════════════════════════
     MODAL NUEVO INVITADO
  ════════════════════════════════ */
  .gp-overlay {
    position: fixed;
    inset: 0;
    background: rgba(4,3,2,0.88);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .gp-modal {
    background: #111009;
    border: 1px solid rgba(201,168,76,0.2);
    width: 100%;
    max-width: 520px;
    position: relative;
    overflow: hidden;
    max-height: 90vh;
    overflow-y: auto;
  }
  .gp-modal::-webkit-scrollbar { width: 3px; }
  .gp-modal::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.15); }

  /* línea dorada superior */
  .gp-modal-accent {
    position: sticky;
    top: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent);
    z-index: 1;
  }

  /* esquinas decorativas */
  .gp-modal-corner {
    position: absolute;
    width: 10px; height: 10px;
    border-color: rgba(201,168,76,0.25);
    border-style: solid;
    pointer-events: none;
  }
  .gp-modal-corner-tl { top: -1px; left: -1px;   border-width: 1px 0 0 1px; }
  .gp-modal-corner-tr { top: -1px; right: -1px;  border-width: 1px 1px 0 0; }
  .gp-modal-corner-bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
  .gp-modal-corner-br { bottom: -1px; right: -1px;border-width: 0 1px 1px 0; }

  .gp-modal-header {
    padding: 28px 32px 22px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }
  .gp-modal-eyebrow {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #3a3530;
    margin-bottom: 6px;
  }
  .gp-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.85rem;
    font-weight: 300;
    color: #f0ece2;
    line-height: 1;
    margin: 0;
  }
  .gp-modal-title em { font-style: italic; color: #c9a84c; }

  .gp-modal-close {
    background: none;
    border: 1px solid rgba(255,255,255,0.07);
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: #3a3530;
    transition: border-color 0.2s, color 0.2s;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .gp-modal-close:hover { border-color: rgba(201,168,76,0.35); color: #c9a84c; }

  .gp-modal-body { padding: 24px 32px 28px; }

  /* campos */
  .gp-mfield {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
  }
  .gp-mfield label {
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #4a4540;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .gp-mfield-req { color: #c9a84c; font-size: 0.75rem; line-height: 1; }
  .gp-mfield-opt { color: #2a2520; font-size: 0.6rem; letter-spacing: 0.06em; text-transform: none; }

  .gp-mfield input,
  .gp-mfield select {
    background: #0a0908;
    border: 1px solid rgba(201,168,76,0.1);
    color: #e2ddd4;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    padding: 0.7rem 0.9rem;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
  }
  .gp-mfield input:focus,
  .gp-mfield select:focus {
    border-color: rgba(201,168,76,0.45);
    background: #0c0b09;
  }
  .gp-mfield input::placeholder { color: #252220; font-size: 0.85rem; }
  .gp-mfield select option { background: #111009; }
  .gp-mfield input:disabled {
    color: #3a3530;
    cursor: not-allowed;
    opacity: 1;
  }

  .gp-mfield-hint {
    font-size: 0.68rem;
    color: #2a2520;
    margin-top: 5px;
    letter-spacing: 0.03em;
    line-height: 1.5;
  }

  /* dos columnas */
  .gp-mcols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 18px;
  }
  .gp-mcols .gp-mfield { margin-bottom: 0; }

  /* teléfono con prefijo */
  .gp-phone-row { display: flex; }
  .gp-phone-prefix {
    background: #0a0908;
    border: 1px solid rgba(201,168,76,0.1);
    border-right: none;
    padding: 0.7rem 0.85rem;
    font-size: 0.82rem;
    color: #3a3530;
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .gp-phone-prefix svg { width: 11px; height: 11px; flex-shrink: 0; }
  .gp-phone-row input { border-left: none !important; }

  /* divisor */
  .gp-mdivider {
    height: 1px;
    background: rgba(255,255,255,0.03);
    margin: 6px 0 20px;
  }

  /* RSVP botones */
  .gp-rsvp-opts { display: flex; gap: 6px; margin-top: 4px; }
  .gp-rsvp-opt {
    flex: 1;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 9px 6px;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;
    background: #0a0908;
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #3a3530;
    user-select: none;
  }
  .gp-rsvp-opt:hover { border-color: rgba(255,255,255,0.12); color: #6a6050; }
  .gp-rsvp-opt.gp-rsvp-pending.gp-rsvp-sel {
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.04);
    color: #9a9080;
  }
  .gp-rsvp-opt.gp-rsvp-yes.gp-rsvp-sel {
    border-color: rgba(29,158,117,0.4);
    background: rgba(29,158,117,0.08);
    color: #1D9E75;
  }
  .gp-rsvp-opt.gp-rsvp-no.gp-rsvp-sel {
    border-color: rgba(192,96,74,0.35);
    background: rgba(192,96,74,0.08);
    color: #c0604a;
  }

  /* MESAS GRID */
  .gp-mesa-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-top: 4px;
  }
  .gp-mesa-opt {
    border: 1px solid rgba(201,168,76,0.08);
    padding: 8px 4px;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;
    background: #0a0908;
    user-select: none;
  }
  .gp-mesa-opt:hover:not(.gp-mesa-full) {
    border-color: rgba(201,168,76,0.3);
    background: rgba(201,168,76,0.04);
  }
  .gp-mesa-opt.gp-mesa-sel {
    border-color: #c9a84c;
    background: rgba(201,168,76,0.08);
  }
  .gp-mesa-opt.gp-mesa-full {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .gp-mesa-opt.gp-mesa-none {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gp-mesa-name {
    font-size: 0.65rem;
    color: #c9a84c;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 2px;
  }
  .gp-mesa-none .gp-mesa-name { margin-bottom: 0; }
  .gp-mesa-count { font-size: 0.6rem; color: #3a3530; letter-spacing: 0.06em; }
  .gp-mesa-full .gp-mesa-name { color: #3a3530; }

  /* error */
  .gp-form-error {
    font-size: 0.75rem;
    color: #c06050;
    margin-bottom: 0.75rem;
    letter-spacing: 0.03em;
  }

  /* footer del modal */
  .gp-modal-footer {
    padding: 0 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .gp-btn-submit {
    width: 100%;
    background: #c9a84c;
    border: none;
    color: #0a0908;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.95rem;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .gp-btn-submit:hover:not(:disabled) { background: #d4b86a; }
  .gp-btn-submit:disabled { opacity: 0.45; cursor: not-allowed; }
  .gp-btn-cancel {
    background: transparent;
    border: none;
    color: #3a3530;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 6px;
    cursor: pointer;
    transition: color 0.15s;
    width: 100%;
    text-align: center;
  }
  .gp-btn-cancel:hover { color: #7a7060; }

  /* success */
  .gp-success {
    text-align: center;
    padding: 3rem 2rem;
  }
  .gp-success-ring {
    width: 52px; height: 52px;
    border: 1px solid #c9a84c;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.25rem;
  }
  .gp-success p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: #c9a84c;
    margin-bottom: 0.5rem;
  }
  .gp-success small {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #3a3530;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

/* ─── tabla de mesas mock con capacidad ─── */
type TableWithCap = {
  id: string;
  name: string;
  eventId?: string;
  guests: string[];
  capacity?: number;
};

/* ================= COMPONENT ================= */
export default function GuestsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const filteredTables = (
    eventId ? tables.filter(t => t.eventId === eventId) : []
  ) as TableWithCap[];
  const { allGuests, addGuest } = useGuests(eventId);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    rsvp: 'pending',
    tableId: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.email) {
      setError('Nombre y correo son obligatorios');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const rsvpCode = generateRsvpCode();
      const fullName = `${form.firstName} ${form.lastName}`.trim();
      addGuest({
        id: String(Date.now()),
        name: fullName,
        email: form.email,
        phone: form.phone || undefined,
        rsvp: form.rsvp,
        tableId: form.tableId || undefined,
        eventId,
        rsvpCode,
        rsvpUrl: `/rsvp/${rsvpCode}`,
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ firstName: '', lastName: '', email: '', phone: '', rsvp: 'pending', tableId: '' });
      }, 1400);
    }, 900);
  };

  const closeModal = () => {
    setShowModal(false);
    setError('');
  };

  const initials = (name: string) =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const confirmed = allGuests.filter(g => g.rsvp === 'yes').length;
  const declined  = allGuests.filter(g => g.rsvp === 'no').length;
  const pending   = allGuests.filter(g => g.rsvp === 'pending').length;

  const CAP = 8; // capacidad por mesa (ajústalo a tu mock)

  /* ── EMPTY STATE ── */
  if (!eventId) {
    return (
      <>
        <style>{css}</style>
        <div className="gp-root">
          <div className="gp-empty-page">
            <h1>Invitados</h1>
            <p>
              Selecciona un Rével en el{' '}
              <Link to="/dashboard">dashboard</Link>{' '}
              para ver los invitados.
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
          <div>
            <p className="gp-eyebrow">Rével · {eventId}</p>
            <h1 className="gp-title">Lista de <em>invitados</em></h1>
            <div className="gp-gold-line" />
          </div>
          <button className="gp-btn-new" onClick={() => setShowModal(true)}>
            <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" />
            </svg>
            Agregar invitado
          </button>
        </div>

        {/* STATS */}
        <div className="gp-stats">
          {[
            { num: allGuests.length, label: 'Total' },
            { num: confirmed, label: 'Confirmados' },
            { num: pending,   label: 'Pendientes' },
            { num: declined,  label: 'No asisten' },
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
                <th>RSVP</th>
              </tr>
            </thead>
            <tbody>
              {allGuests.length === 0 ? (
                <tr className="gp-empty-row">
                  <td colSpan={5}>Aún no hay invitados registrados</td>
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
                        {guest.rsvp === 'yes' ? 'Confirmado'
                          : guest.rsvp === 'no' ? 'No asistirá'
                          : 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      {guest.tableId
                        ? filteredTables.find(t => t.id === guest.tableId)?.name ?? '—'
                        : <span style={{ color: '#2a2520' }}>Sin asignar</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#c9a84c', letterSpacing: '0.08em' }}>
                          {guest.rsvpCode ?? '—'}
                        </span>
                        {guest.rsvpCode && (
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(
                              `${window.location.origin}/rsvp/${guest.rsvpCode}`
                            )}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(201,168,76,0.2)',
                              color: '#c9a84c',
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.6rem',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                            }}
                          >
                            copiar link
                          </button>
                        )}
                      </div>
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
              <h2>Mesas del Rével</h2>
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
            <polyline points="8,1 3,6 8,11" />
          </svg>
          Volver al dashboard
        </Link>

        {/* ══════════ MODAL ══════════ */}
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
                style={{ width: '100%', maxWidth: 520 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.28 }}
              >
                <form className="gp-modal" onSubmit={handleSubmit} noValidate>

                  {/* esquinas */}
                  <div className="gp-modal-corner gp-modal-corner-tl" />
                  <div className="gp-modal-corner gp-modal-corner-tr" />
                  <div className="gp-modal-corner gp-modal-corner-bl" />
                  <div className="gp-modal-corner gp-modal-corner-br" />

                  {/* línea dorada */}
                  <div className="gp-modal-accent" />

                  {success ? (
                    <div className="gp-success">
                      <div className="gp-success-ring">
                        <svg width="22" height="22" viewBox="0 0 22 22" stroke="#c9a84c" strokeWidth="1.5" fill="none">
                          <polyline points="4,11 9,16 18,6" />
                        </svg>
                      </div>
                      <p>Invitado agregado</p>
                      <small>El código RSVP fue generado</small>
                    </div>
                  ) : (
                    <>
                      {/* header */}
                      <div className="gp-modal-header">
                        <div>
                          <p className="gp-modal-eyebrow">Rével · Gestión</p>
                          <h2 className="gp-modal-title">Nuevo <em>invitado</em></h2>
                        </div>
                        <button type="button" className="gp-modal-close" onClick={closeModal}>
                          <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2" fill="none">
                            <line x1="1" y1="1" x2="9" y2="9" /><line x1="9" y1="1" x2="1" y2="9" />
                          </svg>
                        </button>
                      </div>

                      {/* body */}
                      <div className="gp-modal-body">

                        {/* nombre + apellido */}
                        <div className="gp-mcols">
                          <div className="gp-mfield">
                            <label>
                              Nombre <span className="gp-mfield-req">*</span>
                            </label>
                            <input
                              name="firstName"
                              value={form.firstName}
                              onChange={handleChange}
                              placeholder="Ana"
                              autoComplete="given-name"
                            />
                          </div>
                          <div className="gp-mfield">
                            <label>Apellido</label>
                            <input
                              name="lastName"
                              value={form.lastName}
                              onChange={handleChange}
                              placeholder="García"
                              autoComplete="family-name"
                            />
                          </div>
                        </div>

                        {/* email */}
                        <div className="gp-mfield">
                          <label>
                            Correo electrónico <span className="gp-mfield-req">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="correo@ejemplo.com"
                            autoComplete="email"
                          />
                          <p className="gp-mfield-hint">
                            Se enviará el link de RSVP a este correo
                          </p>
                        </div>

                        {/* teléfono */}
                        <div className="gp-mfield">
                          <label>
                            Teléfono{' '}
                            <span className="gp-mfield-opt">(opcional)</span>
                          </label>
                          <div className="gp-phone-row">
                            <div className="gp-phone-prefix">
                              <svg viewBox="0 0 12 12" stroke="#3a3530" strokeWidth="1.5" fill="none">
                                <rect x="1" y="2" width="10" height="8" rx="1" />
                                <line x1="1" y1="5" x2="11" y2="5" />
                              </svg>
                              +52
                            </div>
                            <input
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="55 1234 5678"
                              autoComplete="tel"
                            />
                          </div>
                        </div>

                        <div className="gp-mdivider" />

                        {/* confirmación RSVP */}
                        <div className="gp-mfield">
                          <label>Confirmación inicial</label>
                          <div className="gp-rsvp-opts">
                            {(
                              [
                                { val: 'pending', label: 'Pendiente',   cls: 'gp-rsvp-pending' },
                                { val: 'yes',     label: 'Confirmado',  cls: 'gp-rsvp-yes'     },
                                { val: 'no',      label: 'No asistirá', cls: 'gp-rsvp-no'      },
                              ] as const
                            ).map(opt => (
                              <div
                                key={opt.val}
                                className={`gp-rsvp-opt ${opt.cls}${form.rsvp === opt.val ? ' gp-rsvp-sel' : ''}`}
                                onClick={() => setForm(f => ({ ...f, rsvp: opt.val }))}
                              >
                                {opt.label}
                              </div>
                            ))}
                          </div>
                          <p className="gp-mfield-hint">
                            El invitado puede cambiarlo desde su link personal
                          </p>
                        </div>

                        {/* mesas */}
                        {filteredTables.length > 0 && (
                          <div className="gp-mfield">
                            <label>Mesa asignada</label>
                            <div className="gp-mesa-grid">
                              {filteredTables.map(t => {
                                const ocupados = t.guests.length;
                                const cap = t.capacity ?? CAP;
                                const llena = ocupados >= cap;
                                const sel = form.tableId === t.id;
                                return (
                                  <div
                                    key={t.id}
                                    className={`gp-mesa-opt${sel ? ' gp-mesa-sel' : ''}${llena ? ' gp-mesa-full' : ''}`}
                                    onClick={() => !llena && setForm(f => ({ ...f, tableId: sel ? '' : t.id }))}
                                  >
                                    <span className="gp-mesa-name">{t.name}</span>
                                    <span className="gp-mesa-count">{ocupados}/{cap}</span>
                                  </div>
                                );
                              })}
                              {/* opción sin mesa */}
                              <div
                                className={`gp-mesa-opt gp-mesa-none${form.tableId === '' ? ' gp-mesa-sel' : ''}`}
                                onClick={() => setForm(f => ({ ...f, tableId: '' }))}
                              >
                                <span className="gp-mesa-name">Sin mesa</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {error && <p className="gp-form-error">{error}</p>}
                      </div>

                      {/* footer */}
                      <div className="gp-modal-footer">
                        <button className="gp-btn-submit" type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"
                                style={{ animation: 'spin 0.8s linear infinite' }}>
                                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                <path d="M12 2a10 10 0 0 1 10 10" />
                              </svg>
                              Guardando…
                            </>
                          ) : 'Agregar invitado'}
                        </button>
                        <button type="button" className="gp-btn-cancel" onClick={closeModal}>
                          Cancelar
                        </button>
                      </div>
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