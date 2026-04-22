import { tables } from '../../infrastructure/mocks/tables.mock';
import { guests } from '../../infrastructure/mocks/guests.mock';
import { events } from '../../infrastructure/mocks/event.mock';
import { useState } from 'react';

export default function TablesPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const filteredTables = selectedEvent ? tables.filter(t => t.eventId === selectedEvent) : [];
  const filteredGuests = selectedEvent ? guests.filter(g => g.eventId === selectedEvent) : [];

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="font-display text-2xl text-gold mb-6">Mesas</h1>
      {!selectedEvent ? (
        <div className="mb-8">
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">Selecciona un evento para ver el orden de las mesas:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map(event => (
              <button
                key={event.id}
                className="bg-white dark:bg-black border border-gold rounded-2xl p-4 shadow-soft hover:shadow-lg transition text-left"
                onClick={() => setSelectedEvent(event.id)}
              >
                <div className="font-display text-lg text-gold mb-1">{event.name}</div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">{event.date} · {event.location}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <button className="mb-6 text-gold underline" onClick={() => setSelectedEvent(null)}>← Cambiar evento</button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTables.map(table => (
              <div key={table.id} className="bg-white dark:bg-black rounded-2xl shadow-soft p-6 flex flex-col items-center border border-gold cursor-pointer hover:scale-105 transition" onClick={() => setSelectedTable(table.id)}>
                <span className="font-display text-xl text-gold mb-2">{table.name}</span>
                <span className="text-gray-500 dark:text-gray-300 mb-2">{table.guests.length} invitados</span>
                <ul className="text-sm text-center">
                  {table.guests.map(gid => {
                    const guest = filteredGuests.find(g => g.id === gid);
                    return guest ? <li key={gid}>{guest.name}</li> : null;
                  })}
                </ul>
              </div>
            ))}
          </div>
          {selectedTable && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedTable(null)}>
              <div className="bg-white dark:bg-black rounded-2xl shadow-soft p-8 min-w-[300px]" onClick={e => e.stopPropagation()}>
                <h2 className="font-display text-xl text-gold mb-4">{filteredTables.find(t => t.id === selectedTable)?.name}</h2>
                <ul>
                  {filteredTables.find(t => t.id === selectedTable)?.guests.map(gid => {
                    const guest = filteredGuests.find(g => g.id === gid);
                    return guest ? <li key={gid}>{guest.name}</li> : null;
                  })}
                </ul>
                <button className="mt-6 px-4 py-2 bg-gold text-white rounded-2xl" onClick={() => setSelectedTable(null)}>Cerrar</button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
