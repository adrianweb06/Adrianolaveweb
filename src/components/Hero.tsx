"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function StableSpaceHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(true);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (!mountRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2)); 
    mountRef.current.appendChild(renderer.domElement);

    // Estrellas
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 3500;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 2500;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 2000;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 3, color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Astronauta
    const textureLoader = new THREE.TextureLoader();
    const astronautTexture = textureLoader.load('/images/transparente_astronaut-final-v2.png', (tex) => {
      const aspect = tex.image.width / tex.image.height;
      
      // OPTIMIZACIÓN: Función de layout que solo cambia drásticamente si el ancho cambia mucho (evita tirones de barra de navegación)
      let lastWidth = window.innerWidth;
      
      const updateLayout = () => {
        const w = window.innerWidth;
        // Si el cambio de ancho es mínimo (como el que causa la barra de herramientas), no re-escalamos bruscamente
        if (Math.abs(w - lastWidth) < 50 && w < 768) return; 
        
        lastWidth = w;
        const isMobile = w < 768;
        const baseScale = isMobile ? 85 : 130; 
        astronaut.scale.set(baseScale * aspect, baseScale, 1);
        astronaut.position.set(isMobile ? 0 : 55, isMobile ? -5 : 5, 40);
      };
      
      window.addEventListener('resize', updateLayout);
      updateLayout();
    });

    const astronautMaterial = new THREE.SpriteMaterial({ 
      map: astronautTexture,
      transparent: true,
      opacity: 0.85, 
      blending: THREE.NormalBlending 
    });
    const astronaut = new THREE.Sprite(astronautMaterial);
    scene.add(astronaut);

    let frameId: number;
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX - window.innerWidth / 2) / 100;
      mouse.y = (e.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible.current) return;
      starField.rotation.y += 0.0004;
      astronaut.position.y += Math.sin(Date.now() * 0.001) * 0.04;
      astronaut.material.rotation = -mouse.x * 0.03;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      cancelAnimationFrame(frameId);
      if (mountRef.current?.contains(renderer.domElement)) mountRef.current.removeChild(renderer.domElement);
      starGeometry.dispose(); starMaterial.dispose(); astronautMaterial.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} id="inicio" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000] pt-24 pb-12 px-6">
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.8)_0%,transparent_60%)]" />
      <div className="absolute inset-0 z-1 pointer-events-none opacity-70 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.15)_0%,rgba(0,0,0,1)_90%)]" />

      <div className="container relative z-10 mx-auto max-w-7xl flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div style={{ opacity }} className="max-w-3xl flex flex-col items-center md:items-start">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-meta/30 bg-cyan-meta/10 text-cyan-meta text-[10px] font-mono tracking-[0.3em] uppercase backdrop-blur-md">
              Paid Media | Master ROI
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            ADRIÁN <br /> <span className="gradient-text drop-shadow-[0_0_40px_rgba(0,240,255,0.4)] uppercase">OLAVE</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-12 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Escalamiento estratégico en Meta & Google Ads. Llevo tu facturación <span className="text-white font-bold italic underline decoration-cyan-meta/40">a otro nivel</span> mediante datos y optimización interestelar.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href="https://wa.me/573244309292" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-base rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
              🚀 AGENDAR AHORA
            </a>
            <button 
              onClick={() => document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 glass rounded-xl text-white font-bold text-base hover:bg-white/10 transition-colors uppercase tracking-widest text-[10px]"
            >
              Ver Resultados
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
