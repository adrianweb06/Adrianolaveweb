import Hero from "@/components/Hero";
import MetricsGrid from "@/components/MetricsGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TechStack from "@/components/TechStack";
import FloatingCosmos from "@/components/FloatingCosmos";

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
    <main className={`min-h-screen bg-[#000000] text-white selection:bg-cyan-meta selection:text-[#050505] ${interTight.variable} ${jetBrainsMono.variable} relative`}>
      
      {/* FONDO GALÁCTICO PERSISTENTE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-cyan-meta/5 blur-[120px] animate-pulse" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-orange-google/5 blur-[120px]" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[100%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[100px]" />
        
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* ELEMENTOS 3D FLOTANTES DE APOYO */}
      <FloatingCosmos />

      <div className="relative z-10">
        <Hero />
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-meta/20 to-transparent" />
        
        <MetricsGrid />
        
        <ExperienceTimeline />
        
        <div className="flex justify-center py-10 opacity-20 hover:opacity-100 transition-opacity duration-1000">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-meta animate-bounce">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/>
            </svg>
        </div>

        <TechStack />
        
        <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5 backdrop-blur-xl bg-black/80">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-meta/20 border border-cyan-meta/40 flex items-center justify-center">
                  <span className="font-bold text-cyan-meta">A</span>
                </div>
                <span className="font-bold tracking-widest uppercase">Adrián Olave</span>
              </div>
              <p>© {new Date().getFullYear()} Trafficker Digital | ROI Architect.</p>
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
