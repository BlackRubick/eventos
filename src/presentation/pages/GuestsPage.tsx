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

  const addGuest = (guest: Guest) => {
    setAllGuests(gs => [...gs, guest]);
  };

  return { allGuests, addGuest };
};

/* ================= COMPONENT ================= */
export default function GuestsPage() {
  const { eventId } = useParams<{ eventId: string }>();

  const filteredTables = eventId
    ? tables.filter(t => t.eventId === eventId)
    : [];

  const { allGuests, addGuest } = useGuests(eventId);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    rsvp: 'pending',
    tableId: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  /* ================= FIX AQUÍ ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email) {
      setError('Nombre y email son obligatorios');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addGuest({
        id: String(Date.now()),
        name: form.name,
        email: form.email,
        rsvp: form.rsvp,
        tableId: form.tableId || undefined,
        eventId
      });

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({
          name: '',
          email: '',
          rsvp: 'pending',
          tableId: ''
        });
      }, 1200);
    }, 900);
  };

  if (!eventId) {
    return (
      <section className="max-w-2xl mx-auto text-center mt-16">
        <h1 className="font-display text-2xl text-gold mb-6">
          Invitados
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Selecciona un evento en el{' '}
          <Link to="/dashboard" className="text-gold underline">
            dashboard
          </Link>{' '}
          para ver los invitados y mesas.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-gold">
          Invitados{' '}
          <span className="text-base text-gray-400">
            (Evento {eventId})
          </span>
        </h1>

        <button
          className="bg-gold text-white px-6 py-2 rounded-2xl shadow-soft font-semibold text-lg hover:bg-black hover:text-gold transition"
          onClick={() => setShowModal(true)}
        >
          + Agregar invitado
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white dark:bg-black rounded-2xl shadow-soft">
          <thead>
            <tr className="text-left">
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Estatus</th>
              <th className="p-3">Mesa</th>
            </tr>
          </thead>

          <tbody>
            {allGuests.map(guest => (
              <tr
                key={guest.id}
                className="border-b border-gold/20"
              >
                <td className="p-3 font-semibold">
                  {guest.name}
                </td>

                <td className="p-3">{guest.email}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-2xl text-xs font-bold ${
                      guest.rsvp === 'yes'
                        ? 'bg-gold text-white'
                        : guest.rsvp === 'no'
                        ? 'bg-red-200 text-red-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {guest.rsvp === 'yes'
                      ? 'Confirmado'
                      : guest.rsvp === 'no'
                      ? 'No asistirá'
                      : 'Pendiente'}
                  </span>
                </td>

                <td className="p-3">
                  {guest.tableId
                    ? filteredTables.find(
                        t => t.id === guest.tableId
                      )?.name || (
                        <span className="text-gray-400">
                          Sin asignar
                        </span>
                      )
                    : (
                      <span className="text-gray-400">
                        Sin asignar
                      </span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MESAS */}
      <div>
        <h2 className="font-display text-xl text-gold mb-4">
          Mesas del evento
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredTables.map(table => (
            <div
              key={table.id}
              className="bg-white dark:bg-black rounded-2xl shadow-soft p-4 border border-gold"
            >
              <h3 className="font-semibold text-lg mb-2">
                {table.name}
              </h3>

              <ul className="list-disc ml-5">
                {table.guests.map(guestId => {
                  const guest = allGuests.find(
                    g => g.id === guestId
                  );

                  return guest ? (
                    <li key={guest.id}>{guest.name}</li>
                  ) : null;
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link to="/dashboard" className="text-gold underline">
          ← Volver
        </Link>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              className="bg-white dark:bg-black rounded-2xl p-8 w-full max-w-md border-2 border-gold flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl text-gold">
                Agregar invitado
              </h2>

              <input
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="input"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="input"
              />

              <select
                name="rsvp"
                value={form.rsvp}
                onChange={handleChange}
                className="input"
              >
                <option value="pending">Pendiente</option>
                <option value="yes">Confirmado</option>
                <option value="no">No asistirá</option>
              </select>

              <select
                name="tableId"
                value={form.tableId}
                onChange={handleChange}
                className="input"
              >
                <option value="">Sin mesa</option>
                {filteredTables.map(table => (
                  <option key={table.id} value={table.id}>
                    {table.name}
                  </option>
                ))}
              </select>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button disabled={loading}>
                {loading ? 'Guardando...' : 'Agregar'}
              </button>

              {success && (
                <div className="text-green-600 text-center">
                  ¡Invitado agregado!
                </div>
              )}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}