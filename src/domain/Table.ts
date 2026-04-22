export interface Table {
  id: string;
  name: string;
  guests: string[]; // guest ids
  qrCode: string; // QR code string (data URL)
  eventId: string;
}
