import Hero from "@/components/Hero";
import MetricsGrid from "@/components/MetricsGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechStack from "@/components/TechStack";

// Importamos fuentes de Google de Next.js
import { Inter_Tight, JetBrains_Mono } from "next/font/google";

const interTight = Inter_Tight({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function Home() {
  return (
    <main className={`min-h-screen bg-[#000000] text-white selection:bg-cyan-meta selection:text-[#050505] ${interTight.variable} ${jetBrainsMono.variable}`}>
      {/* 
          ELIMINADO: AuroraBackground - Estaba causando conflicto de rendimiento 
          con el Hero espacial. Ahora solo hay un motor 3D activo.
      */}
      
      <div className="relative z-10">
        <Hero />
        <MetricsGrid />
        <ExperienceTimeline />
        <TechStack />
        
        <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5 backdrop-blur-xl bg-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-meta/20 border border-cyan-meta/40 flex items-center justify-center">
                  <span className="font-bold text-cyan-meta">A</span>
                </div>
                <span className="font-bold tracking-widest uppercase">Adrián Olave</span>
              </div>
              <p>© {new Date().getFullYear()} Trafficker Digital | ROI Specialist.</p>
              <div className="flex gap-4 font-mono text-[10px] uppercase tracking-tighter">
                <a href="#" className="hover:text-cyan-meta transition-colors">LinkedIn</a>
                <span className="text-gray-800">/</span>
                <a href="#" className="hover:text-cyan-meta transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
