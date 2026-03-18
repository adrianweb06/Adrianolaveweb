"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function HighPerformanceSpaceHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(true);
  
  const { scrollY } = useScroll();
  const yTranslate = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- OPTIMIZACIÓN: Detector de visibilidad para pausar el render ---
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Desactivado para fluidez total
      alpha: true, 
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Limitamos a 1.5 para evitar lag en pantallas 4K
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mountRef.current.appendChild(renderer.domElement);

    // Estrellas Optimizadas
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const starCount = 2500; // Reducido para rendimiento
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 3000;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 1500;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 5, map: createStarTexture(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Astronauta Refinado (Posición corregida)
    const textureLoader = new THREE.TextureLoader();
    const astronautTexture = textureLoader.load('/images/astronaut-clean.png');
    const astronautMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uTexture: { value: astronautTexture } },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform sampler2D uTexture; varying vec2 vUv; void main() { vec4 color = texture2D(uTexture, vUv); if ((color.r + color.g + color.b)/3.0 < 0.05) discard; gl_FragColor = color; }`
    });
    const astronautMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), astronautMaterial);
    
    const updateLayout = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      const scale = isMobile ? 65 : 100; 
      astronautMesh.scale.set(scale, scale, 1);
      // CORRECCIÓN: Posición X reducida de 60 a 45 para centrarlo más
      astronautMesh.position.set(isMobile ? 0 : 45, isMobile ? -35 : -5, 40);
    };
    updateLayout();
    scene.add(astronautMesh);

    let frameId: number;
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX - window.innerWidth / 2) / 100;
      mouse.y = (e.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // OPTIMIZACIÓN CLAVE: Si no es visible, no gastamos CPU/GPU
      if (!isVisible.current) return;

      starField.rotation.y += 0.0005;
      astronautMesh.position.y += Math.sin(Date.now() * 0.001) * 0.04;
      astronautMesh.rotation.z = -mouse.x * 0.02;
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateLayout();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(frameId);
      if (mountRef.current?.contains(renderer.domElement)) mountRef.current.removeChild(renderer.domElement);
      starGeometry.dispose(); starMaterial.dispose(); astronautMaterial.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000]">
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-1 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_60%_50%,rgba(0,240,255,0.15)_0%,rgba(0,0,0,1)_80%)]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div style={{ y: yTranslate, opacity }} className="max-w-3xl">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-meta/30 bg-cyan-meta/10 text-cyan-meta text-xs font-mono tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
              Paid Media | ROI Specialist
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            ADRIÁN <br /> <span className="gradient-text drop-shadow-[0_0_40px_rgba(0,240,255,0.4)] uppercase">OLAVE</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-xl"
          >
            Escalamiento estratégico en Meta & Google Ads. Llevo tu facturación <span className="text-white font-bold italic underline decoration-cyan-meta/40">a otro nivel</span> mediante datos y optimización masiva.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="https://wa.me/573244309292" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-base rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              🚀 AGENDAR CONSULTORÍA
            </a>
            <button className="w-full sm:w-auto px-8 py-4 glass rounded-xl text-white font-bold text-base hover:bg-white/10 transition-colors">
              VER RESULTADOS
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
