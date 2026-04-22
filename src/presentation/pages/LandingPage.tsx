import { motion } from 'framer-motion';

const features = [
  {
    title: 'Gestión visual de invitados',
    desc: 'Controla confirmaciones, asigna mesas y personaliza invitaciones con facilidad.',
  },
  {
    title: 'Mesas dinámicas y asignación',
    desc: 'Organiza y visualiza la distribución de mesas de forma elegante y sencilla.',
  },
  {
    title: 'Confirmaciones RSVP en tiempo real',
    desc: 'Sigue el estado de asistencia de tus invitados al instante.',
  },
  {
    title: 'Invitaciones PDF personalizadas',
    desc: 'Genera y descarga invitaciones únicas para cada invitado.',
  },
  {
    title: 'Galería de fotos por QR',
    desc: 'Cada mesa tiene un QR para subir y ver fotos del evento.',
  },
  {
    title: 'Panel de administración seguro',
    desc: 'Acceso protegido para organizar y monitorear todo el evento.',
  },
];

export default function LandingPage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] gap-8 overflow-x-hidden">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/10 via-white/80 to-gold/20 animate-gradient-move"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.h1
        initial={{opacity:0, y:40}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.8}}
        className="font-display text-4xl md:text-6xl text-gold text-center mb-2 drop-shadow-lg"
      >
        Organiza tu evento soñado
      </motion.h1>
      <motion.p
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.5, duration:0.8}}
        className="text-xl md:text-2xl text-center max-w-2xl text-black/80 dark:text-white/80"
      >
        Gestión de invitados, mesas, confirmaciones y recuerdos en una sola plataforma profesional.
      </motion.p>
      <motion.div
        initial={{opacity:0, scale:0.9}}
        animate={{opacity:1, scale:1}}
        transition={{delay:0.8, duration:0.6}}
        className="flex gap-4 mt-4"
      >
        <a href="/dashboard" className="bg-gold text-white px-6 py-3 rounded-2xl shadow-soft font-semibold text-lg hover:bg-black hover:text-gold transition">Ir al Dashboard</a>
        <a href="#features" className="border-2 border-gold text-gold px-6 py-3 rounded-2xl font-semibold text-lg hover:bg-gold hover:text-white transition">Ver funcionalidades</a>
      </motion.div>
      <motion.img
        src="/src/assets/hero.png"
        alt="Evento elegante"
        className="rounded-2xl shadow-2xl w-full max-w-lg mt-8 border-4 border-gold/30"
        initial={{opacity:0, scale:0.95}}
        animate={{opacity:1, scale:1}}
        transition={{delay:1, duration:0.8}}
      />
      {/* Características animadas */}
      <section id="features" className="mt-20 w-full max-w-6xl">
        <h2 className="font-display text-3xl text-center mb-8 text-black dark:text-white">Características</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-white/80 dark:bg-black/80 rounded-2xl shadow-soft p-6 flex flex-col items-center border border-gold/20 hover:scale-105 hover:shadow-lg transition"
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{delay:0.1*i, duration:0.5}}
            >
              <h3 className="font-semibold text-lg mb-2 text-gold text-center">{f.title}</h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Llamada a la acción final */}
      <motion.div
        className="mt-24 mb-12 text-center"
        initial={{opacity:0, y:30}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        transition={{duration:0.7}}
      >
        <h3 className="font-display text-2xl text-gold mb-4">¿Listo para organizar el evento perfecto?</h3>
        <a href="/dashboard" className="inline-block bg-gold text-white px-8 py-4 rounded-2xl shadow-soft font-semibold text-lg hover:bg-black hover:text-gold transition">Comenzar ahora</a>
      </motion.div>
    </section>
  );
}
