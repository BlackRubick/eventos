import type { Guest } from '../../domain/Guest';

export const guests: Guest[] = [
  { id: '1', name: 'Ana Martínez', email: 'ana@email.com', rsvp: 'yes', tableId: '1', eventId: '1' },
  { id: '2', name: 'Luis Pérez', email: 'luis@email.com', rsvp: 'pending', tableId: '2', eventId: '1' },
  { id: '3', name: 'María López', email: 'maria@email.com', rsvp: 'no', eventId: '2' },
  { id: '4', name: 'Carlos Ruiz', email: 'carlos@email.com', rsvp: 'yes', tableId: '1', eventId: '2' },
  { id: '5', name: 'Lucía Gómez', email: 'lucia@email.com', rsvp: 'pending', eventId: '3' },
  { id: '6', name: 'Sofía Torres', email: 'sofia@email.com', rsvp: 'yes', tableId: '3', eventId: '3' },
  { id: '7', name: 'Daniel Castro', email: 'daniel@email.com', rsvp: 'yes', tableId: '3', eventId: '4' },
  { id: '8', name: 'Valeria Ríos', email: 'valeria@email.com', rsvp: 'pending', tableId: '2', eventId: '4' },
  { id: '9', name: 'Jorge Herrera', email: 'jorge@email.com', rsvp: 'no', eventId: '5' },
  { id: '10', name: 'Elena Salas', email: 'elena@email.com', rsvp: 'yes', tableId: '4', eventId: '5' },
  { id: '11', name: 'Pedro Gil', email: 'pedro@email.com', rsvp: 'pending', tableId: '4', eventId: '6' },
  { id: '12', name: 'Marta León', email: 'marta@email.com', rsvp: 'yes', tableId: '5', eventId: '6' },
  { id: '13', name: 'Raúl Díaz', email: 'raul@email.com', rsvp: 'yes', tableId: '5', eventId: '7' },
  { id: '14', name: 'Carmen Vera', email: 'carmen@email.com', rsvp: 'pending', eventId: '8' },
  { id: '15', name: 'Iván Paredes', email: 'ivan@email.com', rsvp: 'no', eventId: '9' }
];
