"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const FloatingElement = ({ src, side, top, mobileTop, scale, speed }: { src: string, side: 'left' | 'right', top: string, mobileTop: string, scale: number, speed: number }) => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Animación basada en el scroll global para evitar errores de ref hidratación
  const yTranslate = useTransform(scrollY, [0, 5000], [0, speed * 5]);
  const rotate = useTransform(scrollY, [0, 5000], [0, 45]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      style={{ 
        y: yTranslate, 
        rotate,
        top: isMobile ? mobileTop : top,
        [side]: isMobile ? "-10%" : "-5%",
      }}
      className="absolute z-0 pointer-events-none opacity-30 md:opacity-40"
    >
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Image
          src={src}
          alt="Space Decor"
          width={isMobile ? (350 * scale) : (450 * scale)}
          height={isMobile ? (350 * scale) : (450 * scale)}
          className="mix-blend-screen drop-shadow-[0_0_40px_rgba(0,240,255,0.25)]"
        />
      </motion.div>
    </motion.div>
  );
};

export default function FloatingCosmos() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingElement 
        src="/images/transparente_satellite.png" 
        side="right" 
        top="115vh" 
        mobileTop="130vh"
        scale={1.2} 
        speed={100} 
      />

      <FloatingElement 
        src="/images/transparente_meta-space.png" 
        side="left" 
        top="240vh" 
        mobileTop="290vh"
        scale={0.9} 
        speed={80} 
      />

      <FloatingElement 
        src="/images/transparente_google-space.png" 
        side="right" 
        top="330vh" 
        mobileTop="440vh"
        scale={1.0} 
        speed={90} 
      />
    </div>
  );
}
