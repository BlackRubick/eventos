import type { Guest } from '../../domain/Guest';

export const guests: Guest[] = [
  { id: '1', name: 'Ana Martínez', email: 'ana@email.com', rsvp: 'yes', tableId: '1', eventId: '1', rsvpCode: 'RSV-1AAA', rsvpUrl: '/rsvp/RSV-1AAA' },
  { id: '2', name: 'Luis Pérez', email: 'luis@email.com', rsvp: 'pending', tableId: '2', eventId: '1', rsvpCode: 'RSV-2BBB', rsvpUrl: '/rsvp/RSV-2BBB' },
  { id: '3', name: 'María López', email: 'maria@email.com', rsvp: 'no', eventId: '2', rsvpCode: 'RSV-3CCC', rsvpUrl: '/rsvp/RSV-3CCC' },
  { id: '4', name: 'Carlos Ruiz', email: 'carlos@email.com', rsvp: 'yes', tableId: '1', eventId: '2', rsvpCode: 'RSV-4DDD', rsvpUrl: '/rsvp/RSV-4DDD' },
  { id: '5', name: 'Lucía Gómez', email: 'lucia@email.com', rsvp: 'pending', eventId: '3', rsvpCode: 'RSV-5EEE', rsvpUrl: '/rsvp/RSV-5EEE' },
  { id: '6', name: 'Sofía Torres', email: 'sofia@email.com', rsvp: 'yes', tableId: '3', eventId: '3', rsvpCode: 'RSV-6FFF', rsvpUrl: '/rsvp/RSV-6FFF' },
  { id: '7', name: 'Daniel Castro', email: 'daniel@email.com', rsvp: 'yes', tableId: '3', eventId: '4', rsvpCode: 'RSV-7GGG', rsvpUrl: '/rsvp/RSV-7GGG' },
  { id: '8', name: 'Valeria Ríos', email: 'valeria@email.com', rsvp: 'pending', tableId: '2', eventId: '4', rsvpCode: 'RSV-8HHH', rsvpUrl: '/rsvp/RSV-8HHH' },
  { id: '9', name: 'Jorge Herrera', email: 'jorge@email.com', rsvp: 'no', eventId: '5', rsvpCode: 'RSV-9III', rsvpUrl: '/rsvp/RSV-9III' },
  { id: '10', name: 'Elena Salas', email: 'elena@email.com', rsvp: 'yes', tableId: '4', eventId: '5', rsvpCode: 'RSV-0JJJ', rsvpUrl: '/rsvp/RSV-0JJJ' },
  { id: '11', name: 'Pedro Gil', email: 'pedro@email.com', rsvp: 'pending', tableId: '4', eventId: '6', rsvpCode: 'RSV-1KKK', rsvpUrl: '/rsvp/RSV-1KKK' },
  { id: '12', name: 'Marta León', email: 'marta@email.com', rsvp: 'yes', tableId: '5', eventId: '6', rsvpCode: 'RSV-2LLL', rsvpUrl: '/rsvp/RSV-2LLL' },
  { id: '13', name: 'Raúl Díaz', email: 'raul@email.com', rsvp: 'yes', tableId: '5', eventId: '7', rsvpCode: 'RSV-3MMM', rsvpUrl: '/rsvp/RSV-3MMM' },
  { id: '14', name: 'Carmen Vera', email: 'carmen@email.com', rsvp: 'pending', eventId: '8', rsvpCode: 'RSV-4NNN', rsvpUrl: '/rsvp/RSV-4NNN' },
  { id: '15', name: 'Iván Paredes', email: 'ivan@email.com', rsvp: 'no', eventId: '9', rsvpCode: 'RSV-5OOO', rsvpUrl: '/rsvp/RSV-5OOO' }
];
