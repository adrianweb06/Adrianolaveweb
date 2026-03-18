"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);
    
    const material = new THREE.ShaderMaterial({
      uniforms: { 
        iTime: { value: 0 }, 
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) } 
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        
        float rand(vec2 n) { 
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); 
        }
        
        float noise(vec2 p){
          vec2 ip=floor(p);
          vec2 u=fract(p);
          u=u*u*(3.0-2.0*u);
          float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
          return res*res;
        }
        
        float fbm(vec2 x) {
          float v=0.0;
          float a=0.3;
          vec2 shift=vec2(100);
          mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));
          for(int i=0;i<3;++i){
            v+=a*noise(x);
            x=rot*x*2.0+shift;
            a*=0.4;
          }
          return v;
        }
        
        void main() {
          vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y * 8.0;
          vec4 o = vec4(0.0);
          float f = 2.0 + fbm(p + vec2(iTime * 1.2, 0.0)) * 0.5;
          
          for(float i=0.0; i < 28.0; i++) {
            vec2 v = p + cos(i * i + (iTime + p.x * 0.05) * 0.03 + i * vec2(11.0, 9.0)) * 3.2;
            float tailNoise = fbm(v + vec2(iTime * 0.3, i)) * 0.2 * (1.0 - (i / 28.0));
            
            // Colores: Mezcla de CyanMeta (#00F0FF) y Vibrant Orange (#FF4D00)
            vec4 auroraColors = mix(
              vec4(0.0, 0.94, 1.0, 1.0), // CyanMeta
              vec4(1.0, 0.3, 0.0, 1.0), // Vibrant Orange
              sin(i * 0.1 + iTime * 0.2) * 0.5 + 0.5
            );
            
            vec4 contribution = auroraColors * exp(sin(i * i + iTime * 0.5)) / length(max(v, vec2(v.x * f * 0.012, v.y * 1.2)));
            float thinness = smoothstep(0.0, 1.0, i / 28.0) * 0.5;
            o += contribution * (1.0 + tailNoise * 0.6) * thinness;
          }
          
          o = tanh(pow(o / 80.0, vec4(1.4)));
          gl_FragColor = o * 1.2;
        }
      `
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.01;
      renderer.render(scene, camera);
    };
    
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};
