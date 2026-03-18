"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Gestión Senior Performance",
    company: "UPHIGH LLC (USA)",
    details: "Escalamiento de campañas para el mercado anglosajón. Enfoque en ROAS agresivo y optimización presupuestaria en USD.",
    year: "2023 - Presente",
  },
  {
    id: 2,
    role: "Director de Tráfico Masivo",
    company: "ALS EVENTOS (EUROPA)",
    details: "Coordinación de campañas para festivales y eventos multitudinarios. Tráfico segmentado por intereses masivos.",
    year: "2021 - 2023",
  },
  {
    id: 3,
    role: "Paid Media Lead",
    company: "FREELANCE PRO",
    details: "Especialista en Lead Generation para el sector servicios. Automatización de funnels hacia WhatsApp.",
    year: "2019 - 2021",
  },
  {
    id: 4,
    role: "Estratega Digital",
    company: "FESTIVAL DE BALLET",
    details: "Transformación digital de instituciones culturales. Gestión integral de Social Media y Web.",
    year: "2013 - 2019",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-20">
          
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Trayectoria <br/><span className="text-gray-500 italic">Evolutiva</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Más de una década refinando la psicología de la conversión y el manejo de algoritmos publicitarios.
              </p>
            </motion.div>
          </div>

          <div className="md:w-2/3 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/10"
              >
                {/* Time Indicator */}
                <div className="absolute left-0 top-0 w-8 h-8 -translate-x-1/2 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center group-hover:border-cyan-meta transition-colors">
                  <div className="w-2 h-2 rounded-full bg-white group-hover:bg-cyan-meta transition-colors" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-meta transition-colors">{exp.role}</h3>
                  <span className="text-sm font-mono text-gray-500 bg-white/5 px-4 py-1 rounded-full">{exp.year}</span>
                </div>
                <h4 className="text-orange-google font-black text-sm uppercase tracking-widest mb-4">{exp.company}</h4>
                <p className="text-gray-400 text-lg leading-relaxed">{exp.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
