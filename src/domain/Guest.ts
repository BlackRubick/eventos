export type RSVPStatus = 'yes' | 'no' | 'pending';

export interface Guest {
  id: string;
  name: string;
  email: string;
  tableId?: string;
  rsvp: RSVPStatus;
  eventId: string;
}
