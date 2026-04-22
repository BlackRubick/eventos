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
    tablesCount: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  /* ================= FIX ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = ev => {
        setImagePreview(ev.target?.result as string);
      };

      reader.readAsDataURL(file);

      setForm(f => ({ ...f, coverImage: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.date || !form.location) {
      setError('Todos los campos son obligatorios');
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
        tablesCount
      });

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({
          name: '',
          date: '',
          location: '',
          description: '',
          coverImage: '/src/assets/hero.png',
          tablesCount: ''
        });
        setImageFile(null);
        setImagePreview(null);
      }, 1200);
    }, 900);
  };

  return (
    <section className="max-w-6xl mx-auto grid gap-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl text-gold">Eventos</h1>

        <button onClick={() => setShowModal(true)}>
          + Nuevo evento
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allEvents.map(event => (
          <button
            key={event.id}
            onClick={() => navigate(`/event/${event.id}/guests`)}
          >
            <img src={event.coverImage} alt="Evento" />

            <h2>{event.name}</h2>
            <p>{event.date} · {event.location}</p>
            <p>{event.description}</p>

            {event.tablesCount && (
              <p>Mesas: {event.tablesCount}</p>
            )}
          </button>
        ))}
      </div>

      {/* MODAL (igual que ya lo tenías, sin cambios importantes) */}
      <AnimatePresence>
        {showModal && (
          <motion.form onSubmit={handleSubmit}>
            {/* tu form aquí */}
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}