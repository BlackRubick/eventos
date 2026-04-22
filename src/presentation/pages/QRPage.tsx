import { useState } from 'react';
import { events } from '../../infrastructure/mocks/event.mock';
import { tables } from '../../infrastructure/mocks/tables.mock';
import { photos } from '../../infrastructure/mocks/photos.mock';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const eventList = events;
  const filteredTables = selectedEvent ? tables.filter(t => t.eventId === selectedEvent) : [];
  const eventName = selectedEvent ? eventList.find(e => e.id === selectedEvent)?.name : '';

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="font-display text-2xl text-gold mb-6">QR por mesa & Galería</h1>
      {!selectedEvent ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {eventList.map(event => (
            <button
              key={event.id}
              className="bg-white dark:bg-black rounded-2xl shadow-soft p-6 flex flex-col items-center border border-gold hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedEvent(event.id)}
            >
              <img src={event.coverImage} alt="Evento" className="w-24 h-24 object-cover rounded-2xl shadow-soft mb-2" />
              <span className="font-display text-lg text-gold mb-1">{event.name}</span>
              <span className="text-gray-500 dark:text-gray-300 text-sm">{event.date} · {event.location}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <button className="text-gold font-bold text-2xl" onClick={() => setSelectedEvent(null)} title="Volver">←</button>
            <h2 className="font-display text-xl text-gold">{eventName}</h2>
          </div>
          {filteredTables.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-300">No hay mesas registradas para este evento.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredTables.map(table => (
                <div key={table.id} className="bg-white dark:bg-black rounded-2xl shadow-soft p-6 flex flex-col items-center border border-gold cursor-pointer hover:scale-105 transition" onClick={() => setSelectedTable(table.id)}>
                  <span className="font-display text-xl text-gold mb-2">{table.name}</span>
                  <QRCodeCanvas value={`mesa-${table.id}`} size={96} className="my-2" />
                  <span className="text-gray-500 dark:text-gray-300 mb-2">{table.guests.length} invitados</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedTable(null)}>
          <div className="bg-white dark:bg-black rounded-2xl shadow-soft p-8 min-w-[300px] max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-xl text-gold mb-4">{filteredTables.find(t => t.id === selectedTable)?.name}</h2>
            <QRCodeCanvas value={`mesa-${selectedTable}`} size={128} className="mb-4 mx-auto" />
            <h3 className="font-semibold mb-2">Galería de fotos</h3>
            <div className="grid grid-cols-3 gap-2">
              {photos.filter(p => p.tableId === selectedTable).map(photo => (
                <img key={photo.id} src={photo.url} alt="Foto evento" className="rounded-xl object-cover w-20 h-20" />
              ))}
            </div>
            <button className="mt-6 px-4 py-2 bg-gold text-white rounded-2xl" onClick={() => setSelectedTable(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
}
