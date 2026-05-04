import { useParams, Link } from 'react-router-dom';

export default function RSVPPage() {
  const { code } = useParams<{ code: string }>();

  return (
    <section style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '2rem', color: '#e2ddd4', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ maxWidth: '520px', width: '100%', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(10,9,8,0.9)', padding: '2rem' }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '0.75rem' }}>
          RSVP
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 400, margin: '0 0 1rem' }}>
          Confirmación de invitación
        </h1>
        <p style={{ lineHeight: 1.8, color: '#9a9080', marginBottom: '1.5rem' }}>
          Este es un enlace mock para validar el flujo del código RSVP generado desde el dashboard de invitados.
        </p>
        <div style={{ border: '1px solid rgba(201,168,76,0.18)', padding: '1rem 1.1rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5a5040', display: 'block', marginBottom: '0.4rem' }}>
            Código
          </span>
          <strong style={{ fontSize: '1.15rem', color: '#e8e4dc', letterSpacing: '0.08em' }}>
            {code ?? 'Sin código'}
          </strong>
        </div>
        <Link to="/dashboard" style={{ color: '#0a0908', background: '#c9a84c', textDecoration: 'none', padding: '0.75rem 1.2rem', display: 'inline-block', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Volver al dashboard
        </Link>
      </div>
    </section>
  );
}
