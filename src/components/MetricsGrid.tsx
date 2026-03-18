"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const metrics = [
  {
    id: 1,
    title: "+8 Años",
    subtitle: "de Experiencia",
    description: "Gestión estratégica en mercados locales e internacionales.",
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/10 to-transparent p-10 rounded-[3rem]",
    titleClass: "text-7xl lg:text-9xl font-black text-white tracking-tighter",
  },
  {
    id: 2,
    title: "~60",
    subtitle: "Ads/semana",
    description: "Producción de contenido publicitario de alto impacto.",
    className: "glass p-8 rounded-[2rem]",
    titleClass: "text-5xl font-bold text-cyan-meta",
  },
  {
    id: 3,
    title: "10x",
    subtitle: "ROI Escalamiento",
    description: "Crecimiento exponencial demostrado en ecommerce.",
    className: "glass p-8 rounded-[2rem] border-orange-google/30",
    titleClass: "text-6xl font-black text-orange-google",
  },
  {
    id: 4,
    title: "+700k",
    subtitle: "Alcance Masivo",
    description: "Personas impactadas en eventos internacionales de gran escala.",
    className: "md:col-span-3 glass p-10 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8",
    titleClass: "text-8xl font-black text-white",
  },
];

function MetricCard({ metric, index }: { metric: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={`relative group transition-all duration-300 ${metric.className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 h-full flex flex-col"
      >
        <h3 className={`${metric.titleClass} mb-2`} style={{ fontFamily: "var(--font-mono)" }}>
          {metric.title}
        </h3>
        <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">{metric.subtitle}</h4>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md">{metric.description}</p>
      </div>

      {/* Gloss effect overlay */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export default function MetricsGrid() {
  return (
    <section id="resultados" className="py-32 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
              Impacto <br />
              <span className="text-cyan-meta underline decoration-orange-google">Medible</span>
            </h2>
            <p className="text-gray-400 text-xl font-light">
              No vendemos anuncios, vendemos resultados. Datos reales de campañas escaladas globalmente.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40">↓</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(250px,auto)]">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
