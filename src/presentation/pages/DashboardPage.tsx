import { useState } from 'react';
import { events } from '../../infrastructure/mocks/event.mock';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ================= TYPES ================= */
type EventType = {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  coverImage: string;
  tablesCount?: number;
};

type FormState = {
  name: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  tablesCount: string;
};

/* ================= HOOK ================= */
const useEvents = () => {
  const [allEvents, setAllEvents] = useState<EventType[]>(events);
  const addEvent = (event: EventType) => {
    setAllEvents(evts => [...evts, event]);
  };
  return { allEvents, addEvent };
};

/* ================= COMPONENT ================= */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { allEvents, addEvent } = useEvents();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    date: '',
    location: '',
    description: '',
    coverImage: '/src/assets/hero.png',
    tablesCount: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'tablesCount') {
      let val = value.replace(/\D/g, '');
      if (val.startsWith('0')) val = val.replace(/^0+/, '');
      setForm(f => ({ ...f, tablesCount: val }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
      setForm(f => ({ ...f, coverImage: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.date || !form.location) {
      setError('Completa nombre, fecha y lugar');
      return;
    }
    const tablesCount = Number(form.tablesCount) || 1;
    setLoading(true);
    setTimeout(() => {
      addEvent({
        id: String(Date.now()),
        name: form.name,
        date: form.date,
        location: form.location,
        description: form.description,
        coverImage: imagePreview || form.coverImage,
        tablesCount,
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ name: '', date: '', location: '', description: '', coverImage: '/src/assets/hero.png', tablesCount: '' });
        setImagePreview(null);
      }, 1200);
    }, 900);
  };

  const closeModal = () => {
    setShowModal(false);
    setError('');
    setImagePreview(null);
  };

  /* ---- STYLES ---- */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

    .dash-root {
      min-height: 100vh;
      background: #0c0c0e;
      color: #e8e4dc;
      font-family: 'DM Sans', sans-serif;
      padding: 2.5rem 2rem 4rem;
    }

    /* ---- HEADER ---- */
    .dash-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 3rem;
      border-bottom: 1px solid rgba(212,176,106,0.18);
      padding-bottom: 1.5rem;
    }
    .dash-header h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.2rem;
      font-weight: 300;
      letter-spacing: 0.04em;
      color: #e8e4dc;
      margin: 0;
      line-height: 1;
    }
    .dash-header h1 span {
      color: #c9a84c;
    }
    .dash-count {
      font-size: 0.78rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #7a7060;
      margin-bottom: 0.25rem;
    }

    /* ---- NEW EVENT BUTTON ---- */
    .btn-new {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      border: 1px solid #c9a84c;
      color: #c9a84c;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 0.65rem 1.4rem;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .btn-new:hover {
      background: #c9a84c;
      color: #0c0c0e;
    }
    .btn-new svg { width: 14px; height: 14px; }

    /* ---- GRID ---- */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5px;
    }

    /* ---- EVENT CARD ---- */
    .event-card {
      position: relative;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      text-align: left;
      overflow: hidden;
      aspect-ratio: 3/4;
      display: block;
    }
    .event-card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: brightness(0.55) saturate(0.6);
      transition: filter 0.45s ease, transform 0.45s ease;
    }
    .event-card:hover .event-card-img {
      filter: brightness(0.75) saturate(0.9);
      transform: scale(1.04);
    }
    .event-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.1) 55%, transparent 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.6rem 1.4rem;
    }
    .event-card-tag {
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #c9a84c;
      margin-bottom: 0.5rem;
    }
    .event-card-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.7rem;
      font-weight: 400;
      line-height: 1.15;
      color: #f0ece2;
      margin: 0 0 0.5rem;
    }
    .event-card-meta {
      font-size: 0.75rem;
      color: #9a9080;
      letter-spacing: 0.06em;
    }
    .event-card-desc {
      font-size: 0.8rem;
      color: #7a7060;
      margin-top: 0.35rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .event-card-tables {
      margin-top: 0.75rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #c9a84c;
      border: 1px solid rgba(201,168,76,0.3);
      padding: 0.25rem 0.6rem;
    }
    .event-card-arrow {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      width: 32px;
      height: 32px;
      border: 1px solid rgba(201,168,76,0);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s, background 0.3s;
    }
    .event-card:hover .event-card-arrow {
      border-color: rgba(201,168,76,0.5);
      background: rgba(201,168,76,0.1);
    }
    .event-card-arrow svg { width: 14px; height: 14px; stroke: #c9a84c; fill: none; }

    /* ---- EMPTY STATE ---- */
    .empty-state {
      grid-column: 1/-1;
      text-align: center;
      padding: 5rem 0;
      color: #4a4640;
    }
    .empty-state p {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      font-weight: 300;
      font-style: italic;
    }

    /* ---- MODAL OVERLAY ---- */
    .modal-overlay {
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
    .modal-panel {
      background: #141210;
      border: 1px solid rgba(201,168,76,0.2);
      width: 100%;
      max-width: 520px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2.5rem;
      position: relative;
    }
    .modal-panel::-webkit-scrollbar { width: 4px; }
    .modal-panel::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); }

    .modal-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 300;
      color: #e8e4dc;
      margin: 0 0 0.25rem;
    }
    .modal-subtitle {
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #5a5040;
      margin-bottom: 2rem;
    }
    .modal-close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #5a5040;
      font-size: 1.4rem;
      line-height: 1;
      padding: 0.25rem 0.5rem;
      transition: color 0.2s;
    }
    .modal-close:hover { color: #c9a84c; }

    /* ---- FORM ---- */
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .form-field {
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
    }
    .form-field label {
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #7a7060;
      margin-bottom: 0.4rem;
    }
    .form-field input,
    .form-field textarea {
      background: #0c0c0e;
      border: 1px solid rgba(201,168,76,0.15);
      color: #e8e4dc;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      padding: 0.65rem 0.85rem;
      outline: none;
      transition: border-color 0.2s;
      resize: none;
    }
    .form-field input:focus,
    .form-field textarea:focus {
      border-color: rgba(201,168,76,0.5);
    }
    .form-field input::placeholder,
    .form-field textarea::placeholder { color: #3a3530; }

    /* Image upload */
    .img-upload-area {
      border: 1px dashed rgba(201,168,76,0.2);
      padding: 1.25rem;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      position: relative;
    }
    .img-upload-area:hover {
      border-color: rgba(201,168,76,0.4);
      background: rgba(201,168,76,0.03);
    }
    .img-upload-area input[type=file] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
    }
    .img-upload-preview {
      width: 100%;
      height: 120px;
      object-fit: cover;
      display: block;
      margin-bottom: 0.5rem;
    }
    .img-upload-text {
      font-size: 0.75rem;
      color: #5a5040;
      letter-spacing: 0.08em;
    }
    .img-upload-text span { color: #c9a84c; }

    /* Error */
    .form-error {
      font-size: 0.78rem;
      color: #c56a4a;
      margin-bottom: 1rem;
      letter-spacing: 0.04em;
    }

    /* Submit button */
    .btn-submit {
      width: 100%;
      background: #c9a84c;
      border: none;
      color: #0c0c0e;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 0.9rem;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .btn-submit:hover:not(:disabled) { background: #d4b86a; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Success */
    .success-msg {
      text-align: center;
      padding: 2rem 0;
    }
    .success-msg .check {
      width: 48px;
      height: 48px;
      border: 1px solid #c9a84c;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    .success-msg p {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem;
      font-weight: 300;
      color: #c9a84c;
    }

    /* Divider line */
    .gold-line {
      width: 2.5rem;
      height: 1px;
      background: #c9a84c;
      margin: 1rem 0 0;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="dash-root">
        {/* HEADER */}
        <div className="dash-header">
          <div>
            <p className="dash-count">{allEvents.length} evento{allEvents.length !== 1 ? 's' : ''}</p>
            <h1>Mis <span>Eventos</span></h1>
            <div className="gold-line" />
          </div>
          <button className="btn-new" onClick={() => setShowModal(true)}>
            <svg viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" fill="none">
              <line x1="7" y1="1" x2="7" y2="13" />
              <line x1="1" y1="7" x2="13" y2="7" />
            </svg>
            Nuevo evento
          </button>
        </div>

        {/* GRID */}
        <div className="events-grid">
          {allEvents.length === 0 && (
            <div className="empty-state">
              <p>Aún no hay eventos creados.</p>
            </div>
          )}
          {allEvents.map((event, i) => (
            <motion.button
              key={event.id}
              className="event-card"
              onClick={() => navigate(`/event/${event.id}/guests`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <img className="event-card-img" src={event.coverImage} alt={event.name} />
              <div className="event-card-overlay">
                <p className="event-card-tag">Evento</p>
                <h2 className="event-card-name">{event.name}</h2>
                <p className="event-card-meta">{event.date} &nbsp;·&nbsp; {event.location}</p>
                {event.description && (
                  <p className="event-card-desc">{event.description}</p>
                )}
                {event.tablesCount && (
                  <span className="event-card-tables">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#c9a84c" strokeWidth="1.2">
                      <rect x="1" y="1" width="4" height="4" rx="0.5"/>
                      <rect x="6" y="1" width="4" height="4" rx="0.5"/>
                      <rect x="1" y="6" width="4" height="4" rx="0.5"/>
                      <rect x="6" y="6" width="4" height="4" rx="0.5"/>
                    </svg>
                    {event.tablesCount} mesas
                  </span>
                )}
              </div>
              <div className="event-card-arrow">
                <svg viewBox="0 0 14 14" strokeWidth="1.5">
                  <line x1="2" y1="12" x2="12" y2="2"/>
                  <polyline points="5,2 12,2 12,9"/>
                </svg>
              </div>
            </motion.button>
          ))}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.3 }}
              >
                <form className="modal-panel" onSubmit={handleSubmit} noValidate>
                  <button type="button" className="modal-close" onClick={closeModal}>✕</button>

                  {success ? (
                    <div className="success-msg">
                      <div className="check">
                        <svg width="20" height="20" viewBox="0 0 20 20" stroke="#c9a84c" strokeWidth="1.5" fill="none">
                          <polyline points="4,10 8,14 16,6"/>
                        </svg>
                      </div>
                      <p>Evento creado</p>
                    </div>
                  ) : (
                    <>
                      <h2 className="modal-title">Nuevo evento</h2>
                      <p className="modal-subtitle">Completa los datos del evento</p>

                      {/* Image upload */}
                      <div className="form-field" style={{ marginBottom: '1.5rem' }}>
                        <label>Portada</label>
                        <div className="img-upload-area">
                          {imagePreview && (
                            <img className="img-upload-preview" src={imagePreview} alt="preview" />
                          )}
                          <input type="file" accept="image/*" onChange={handleImage} />
                          <p className="img-upload-text">
                            {imagePreview ? 'Cambiar imagen' : <><span>Selecciona</span> una imagen</>}
                          </p>
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Nombre del evento</label>
                        <input
                          type="text" name="name" value={form.name}
                          onChange={handleChange} placeholder="Boda · Cena de gala · XV años"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label>Fecha</label>
                          <input type="date" name="date" value={form.date} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                          <label>Mesas</label>
                          <input
                            type="text" name="tablesCount" value={form.tablesCount}
                            onChange={handleChange} placeholder="10"
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Lugar</label>
                        <input
                          type="text" name="location" value={form.location}
                          onChange={handleChange} placeholder="Salón, ciudad"
                        />
                      </div>

                      <div className="form-field">
                        <label>Descripción</label>
                        <textarea
                          name="description" value={form.description}
                          onChange={handleChange} rows={3}
                          placeholder="Breve descripción del evento..."
                        />
                      </div>

                      {error && <p className="form-error">{error}</p>}

                      <button className="btn-submit" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2"
                              style={{ animation: 'spin 0.8s linear infinite' }}>
                              <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                              <path d="M12 2a10 10 0 0 1 10 10" />
                            </svg>
                            Creando…
                          </>
                        ) : 'Crear evento'}
                      </button>
                    </>
                  )}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}