import { useState } from 'react';
import { events } from '../../infrastructure/mocks/event.mock';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Simulación de estado local para eventos (en real usarías Zustand o backend)
const useEvents = () => {
  const [allEvents, setAllEvents] = useState(events);
  const addEvent = (event) => setAllEvents(evts => [...evts, event]);
  return { allEvents, addEvent };
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { allEvents, addEvent } = useEvents();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', location: '', description: '', coverImage: '/src/assets/hero.png', tablesCount: '' });
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [imagePreview, setImagePreview] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    if (e.target.name === 'tablesCount') {
      // Permitir vacío, solo dígitos, sin ceros a la izquierda
      let val = e.target.value.replace(/\D/g, '');
      if (val.startsWith('0')) val = val.replace(/^0+/, '');
      setForm(f => ({ ...f, tablesCount: val }));
    } else {
      setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = ev => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
      setForm(f => ({ ...f, coverImage: '' }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const tablesCount = Number(form.tablesCount) || 1;
    if (!form.name || !form.date || !form.location) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addEvent({ ...form, id: String(Date.now()), coverImage: imagePreview || form.coverImage, tablesCount });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ name: '', date: '', location: '', description: '', coverImage: '/src/assets/hero.png', tablesCount: '' });
        setImageFile(null);
        setImagePreview(null);
      }, 1200);
    }, 900);
  };

  return (
    <section className="max-w-6xl mx-auto grid gap-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-3xl text-gold">Eventos</h1>
        <button
          className="bg-gold text-white px-6 py-2 rounded-2xl shadow-soft font-semibold text-lg hover:bg-black hover:text-gold transition focus:outline-none focus:ring-2 focus:ring-gold/50"
          onClick={() => setShowModal(true)}
        >
          + Nuevo evento
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allEvents.map(event => (
          <button
            key={event.id}
            className="bg-white dark:bg-black rounded-2xl shadow-soft p-6 flex flex-col gap-4 items-center border border-gold hover:shadow-lg transition cursor-pointer text-left"
            onClick={() => navigate(`/event/${event.id}/guests`)}
          >
            <img src={event.coverImage} alt="Evento" className="w-32 h-32 object-cover rounded-2xl shadow-soft" />
            <div className="w-full">
              <h2 className="font-display text-xl text-gold mb-1">{event.name}</h2>
              <p className="text-gray-500 dark:text-gray-300 mb-1">{event.date} · {event.location}</p>
              <p className="text-gray-700 dark:text-gray-200 text-sm mb-1">{event.description}</p>
              {event.tablesCount && <p className="text-sm text-gold font-semibold">Mesas: {event.tablesCount}</p>}
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              className="bg-white dark:bg-black rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-gold flex flex-col gap-4 relative"
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              onSubmit={handleSubmit}
            >
              <button type="button" className="absolute top-4 right-4 text-gold text-2xl font-bold hover:text-black dark:hover:text-white transition" onClick={() => setShowModal(false)} aria-label="Cerrar">×</button>
              <h2 className="font-display text-2xl text-gold mb-2">Registrar nuevo evento</h2>
              <input
                className="px-4 py-2 rounded-xl border border-gold/40 focus:ring-2 focus:ring-gold outline-none bg-white dark:bg-black text-black dark:text-white"
                name="name" placeholder="Nombre del evento" value={form.name} onChange={handleChange} required
              />
              <input
                className="px-4 py-2 rounded-xl border border-gold/40 focus:ring-2 focus:ring-gold outline-none bg-white dark:bg-black text-black dark:text-white"
                name="date" type="date" placeholder="Fecha" value={form.date} onChange={handleChange} required
              />
              <input
                className="px-4 py-2 rounded-xl border border-gold/40 focus:ring-2 focus:ring-gold outline-none bg-white dark:bg-black text-black dark:text-white"
                name="location" placeholder="Lugar" value={form.location} onChange={handleChange} required
              />
              <textarea
                className="px-4 py-2 rounded-xl border border-gold/40 focus:ring-2 focus:ring-gold outline-none bg-white dark:bg-black text-black dark:text-white resize-none"
                name="description" placeholder="Descripción" value={form.description} onChange={handleChange} rows={3}
              />
              {/* Mesas */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gold font-semibold">¿Cuántas mesas tendrá el evento?</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={1}
                  className="px-4 py-2 rounded-xl border border-gold/40 focus:ring-2 focus:ring-gold outline-none bg-white dark:bg-black text-black dark:text-white"
                  name="tablesCount" value={form.tablesCount} onChange={handleChange} required
                  placeholder="Ej. 6"
                />
              </div>
              {/* Imagen: subir archivo o URL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gold font-semibold">Imagen de portada</label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gold/80 file:text-white hover:file:bg-gold"
                  onChange={handleImage}
                />
                <input
                  className="px-4 py-2 rounded-xl border border-gold/40 focus:ring-2 focus:ring-gold outline-none bg-white dark:bg-black text-black dark:text-white"
                  name="coverImage" placeholder="URL de imagen de portada (opcional)" value={form.coverImage} onChange={handleChange}
                  disabled={!!imagePreview}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Previsualización" className="rounded-xl mt-2 w-full h-32 object-cover border border-gold/30 shadow" />
                )}
              </div>
              {error && <div className="text-red-600 text-sm font-semibold mt-1">{error}</div>}
              <button
                type="submit"
                className="mt-2 bg-gold text-white px-6 py-2 rounded-2xl font-semibold shadow-soft hover:bg-black hover:text-gold transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Registrar evento'}
              </button>
              {success && <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="text-green-600 text-center font-bold mt-2">¡Evento creado exitosamente!</motion.div>}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
