import type { Table } from '../../domain/Table';

export const tables: Table[] = [
  { id: '1', name: 'Mesa 1', guests: ['1', '4'], qrCode: '', eventId: '1' },
  { id: '2', name: 'Mesa 2', guests: ['2', '8'], qrCode: '', eventId: '1' },
  { id: '3', name: 'Mesa 3', guests: ['6', '7'], qrCode: '', eventId: '2' },
  { id: '4', name: 'Mesa 4', guests: ['10', '11'], qrCode: '', eventId: '3' },
  { id: '5', name: 'Mesa 5', guests: ['12', '13'], qrCode: '', eventId: '4' }
];
