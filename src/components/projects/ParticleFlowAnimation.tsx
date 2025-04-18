'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
  direction: number;
  opacity: number;
}

// Nombre de particules à générer
const PARTICLE_COUNT = 60;

// Couleurs des particules
const PARTICLE_COLORS = [
  'rgba(255, 255, 255, 0.7)',  // blanc
  'rgba(240, 240, 245, 0.6)',  // presque blanc
  'rgba(220, 220, 230, 0.5)',  // gris très clair
  'rgba(200, 200, 210, 0.4)',  // gris clair
  'rgba(210, 210, 220, 0.5)',  // gris moyen clair
];

const ParticleFlowAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  
  // Fonction pour initialiser les particules
  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        speed: Math.random() * 2 + 0.5,
        delay: Math.random() * 2,
        direction: Math.random() > 0.5 ? 1 : -1,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
    
    particlesRef.current = particles;
  }, []);
  
  // Fonction pour dessiner les particules
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner chaque particule
    particlesRef.current.forEach((particle) => {
      const { x, y, size, color, speed, delay, direction, opacity } = particle;
      
      // Appliquer le délai au mouvement
      if (time < delay * 1000) return;
      
      // Dessiner la particule
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fill();
      
      // Dessiner la traînée (effet de mouvement)
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - direction * speed * 10, y);
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity * 0.5;
      ctx.lineWidth = size / 2;
      ctx.stroke();
      
      // Réinitialiser l'opacité globale
      ctx.globalAlpha = 1;
      
      // Mettre à jour la position de la particule
      particle.x += direction * speed;
      
      // Si la particule sort du canvas, la repositionner de l'autre côté
      if (particle.x > canvas.width + size) {
        particle.x = -size;
      } else if (particle.x < -size) {
        particle.x = canvas.width + size;
      }
    });
  }, []);
  
  // Animation loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawParticles(ctx, time);
    
    rafRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);
  
  // Effet pour initialiser et animer les particules
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Définir la taille du canvas pour qu'il remplisse son conteneur
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    // Initialiser le canvas et les particules
    resizeCanvas();
    initParticles();
    
    // Démarrer l'animation
    rafRef.current = requestAnimationFrame(animate);
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    
    return () => {
      // Nettoyer l'animation à la destruction du composant
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, initParticles]);
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ParticleFlowAnimation; 