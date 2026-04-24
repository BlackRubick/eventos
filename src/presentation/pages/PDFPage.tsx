import { guests } from '../../infrastructure/mocks/guests.mock';
import { event } from '../../infrastructure/mocks/event.mock';
import { QRCodeCanvas } from 'qrcode.react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: '#fff', padding: 32 },
  section: { marginBottom: 16 },
  title: { fontSize: 24, color: '#C8A96A', fontFamily: 'Times-Bold', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 4 },
  qr: { marginTop: 16, alignSelf: 'center' },
});

function GuestInvitationPDF({ guest }: { guest: typeof guests[0] }) {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.subtitle}>{event.date} · {event.location}</Text>
          <Text style={styles.subtitle}>Invitado: {guest.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>¡Te esperamos para celebrar juntos!</Text>
        </View>
        <View style={styles.qr}>
          {/* Aquí podrías renderizar una imagen QR generada y pasada como prop si lo deseas */}
        </View>
      </Page>
    </Document>
  );
}

export default function PDFPage() {
  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="font-display text-2xl text-gold mb-6">Invitaciones PDF</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guests.map(guest => (
          <div key={guest.id} className="bg-white dark:bg-black rounded-2xl shadow-soft p-6 flex flex-col items-center">
            <span className="font-semibold mb-2">{guest.name}</span>
            <QRCodeCanvas value={`invitacion-${guest.id}`} size={64} className="mb-2" />
            <PDFDownloadLink document={<GuestInvitationPDF guest={guest} />} fileName={`invitacion-${guest.name}.pdf`}>
              {({ loading }) => (
                <button className="mt-2 px-4 py-2 bg-gold text-white rounded-2xl">
                  {loading ? 'Generando PDF...' : 'Descargar PDF'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        ))}
      </div>
    </section>
  );
}
