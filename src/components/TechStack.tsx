"use client";

import { motion } from "framer-motion";

// SVGs optimizados para mantener el rendimiento y no depender de llamadas externas en runtime
const logos = [
  { name: "Meta Ads", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M24 12c0-5.32-4.1-9.69-9.36-10-3.6-.2-6.85 1.54-8.56 4.6a9.55 9.55 0 0 0-3.4-1.92A5.12 5.12 0 0 0 0 9.4c0 3.32 2.68 6.02 6 6.02h.16c.3 0 .58-.04.86-.1a9.5 9.5 0 0 0 6.64 4.5c4.76.65 9-2.3 9.34-7.06.01-.25.02-.5.02-.76zm-9.34 7.64c-3.5-.2-6.22-3.16-6.22-6.64 0-3.66 2.97-6.63 6.64-6.63 3.67 0 6.63 2.97 6.63 6.63 0 3.48-2.72 6.44-6.22 6.64a6.6 6.6 0 0 1-.83.04zM6 13.06a2.66 2.66 0 0 1-2.66-2.66c0-1.47 1.2-2.66 2.66-2.66a2.66 2.66 0 0 1 2.66 2.66c0 1.47-1.2 2.66-2.66 2.66z"/></svg> },
  { name: "Google Ads", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M21.5 10.45l-4.57 7.9c-1.37 2.37-4.43 3.19-6.8 1.83-2.37-1.37-3.18-4.43-1.81-6.8l4.57-7.9c1.37-2.37 4.43-3.19 6.8-1.83 2.37 1.37 3.18 4.43 1.81 6.8zM4.3 16.3A5.4 5.4 0 1 1 9.7 7a5.4 5.4 0 0 1-5.4 9.3z"/></svg> },
  { name: "TikTok", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M12.5 0h-2.9v16.1c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5c.3 0 .5 0 .8.1V9.6c-.3 0-.5-.1-.8-.1-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5V6.7c1.7 1.4 4 2.3 6.4 2.3V5.9c-2.3 0-4.4-1.2-5.5-3.1V0z"/></svg> },
  { name: "YouTube", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M23.5 6.2c-.2-1-.9-1.8-1.9-2C19.9 3.8 12 3.8 12 3.8s-7.9 0-9.6.4C1.4 4.4.7 5.2.5 6.2 0 8.1 0 12 0 12s0 3.9.5 5.8c.2 1 .9 1.8 1.9 2 1.7.4 9.6.4 9.6.4s7.9 0 9.6-.4c1-.2 1.7-1 1.9-2 .5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg> },
  { name: "Figma", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M8 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM8 18.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM15 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM15 18.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM8 24a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg> },
  { name: "Adobe CC", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12"><path d="M14.7 13.9c-.3-.1-1-.4-1.6-.4-1.7 0-2.4 1-2.4 2 0 1 .6 2 2.2 2 1 0 1.6-.3 2.1-.6v-3zm3.7 2.3c0 2-1 3.5-3.3 3.5-1.5 0-2.6-.5-3.2-1l.7-1.5c.5.4 1.3.8 2.2.8 1 0 1.6-.5 1.6-1.5 0-1-.6-1.5-2.2-2-1.7-.5-2.6-1.4-2.6-2.7 0-1.7 1.3-3.1 3-3.1 1.3 0 2.2.4 2.8.8l-.6 1.4c-.4-.3-1.1-.6-2-.6-.9 0-1.4.5-1.4 1.3 0 1 .8 1.4 2.2 1.8 2.1.6 2.8 1.6 2.8 2.8zM4.9 14.5c0 1.1-.9 1.9-2.2 1.9H1.4v-4h1.3c1.3 0 2.2.8 2.2 2.1zM1.4 18h1.5v-2h-.1c1 0 2.5-.5 2.5-2.8 0-2.4-1.3-3.6-3-3.6H0v10h1.4v-1.6zM24 0v24H0V0h24zM22.5 1.5H1.5v21h21v-21z"/></svg> },
];

export default function TechStack() {
  return (
    <section className="py-24 px-6 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-5xl text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Stack de <span className="text-orange-google">Herramientas</span>
        </motion.h2>
        <p className="text-gray-400 text-lg">
          Dominio avanzado de las principales plataformas publicitarias y creativas.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="py-8 animate-marquee whitespace-nowrap flex items-center gap-16">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 text-gray-500 hover:text-white transition-colors duration-300"
            >
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center bg-[#050505] hover:bg-white/5 transition-colors">
                {logo.icon}
              </div>
              <span className="text-sm font-semibold tracking-wider font-mono">{logo.name}</span>
            </div>
          ))}
        </div>
        
        {/* Marquee Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      </div>
      
      {/* Añadimos keyframes de Tailwind para la animación de marquesina mediante CSS global en línea o componente */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
