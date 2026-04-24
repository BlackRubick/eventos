import { motion } from 'framer-motion';

const features = [
  {
    num: '01',
    title: 'Gestión visual de invitados',
    desc: 'Controla confirmaciones, asigna mesas y personaliza invitaciones con facilidad.',
  },
  {
    num: '02',
    title: 'Mesas dinámicas y asignación',
    desc: 'Organiza y visualiza la distribución de mesas de forma elegante y sencilla.',
  },
  {
    num: '03',
    title: 'Confirmaciones RSVP en tiempo real',
    desc: 'Sigue el estado de asistencia de tus invitados al instante.',
  },
  {
    num: '04',
    title: 'Invitaciones PDF personalizadas',
    desc: 'Genera y descarga invitaciones únicas para cada invitado.',
  },
  {
    num: '05',
    title: 'Galería de fotos por QR',
    desc: 'Cada mesa tiene un QR para subir y ver fotos del evento.',
  },
  {
    num: '06',
    title: 'Panel de administración seguro',
    desc: 'Acceso protegido para organizar y monitorear todo el evento.',
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

/* ─── STYLES ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    background: #0a0908;
    color: #e2ddd4;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .lp-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 3rem;
    border-bottom: 1px solid rgba(201,168,76,0.08);
    background: rgba(10,9,8,0.85);
    backdrop-filter: blur(12px);
  }
  .lp-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: #c9a84c;
    text-decoration: none;
  }
  .lp-nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
  .lp-nav-links a {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #7a7060;
    text-decoration: none;
    transition: color 0.2s;
  }
  .lp-nav-links a:hover { color: #c9a84c; }
  .lp-nav-cta {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #0a0908;
    background: #c9a84c;
    padding: 0.55rem 1.4rem;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.2s;
  }
  .lp-nav-cta:hover { background: #d4b86a; }

  /* ── HERO ── */
  .lp-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 7rem 3rem 4rem;
    gap: 4rem;
    position: relative;
  }
  .lp-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(201,168,76,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(201,168,76,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .lp-hero-left {
    position: relative;
    z-index: 1;
  }
  .lp-hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.75rem;
  }
  .lp-hero-eyebrow::before {
    content: '';
    display: block;
    width: 2.5rem;
    height: 1px;
    background: #c9a84c;
  }
  .lp-hero-eyebrow span {
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a84c;
  }
  .lp-hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 5vw, 5.5rem);
    font-weight: 300;
    line-height: 1.04;
    color: #f0ece2;
    margin-bottom: 2rem;
  }
  .lp-hero-h1 em {
    font-style: italic;
    color: #c9a84c;
  }
  .lp-hero-p {
    font-size: 1rem;
    line-height: 1.75;
    color: #7a7060;
    max-width: 36ch;
    margin-bottom: 3rem;
  }
  .lp-hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .btn-primary {
    background: #c9a84c;
    color: #0a0908;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.85rem 2rem;
    text-decoration: none;
    border: 1px solid #c9a84c;
    transition: background 0.2s, color 0.2s;
    display: inline-block;
  }
  .btn-primary:hover { background: transparent; color: #c9a84c; }
  .btn-ghost {
    background: transparent;
    color: #7a7060;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.85rem 2rem;
    text-decoration: none;
    border: 1px solid rgba(201,168,76,0.2);
    transition: border-color 0.2s, color 0.2s;
    display: inline-block;
  }
  .btn-ghost:hover { border-color: #c9a84c; color: #c9a84c; }

  /* Hero right — image frame */
  .lp-hero-right {
    position: relative;
    z-index: 1;
  }
  .lp-hero-frame {
    position: relative;
  }
  .lp-hero-img {
    width: 100%;
    aspect-ratio: 4/5;
    object-fit: cover;
    display: block;
    filter: brightness(0.7) saturate(0.7);
  }
  .lp-hero-frame::before {
    content: '';
    position: absolute;
    inset: -12px -12px 12px 12px;
    border: 1px solid rgba(201,168,76,0.2);
    pointer-events: none;
    z-index: -1;
  }
  .lp-hero-frame-label {
    position: absolute;
    bottom: -1px;
    left: 0;
    background: #c9a84c;
    color: #0a0908;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.4rem 1rem;
    font-weight: 500;
  }

  /* Scroll indicator */
  .lp-scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #3a3530;
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .lp-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, #c9a84c, transparent);
    animation: scrollLine 1.6s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0%, 100% { opacity: 0.2; transform: scaleY(0.6); }
    50% { opacity: 1; transform: scaleY(1); }
  }

  /* ── STATS BAND ── */
  .lp-stats {
    border-top: 1px solid rgba(201,168,76,0.12);
    border-bottom: 1px solid rgba(201,168,76,0.12);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 2.5rem 3rem;
  }
  .lp-stat {
    text-align: center;
    border-right: 1px solid rgba(201,168,76,0.1);
    padding: 0 2rem;
  }
  .lp-stat:last-child { border-right: none; }
  .lp-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 300;
    color: #c9a84c;
    line-height: 1;
    margin-bottom: 0.4rem;
  }
  .lp-stat-label {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4a4540;
  }

  /* ── FEATURES ── */
  .lp-features {
    padding: 8rem 3rem;
  }
  .lp-features-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: end;
    margin-bottom: 5rem;
    border-bottom: 1px solid rgba(201,168,76,0.1);
    padding-bottom: 3rem;
  }
  .lp-features-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    color: #f0ece2;
  }
  .lp-features-h2 em { font-style: italic; color: #c9a84c; }
  .lp-features-intro {
    font-size: 0.9rem;
    line-height: 1.8;
    color: #5a5040;
  }

  /* Feature list */
  .lp-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .lp-feature-item {
    padding: 2.5rem 0;
    border-bottom: 1px solid rgba(201,168,76,0.08);
    display: grid;
    grid-template-columns: 3.5rem 1fr;
    gap: 1.5rem;
    align-items: start;
    transition: background 0.2s;
    padding-right: 3rem;
  }
  .lp-feature-item:nth-child(even) {
    padding-right: 0;
    padding-left: 3rem;
    border-left: 1px solid rgba(201,168,76,0.08);
  }
  .lp-feature-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.85rem;
    font-weight: 400;
    color: #c9a84c;
    letter-spacing: 0.08em;
    padding-top: 0.15rem;
  }
  .lp-feature-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 400;
    color: #e8e4dc;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  .lp-feature-desc {
    font-size: 0.82rem;
    line-height: 1.7;
    color: #5a5040;
  }
  .lp-feature-line {
    width: 0;
    height: 1px;
    background: #c9a84c;
    margin-top: 1rem;
    transition: width 0.4s ease;
  }
  .lp-feature-item:hover .lp-feature-line { width: 2rem; }

  /* ── CTA FINAL ── */
  .lp-cta {
    position: relative;
    padding: 8rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    overflow: hidden;
  }
  .lp-cta::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .lp-cta-label {
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 1.5rem;
  }
  .lp-cta-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 4.5vw, 5rem);
    font-weight: 300;
    line-height: 1.1;
    color: #f0ece2;
    max-width: 16ch;
    margin-bottom: 3rem;
  }
  .lp-cta-h2 em { font-style: italic; color: #c9a84c; }
  .lp-cta-divider {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent);
    margin-bottom: 3rem;
  }

  /* ── FOOTER ── */
  .lp-footer {
    border-top: 1px solid rgba(201,168,76,0.1);
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .lp-footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: #3a3530;
  }
  .lp-footer-copy {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: #2a2520;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .lp-nav { padding: 1rem 1.5rem; }
    .lp-nav-links { display: none; }
    .lp-hero { grid-template-columns: 1fr; padding: 6rem 1.5rem 4rem; gap: 3rem; }
    .lp-hero-right { display: none; }
    .lp-stats { grid-template-columns: 1fr; gap: 2rem; padding: 2rem 1.5rem; }
    .lp-stat { border-right: none; border-bottom: 1px solid rgba(201,168,76,0.1); padding-bottom: 2rem; }
    .lp-stat:last-child { border-bottom: none; }
    .lp-features { padding: 5rem 1.5rem; }
    .lp-features-header { grid-template-columns: 1fr; gap: 2rem; }
    .lp-features-grid { grid-template-columns: 1fr; }
    .lp-feature-item:nth-child(even) { padding-left: 0; border-left: none; }
    .lp-cta { padding: 5rem 1.5rem; }
    .lp-footer { flex-direction: column; gap: 1rem; text-align: center; padding: 2rem 1.5rem; }
  }
`;

export default function LandingPage() {
  return (
    <>
      <style>{css}</style>
      <div className="lp-root">

        {/* NAV */}
        <motion.nav
          className="lp-nav"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="/" className="lp-logo">Eventum</a>
          <ul className="lp-nav-links">
            <li><a href="#features">Funcionalidades</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
          <a href="/dashboard" className="lp-nav-cta">Comenzar</a>
        </motion.nav>

        {/* HERO */}
        <section className="lp-hero">
          <motion.div
            className="lp-hero-left"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div className="lp-hero-eyebrow" variants={fadeUp}>
              <span>Gestión de eventos</span>
            </motion.div>
            <motion.h1 className="lp-hero-h1" variants={fadeUp}>
              Organiza tu<br />
              evento <em>soñado</em>
            </motion.h1>
            <motion.p className="lp-hero-p" variants={fadeUp}>
              Gestión de invitados, mesas, confirmaciones y recuerdos — todo en una sola plataforma profesional diseñada para los momentos que importan.
            </motion.p>
            <motion.div className="lp-hero-actions" variants={fadeUp}>
              <a href="/dashboard" className="btn-primary">Ir al dashboard</a>
              <a href="#features" className="btn-ghost">Ver funcionalidades</a>
            </motion.div>
          </motion.div>

          <motion.div
            className="lp-hero-right"
            variants={fadeIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
          >
            <div className="lp-hero-frame">
              <img
                src="/src/assets/hero.png"
                alt="Evento elegante"
                className="lp-hero-img"
              />
              <span className="lp-hero-frame-label">Plataforma profesional</span>
            </div>
          </motion.div>

          <div className="lp-scroll-hint">
            <div className="lp-scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* STATS */}
        <motion.div
          className="lp-stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { num: '500+', label: 'Eventos organizados' },
            { num: '12k+', label: 'Invitados gestionados' },
            { num: '100%', label: 'Satisfacción garantizada' },
          ].map(s => (
            <div className="lp-stat" key={s.label}>
              <p className="lp-stat-num">{s.num}</p>
              <p className="lp-stat-label">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* FEATURES */}
        <section id="features" className="lp-features">
          <motion.div
            className="lp-features-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="lp-features-h2">
              Todo lo que<br />
              <em>necesitas</em>
            </h2>
            <p className="lp-features-intro">
              Cada funcionalidad fue diseñada para eliminar el caos de organizar eventos y darte control total, con la elegancia que tu ocasión merece.
            </p>
          </motion.div>

          <motion.div
            className="lp-features-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map(f => (
              <motion.div className="lp-feature-item" key={f.num} variants={fadeUp}>
                <span className="lp-feature-num">{f.num}</span>
                <div>
                  <h3 className="lp-feature-title">{f.title}</h3>
                  <p className="lp-feature-desc">{f.desc}</p>
                  <div className="lp-feature-line" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA FINAL */}
        <motion.section
          className="lp-cta"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="lp-cta-label">¿Listo para empezar?</p>
          <h2 className="lp-cta-h2">
            El evento <em>perfecto</em> comienza aquí
          </h2>
          <div className="lp-cta-divider" />
          <a href="/dashboard" className="btn-primary">Comenzar ahora</a>
        </motion.section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <span className="lp-footer-logo">Eventum</span>
          <span className="lp-footer-copy">© {new Date().getFullYear()} — Todos los derechos reservados</span>
        </footer>

      </div>
    </>
  );
}