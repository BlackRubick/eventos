import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Esencial',
    price: '$19',
    period: '/Evento',
    description: 'Ideal para eventos pequenos y organizacion inicial.',
    features: ['Hasta 150 invitados', 'Mesas y asignaciones basicas', 'Invitaciones PDF'],
    cta: 'Elegir Esencial',
    featured: false,
  },
  {
    name: 'Premium',
    price: '$49',
    period: '/Evento',
    description: 'La experiencia completa de Revel para producciones profesionales.',
    features: ['Invitados ilimitados', 'QR y galeria por mesa', 'Reportes RSVP y prioridad'],
    cta: 'Elegir Premium',
    featured: true,
  },
  {
    name: 'Agencia',
    price: '$99',
    period: '/Evento',
    description: 'Pensado para equipos y multiples clientes.',
    features: ['Multi-evento', 'Equipo colaborativo', 'Soporte dedicado'],
    cta: 'Elegir Agencia',
    featured: false,
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

  .plans-root {
    min-height: 100vh;
    background: radial-gradient(circle at 10% 15%, rgba(201,168,76,0.08), transparent 35%), #0a0908;
    color: #e2ddd4;
    font-family: 'DM Sans', sans-serif;
    padding: 5rem 1.5rem 4rem;
  }

  .plans-wrap {
    width: min(1160px, 100%);
    margin: 0 auto;
  }

  .plans-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .plans-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 0.9rem;
  }

  .plans-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 4vw, 4rem);
    font-weight: 300;
    margin: 0 0 1rem;
    line-height: 1.08;
  }

  .plans-sub {
    color: #8f8576;
    max-width: 62ch;
    margin: 0 auto;
    line-height: 1.8;
  }

  .plans-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .plan-card {
    border: 1px solid rgba(201,168,76,0.18);
    background: #0f0e0c;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    min-height: 420px;
  }

  .plan-card.featured {
    border-color: rgba(201,168,76,0.44);
    box-shadow: 0 0 0 1px rgba(201,168,76,0.2) inset;
    transform: translateY(-6px);
  }

  .plan-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    margin: 0 0 0.6rem;
    font-weight: 400;
  }

  .plan-price {
    color: #c9a84c;
    font-size: 1.85rem;
    letter-spacing: 0.03em;
    margin-bottom: 0.1rem;
  }

  .plan-period {
    color: #7a7060;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .plan-desc {
    color: #9b9285;
    line-height: 1.7;
    margin-bottom: 1.1rem;
    font-size: 0.92rem;
  }

  .plan-features {
    list-style: none;
    padding: 0;
    margin: 0 0 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .plan-features li {
    color: #d1cbbe;
    font-size: 0.86rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .plan-features li::before {
    content: '•';
    color: #c9a84c;
    font-size: 1rem;
  }

  .plan-cta {
    margin-top: auto;
    text-align: center;
    text-decoration: none;
    border: 1px solid #c9a84c;
    color: #0a0908;
    background: #c9a84c;
    padding: 0.8rem 0.95rem;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
  }

  .plan-cta:hover {
    background: transparent;
    color: #c9a84c;
  }

  .plans-back {
    display: inline-block;
    margin-top: 1.4rem;
    color: #7a7060;
    text-decoration: none;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .plans-back:hover {
    color: #c9a84c;
  }

  @media (max-width: 980px) {
    .plans-grid {
      grid-template-columns: 1fr;
    }

    .plan-card.featured {
      transform: none;
    }
  }
`;

export default function PlanesPage() {
  return (
    <>
      <style>{css}</style>
      <section className="plans-root">
        <div className="plans-wrap">
          <header className="plans-header">
            <p className="plans-eyebrow">Planes</p>
            <h1 className="plans-title">Elige como quieres manejar tu Evento</h1>
            <p className="plans-sub">
              Cada plan se cobra por Evento, no por mes. Puedes empezar con uno y escalar sin perder informacion.
            </p>
          </header>

          <div className="plans-grid">
            {plans.map(plan => (
              <article className={`plan-card${plan.featured ? ' featured' : ''}`} key={plan.name}>
                <h2 className="plan-name">{plan.name}</h2>
                <div className="plan-price">{plan.price}</div>
                <div className="plan-period">{plan.period}</div>
                <p className="plan-desc">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="plan-cta" to="/login_magic">{plan.cta}</Link>
              </article>
            ))}
          </div>

          <Link className="plans-back" to="/">Volver al inicio</Link>
        </div>
      </section>
    </>
  );
}