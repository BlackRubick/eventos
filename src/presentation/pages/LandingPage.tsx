import { useEffect, useRef } from 'react';

const features = [
  { num: '01', title: 'Gestión visual de invitados', desc: 'Controla confirmaciones, asigna mesas y personaliza invitaciones con facilidad.' },
  { num: '02', title: 'Mesas dinámicas y asignación', desc: 'Organiza y visualiza la distribución de mesas de forma elegante y sencilla.' },
  { num: '03', title: 'Confirmaciones RSVP en tiempo real', desc: 'Sigue el estado de asistencia de tus invitados al instante.' },
  { num: '04', title: 'Invitaciones PDF personalizadas', desc: 'Genera y descarga invitaciones únicas para cada invitado.' },
  { num: '05', title: 'Galería de fotos por QR', desc: 'Cada mesa tiene un QR para subir y ver fotos del evento.' },
  { num: '06', title: 'Panel de administración seguro', desc: 'Acceso protegido para organizar y monitorear todo evento.' },
];

const invitationSteps = [
  {
    num: '01', big: true,
    title: 'Selecciona tu invitación',
    desc: 'Elige entre una galería de diseños elegantes personalizables para cada tipo de evento.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 20h8"/><path d="M10 17h4"/><path d="M7 8h10"/></svg>),
  },
  {
    num: '02',
    title: 'Envía por WhatsApp',
    desc: 'Un toque y la invitación llega directamente al teléfono de cada invitado.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.5a7.5 7.5 0 0 1-10.8 6.6L4 19l1-4a7.5 7.5 0 1 1 15-3.5Z"/><path d="M9.2 9.1c.2-.5.4-.5.7-.5h.7c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.4.5c-.1.2-.1.4 0 .6.2.3.7.8 1.4 1.4s1.1 1 1.4 1.1c.2.1.4.1.6 0l.6-.5c.2-.1.4-.1.6 0l1.7.7c.2.1.4.3.4.5v.7c0 .3 0 .5-.5.7-.4.2-1.1.4-1.8.3-1.6-.1-3.3-.9-4.9-2.5s-2.5-3.3-2.6-4.8c0-.8.1-1.5.3-1.9Z"/></svg>),
  },
  {
    num: '03',
    title: 'Tus invitados podrán',
    list: ['Confirmar asistencia vía WhatsApp', 'Ver ubicación en Maps', 'Acceder a mesa de regalos', 'Abrir detalles del Rével'],
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="16" height="12" rx="3"/><path d="M8 10h8"/><path d="M8 13h5"/></svg>),
  },
  {
    num: '04',
    title: 'Confirmaciones automáticas',
    desc: 'Recibe cada RSVP directamente en WhatsApp, sin esfuerzo.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a7 7 0 0 0-7 7v3.2L3.7 15c-.5.5-.2 1.3.5 1.3H20c.7 0 1-.8.5-1.3L19 13.2V10a7 7 0 0 0-7-7Z"/><path d="M9.3 18.5a3 3 0 0 0 5.4 0"/></svg>),
  },
];

const albumSteps = [
  { num: '01', title: 'Invitados toman fotos y videos durante tu Rével', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="14" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M8 5l1.5-2h5L16 5"/></svg>) },
  { num: '02', title: 'QR comparte el álbum digital', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><path d="M14 15h2M14 19h4M18 15v4"/></svg>) },
  { num: '03', title: 'Suben fotos, videos y mensajes especiales', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19h10a2 2 0 0 0 2-2V9l-3-4H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/><path d="M12 10v6M9.5 12.5 12 10l2.5 2.5"/></svg>) },
  { num: '04', title: 'Rével crea tu álbum digital único', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 6.5h15v11h-15z"/><path d="M7 15l3-3 2 2 3-4 2 3"/><circle cx="9" cy="9" r="1"/></svg>) },
];

// QR_PATTERN removed — visual grid cleaned from album header

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  :root{
    --gold:#c9a84c;--gold-light:#e8c96a;--gold-dim:rgba(201,168,76,0.15);
    --dark:#08070a;--dark2:#0e0c10;--dark3:#13111a;
    --text:#f0ece2;--muted:#6b6356;--quiet:#3a3530;
  }

  .lp{background:var(--dark);color:var(--text);font-family:'DM Sans',sans-serif;overflow-x:hidden;line-height:1.6}

  /* NAV */
  .lp-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.2rem 3rem;border-bottom:1px solid rgba(201,168,76,0.08);background:rgba(8,7,10,0.9);backdrop-filter:blur(16px)}
  .lp-logo{font-family:'Cormorant Garamond',serif;font-size:1.35rem;letter-spacing:0.15em;color:var(--gold);font-weight:300;text-decoration:none}
  .lp-nav-links{display:flex;gap:2rem;list-style:none}
  .lp-nav-links a{font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color 0.2s}
  .lp-nav-links a:hover{color:var(--gold)}
  .lp-nav-cta{background:transparent;border:1px solid var(--gold);color:var(--gold);font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;padding:0.55rem 1.6rem;text-decoration:none;transition:all 0.25s;font-family:'DM Sans',sans-serif}
  .lp-nav-cta:hover{background:var(--gold);color:var(--dark)}

  /* HERO */
  .lp-hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:9rem 3rem 5rem;gap:5rem;position:relative}
  .lp-hero-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden}
  .lp-hero-orb1{position:absolute;top:-10%;right:0;width:600px;height:600px;background:radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%);animation:orbFloat 8s ease-in-out infinite alternate}
  .lp-hero-orb2{position:absolute;bottom:-20%;left:-5%;width:500px;height:500px;background:radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 65%);animation:orbFloat 10s ease-in-out infinite alternate-reverse}
  .lp-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 80% 80% at 60% 50%,black 0%,transparent 100%)}
  @keyframes orbFloat{0%{transform:translate(0,0) scale(1)}100%{transform:translate(30px,-20px) scale(1.12)}}

  .lp-hero-left{position:relative;z-index:2}
  .lp-hero-eyebrow{display:flex;align-items:center;gap:1rem;margin-bottom:2.5rem;animation:fadeUp 0.8s ease both}
  .lp-hero-eyebrow-line{width:3rem;height:1px;background:var(--gold)}
  .lp-hero-eyebrow span{font-size:0.65rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--gold)}
  .lp-hero-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,5.5vw,6.5rem);font-weight:300;line-height:0.96;color:var(--text);margin-bottom:2.5rem;animation:fadeUp 0.8s 0.1s ease both}
  .lp-hero-h1 em{font-style:italic;color:var(--gold);display:block}
  .lp-hero-p{font-size:0.95rem;line-height:1.85;color:var(--muted);max-width:38ch;margin-bottom:3.5rem;animation:fadeUp 0.8s 0.2s ease both}
  .lp-hero-actions{display:flex;gap:1rem;flex-wrap:wrap;animation:fadeUp 0.8s 0.3s ease both}

  .btn-p{background:var(--gold);color:var(--dark);font-size:0.72rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;padding:0.9rem 2.4rem;text-decoration:none;font-family:'DM Sans',sans-serif;transition:all 0.25s;display:inline-block;position:relative;overflow:hidden;border:1px solid var(--gold)}
  .btn-p::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.1);opacity:0;transition:opacity 0.2s}
  .btn-p:hover::after{opacity:1}
  .btn-g{background:transparent;color:var(--muted);font-size:0.72rem;letter-spacing:0.18em;text-transform:uppercase;padding:0.9rem 2.4rem;text-decoration:none;border:1px solid rgba(201,168,76,0.22);font-family:'DM Sans',sans-serif;transition:all 0.25s;display:inline-block}
  .btn-g:hover{border-color:var(--gold);color:var(--gold)}

  .lp-hero-right{position:relative;z-index:2;animation:fadeIn 1.2s 0.4s ease both}
  .lp-hero-card{position:relative;border:1px solid rgba(201,168,76,0.18);overflow:hidden}
  .lp-hero-card-visual{width:100%;aspect-ratio:3/4;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#2a1f14 0%,#0e0c10 60%,#1a1020 100%)}
  .lp-hero-card-overlay{position:absolute;bottom:0;left:0;right:0;padding:2rem;background:linear-gradient(to top,rgba(8,7,10,0.95) 0%,transparent 100%)}
  .lp-hero-card-tag{display:inline-block;font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--dark);background:var(--gold);padding:0.35rem 0.9rem;margin-bottom:0.75rem}
  .lp-hero-card-title{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:300;color:var(--text);line-height:1.1}
  .lp-hero-badge{position:absolute;top:2rem;right:-1.5rem;background:rgba(14,12,16,0.95);border:1px solid rgba(201,168,76,0.22);padding:1.2rem 1.5rem;min-width:140px;backdrop-filter:blur(10px)}
  .lp-hero-badge-num{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:300;color:var(--gold);line-height:1}
  .lp-hero-badge-label{font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-top:0.25rem}

  .lp-scroll-hint{position:absolute;bottom:3rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.6rem;animation:fadeIn 1.5s 1s ease both;pointer-events:none}
  .lp-scroll-line{width:1px;height:50px;background:linear-gradient(to bottom,var(--gold),transparent);animation:scrollPulse 2s ease-in-out infinite}
  .lp-scroll-text{font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--quiet)}
  @keyframes scrollPulse{0%,100%{opacity:0.2;transform:scaleY(0.5);transform-origin:top}50%{opacity:1;transform:scaleY(1);transform-origin:top}}

  /* STATS */
  .lp-stats{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(201,168,76,0.1);border-bottom:1px solid rgba(201,168,76,0.1)}
  .lp-stat{padding:3rem 2rem;text-align:center;border-right:1px solid rgba(201,168,76,0.08);transition:background 0.35s}
  .lp-stat:hover{background:rgba(201,168,76,0.03)}
  .lp-stat:last-child{border-right:none}
  .lp-stat-num{font-family:'Cormorant Garamond',serif;font-size:3.5rem;font-weight:300;color:var(--gold);line-height:1;margin-bottom:0.5rem}
  .lp-stat-label{font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--quiet)}

  /* SECTION HEADER */
  .lp-sec-head{padding:7rem 3rem 0}
  .lp-kicker{font-size:0.65rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--gold);margin-bottom:1.2rem}
  .lp-sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.8rem,4.5vw,5rem);font-weight:300;line-height:1.0;color:var(--text)}
  .lp-sec-title em{font-style:italic;color:var(--gold)}
  .lp-sec-sub{margin-top:1.2rem;font-size:0.92rem;line-height:1.85;color:var(--muted);max-width:50ch}
  /* Make subsection text white for better contrast */
  .lp-sec-sub{color:var(--text)}

  /* FEATURES */
  .lp-features-body{padding:4rem 3rem 7rem;display:grid;grid-template-columns:1fr 1fr;gap:0}
  .lp-feature{display:grid;grid-template-columns:5rem 1fr;padding:2.8rem 3rem 2.8rem 0;border-bottom:1px solid rgba(201,168,76,0.07);position:relative;transition:all 0.3s}
  .lp-feature::before{content:'';position:absolute;left:0;bottom:-1px;width:0;height:1px;background:var(--gold);transition:width 0.45s ease}
  .lp-feature:hover::before{width:100%}
  .lp-feature:nth-child(even){padding:2.8rem 0 2.8rem 3rem;border-left:1px solid rgba(201,168,76,0.07)}
  .lp-feature-num{font-family:'Cormorant Garamond',serif;font-size:0.8rem;letter-spacing:0.1em;color:rgba(201,168,76,0.45);padding-top:0.2rem}
  .lp-feature-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:400;color:rgba(240,236,226,0.9);margin-bottom:0.6rem;line-height:1.15;transition:color 0.2s}
  .lp-feature:hover .lp-feature-title{color:var(--gold)}
  .lp-feature-desc{font-size:0.82rem;color:var(--muted);line-height:1.75}

  /* STEPS BENTO */
  .lp-steps-bento{padding:3rem 3rem 7rem;display:grid;grid-template-columns:1.4fr 1fr 1fr;grid-template-rows:auto auto;gap:1.5rem}
  .lp-step-card{background:var(--dark2);border:1px solid rgba(201,168,76,0.1);padding:2.2rem;display:flex;flex-direction:column;gap:1.2rem;transition:border-color 0.3s,transform 0.3s;position:relative;overflow:hidden}
  .lp-step-card::before{content:'';position:absolute;top:0;left:0;width:0;height:2px;background:var(--gold);transition:width 0.4s ease}
  .lp-step-card:hover::before{width:100%}
  .lp-step-card:hover{border-color:rgba(201,168,76,0.28);transform:translateY(-4px)}
  .lp-step-big{grid-column:1;grid-row:1/3;padding:2.8rem}
  .lp-step-icon{width:54px;height:54px;border:1px solid rgba(201,168,76,0.18);display:flex;align-items:center;justify-content:center;background:rgba(201,168,76,0.04);color:var(--gold);flex-shrink:0}
  .lp-step-icon svg{width:28px;height:28px}
  .lp-step-n{font-family:'Cormorant Garamond',serif;font-size:0.82rem;color:rgba(201,168,76,0.5);letter-spacing:0.1em}
  .lp-step-title{font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:var(--text);line-height:1.2}
  .lp-step-big .lp-step-title{font-size:1.8rem}
  .lp-step-list{list-style:none;display:flex;flex-direction:column;gap:0.65rem;margin-top:0.5rem}
  .lp-step-list li{font-size:0.82rem;color:#a09080;padding-left:1.1rem;position:relative;line-height:1.6}
  .lp-step-list li::before{content:'';position:absolute;left:0;top:0.6em;width:5px;height:5px;border-radius:50%;background:var(--gold);opacity:0.5}
  .lp-step-desc{font-size:0.83rem;color:var(--muted);line-height:1.7}

  /* ALBUM */
  .lp-album-layout{padding:3rem 3rem 7rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem}
  .lp-album-steps{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
  .lp-album-card{background:var(--dark2);border:1px solid rgba(201,168,76,0.1);padding:1.8rem;display:flex;flex-direction:column;gap:1rem;transition:border-color 0.3s,transform 0.3s;position:relative;overflow:hidden}
  .lp-album-card::after{content:'';position:absolute;bottom:0;right:0;width:0;height:0;border-style:solid;border-width:0 0 40px 40px;border-color:transparent transparent rgba(201,168,76,0.06) transparent;transition:border-width 0.3s}
  .lp-album-card:hover{border-color:rgba(201,168,76,0.28);transform:translateY(-3px)}
  .lp-album-card:hover::after{border-width:0 0 60px 60px}
  .lp-album-card-title{font-family:'Cormorant Garamond',serif;font-size:1.15rem;color:var(--text);line-height:1.2}

  .lp-album-visual{background:var(--dark3);border:1px solid rgba(201,168,76,0.12);padding:2.2rem;display:flex;flex-direction:column;gap:2rem;position:relative;overflow:hidden}
  .lp-album-visual-badge{font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);margin-bottom:0.5rem}
  .lp-album-visual-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:300;color:var(--text);line-height:1.15}
  .lp-album-visual-top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem}

  .lp-qr-box{width:100px;height:100px;background:#f0ece2;padding:8px;flex-shrink:0}
  .lp-qr-grid{display:grid;grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(7,1fr);gap:1.5px;width:100%;height:100%;background:#f0ece2}
  .lp-qr-cell{background:#0a0908}

  .lp-album-gallery{display:grid;grid-template-columns:3fr 2fr;gap:1rem;height:220px}
  .lp-gal-main{background:linear-gradient(145deg,#1c1814,#0e0c10);border:1px solid rgba(201,168,76,0.12);display:flex;align-items:flex-end;padding:1.2rem;position:relative;overflow:hidden}
  .lp-gal-main-shine{position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,rgba(201,168,76,0.03),transparent)}
  .lp-gal-main span{font-family:'Cormorant Garamond',serif;font-size:1rem;color:rgba(240,236,226,0.6);position:relative;z-index:1}
  .lp-gal-stack{display:grid;grid-template-rows:1fr 1fr;gap:1rem}
  .lp-gal-thumb{background:linear-gradient(145deg,#181614,#0c0a0f);border:1px solid rgba(201,168,76,0.1);display:flex;align-items:flex-end;padding:0.8rem}
  .lp-gal-thumb span{font-family:'Cormorant Garamond',serif;font-size:0.85rem;color:rgba(240,236,226,0.45)}

  /* CTA */
  .lp-cta{position:relative;padding:10rem 3rem;display:flex;flex-direction:column;align-items:center;text-align:center;overflow:hidden}
  .lp-cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%);pointer-events:none;animation:ctaPulse 4s ease-in-out infinite}
  .lp-cta-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;border:1px solid rgba(201,168,76,0.06);border-radius:50%;animation:ctaRing 6s linear infinite}
  .lp-cta-ring2{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:350px;height:350px;border:1px solid rgba(201,168,76,0.04);border-radius:50%;animation:ctaRing 8s linear infinite reverse}
  @keyframes ctaPulse{0%,100%{opacity:0.6}50%{opacity:1}}
  @keyframes ctaRing{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
  .lp-cta-kicker{font-size:0.65rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--gold);margin-bottom:2rem;position:relative;z-index:2}
  .lp-cta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,5vw,6rem);font-weight:300;line-height:1.0;color:var(--text);max-width:14ch;margin-bottom:3.5rem;position:relative;z-index:2}
  .lp-cta-title em{font-style:italic;color:var(--gold);display:block}
  .lp-cta-divider{width:1px;height:70px;background:linear-gradient(to bottom,transparent,rgba(201,168,76,0.35),transparent);margin-bottom:3.5rem;position:relative;z-index:2}

  /* FOOTER */
  .lp-footer{border-top:1px solid rgba(201,168,76,0.08);padding:2rem 3rem;display:flex;align-items:center;justify-content:space-between}
  .lp-footer-logo{font-family:'Cormorant Garamond',serif;font-size:1.1rem;letter-spacing:0.15em;color:rgba(201,168,76,0.3);font-weight:300}
  .lp-footer-copy{font-size:0.68rem;letter-spacing:0.12em;color:var(--quiet)}

  /* ANIMATIONS */
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .lp-reveal{opacity:0;transform:translateY(32px);transition:opacity 0.75s ease,transform 0.75s ease}
  .lp-reveal.on{opacity:1;transform:translateY(0)}
  .lp-reveal-d1{transition-delay:0.12s}
  .lp-reveal-d2{transition-delay:0.22s}
  .lp-reveal-d3{transition-delay:0.32s}
  .lp-reveal-d4{transition-delay:0.42s}

  /* RESPONSIVE */
  @media(max-width:768px){
    .lp-nav{padding:1rem 1.5rem}
    .lp-nav-links{display:none}
    .lp-hero{grid-template-columns:1fr;padding:7rem 1.5rem 4rem;gap:3rem}
    .lp-hero-right{display:none}
    .lp-stats{grid-template-columns:1fr}
    .lp-stat{border-right:none;border-bottom:1px solid rgba(201,168,76,0.08)}
    .lp-stat:last-child{border-bottom:none}
    .lp-features-body{grid-template-columns:1fr;padding:3rem 1.5rem}
    .lp-feature:nth-child(even){padding-left:0;border-left:none}
    .lp-steps-bento{grid-template-columns:1fr;padding:2rem 1.5rem}
    .lp-step-big{grid-column:1;grid-row:auto}
    .lp-album-layout,.lp-album-steps{grid-template-columns:1fr;padding:2rem 1.5rem}
    .lp-sec-head{padding:5rem 1.5rem 0}
    .lp-cta{padding:6rem 1.5rem}
    .lp-footer{flex-direction:column;gap:1rem;text-align:center;padding:2rem 1.5rem}
  }
`;

export default function LandingPage() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); }); },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.lp-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="lp" ref={revealRef}>

        {/* NAV */}
        <nav className="lp-nav">
          <a href="/" className="lp-logo">Rével</a>
          <ul className="lp-nav-links">
            <li><a href="#features">Funcionalidades</a></li>
            <li><a href="#invitaciones">Cómo funciona</a></li>
            <li><a href="/planes">Planes</a></li>
          </ul>
          <a href="/planes" className="lp-nav-cta">Entrar</a>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero-bg">
            <div className="lp-hero-orb1" />
            <div className="lp-hero-orb2" />
            <div className="lp-hero-grid" />
          </div>

          <div className="lp-hero-left">
            <div className="lp-hero-eyebrow">
              <div className="lp-hero-eyebrow-line" />
              <span>Gestión de Eventos</span>
            </div>
            <h1 className="lp-hero-h1">
              Organiza tu<br />Evento
              <em>soñado</em>
            </h1>
            <p className="lp-hero-p">
              Gestión de invitados, mesas, confirmaciones y recuerdos — todo en una sola plataforma profesional diseñada para los momentos que importan.
            </p>
            <div className="lp-hero-actions">
              <a href="/planes" className="btn-p">Comenzar ahora</a>
              <a href="#features" className="btn-g">Ver funcionalidades</a>
            </div>
          </div>

          <div className="lp-hero-right">
            <div className="lp-hero-card">
              <div className="lp-hero-card-visual">
                <img src="/images/relevellanding.png" alt="Evento elegante" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) saturate(0.5)', position: 'absolute', inset: 0 }} />
              </div>
              <div className="lp-hero-card-overlay">
                <span className="lp-hero-card-tag">Los mejores momentos</span>
                <p className="lp-hero-card-title">Tu historia,<br />contada con elegancia</p>
              </div>
              <div className="lp-hero-badge">
                <div className="lp-hero-badge-num">500+</div>
                <div className="lp-hero-badge-label">Eventos organizados</div>
              </div>
            </div>
          </div>

          <div className="lp-scroll-hint">
            <div className="lp-scroll-line" />
            <span className="lp-scroll-text">Scroll</span>
          </div>
        </section>

        {/* STATS */}
        <div className="lp-stats">
          {[
            { num: '500+', label: 'Eventos organizados' },
            { num: '12k+', label: 'Invitados gestionados' },
            { num: '100%', label: 'Satisfacción garantizada' },
          ].map((s, i) => (
            <div className={`lp-stat lp-reveal${i > 0 ? ` lp-reveal-d${i}` : ''}`} key={s.label}>
              <div className="lp-stat-num">{s.num}</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <section id="features">
          <div className="lp-sec-head lp-reveal">
            <p className="lp-kicker">Plataforma completa</p>
            <h2 className="lp-sec-title">Todo lo que<br /><em>necesitas</em></h2>
            <p className="lp-sec-sub">Cada funcionalidad fue diseñada para eliminar el caos de organizar eventos y darte control total, con la elegancia que tu ocasión merece.</p>
          </div>
          <div className="lp-features-body">
            {features.map((f, i) => (
              <div className={`lp-feature lp-reveal lp-reveal-d${(i % 2) + 1}`} key={f.num}>
                <span className="lp-feature-num">{f.num}</span>
                <div>
                  <h3 className="lp-feature-title">{f.title}</h3>
                  <p className="lp-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INVITATIONS */}
        <section id="invitaciones">
          <div className="lp-sec-head lp-reveal">
            <p className="lp-kicker">Invitaciones digitales interactivas</p>
            <h2 className="lp-sec-title">Invita con <em>elegancia</em></h2>
            <p className="lp-sec-sub">¿Cómo funciona?</p>
          </div>
          <div className="lp-steps-bento">
            {invitationSteps.map((step, i) => (
              <article
                className={`lp-step-card lp-reveal lp-reveal-d${i + 1}${step.big ? ' lp-step-big' : ''}`}
                key={step.num}
              >
                <span className="lp-step-n">{step.num}</span>
                <div className="lp-step-icon">{step.icon}</div>
                <h3 className="lp-step-title">{step.title}</h3>
                {step.desc && <p className="lp-step-desc">{step.desc}</p>}
                {step.list && (
                  <ul className="lp-step-list">
                    {step.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* QR ALBUM */}
        <section>
          <div className="lp-sec-head lp-reveal">
            <p className="lp-kicker">Álbum digital QR Rével</p>
            <h2 className="lp-sec-title">Atesora cada <em>momento</em></h2>
            <p className="lp-sec-sub">Una experiencia elegante para guardar fotos, videos y mensajes especiales en un solo lugar.</p>
          </div>

          <div className="lp-album-layout">
            <div className="lp-album-steps lp-reveal">
              {albumSteps.map((step, i) => (
                <div className={`lp-album-card lp-reveal lp-reveal-d${i + 1}`} key={step.num}>
                  <span className="lp-step-n">{step.num}</span>
                  <div className="lp-step-icon">{step.icon}</div>
                  <h3 className="lp-album-card-title">{step.title}</h3>
                </div>
              ))}
            </div>

            <div className="lp-album-visual lp-reveal lp-reveal-d2">
              <div className="lp-album-visual-top">
                <div>
                  <p className="lp-album-visual-badge">Rével álbum digital</p>
                  <h3 className="lp-album-visual-title">Recuerdos en una<br />presentación premium</h3>
                </div>
                {/* QR visual removed for cleaner layout */}
              </div>
              <div className="lp-album-gallery">
                <div className="lp-gal-main">
                  <div className="lp-gal-main-shine" />
                  <span>Álbum digital Rével</span>
                </div>
                <div className="lp-gal-stack">
                  <div className="lp-gal-thumb"><span>Galería</span></div>
                  <div className="lp-gal-thumb"><span>Momentos</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lp-cta lp-reveal">
          <div className="lp-cta-glow" />
          <div className="lp-cta-ring" />
          <div className="lp-cta-ring2" />
          <p className="lp-cta-kicker">¿Listo para empezar?</p>
          <h2 className="lp-cta-title">El evento <em>perfecto</em> comienza aquí</h2>
          <div className="lp-cta-divider" />
          <a href="/planes" className="btn-p" style={{ position: 'relative', zIndex: 2, fontSize: '0.75rem', padding: '1rem 3rem' }}>
            Entrar a Rével
          </a>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <span className="lp-footer-logo">Rével</span>
          <span className="lp-footer-copy">© 2025 Rével — Todos los derechos reservados</span>
        </footer>

      </div>
    </>
  );
}