'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const DigitalGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  // Couleurs des particules
  const PARTICLE_COLORS = [
    'rgba(240, 240, 245, 0.8)',  // presque blanc
    'rgba(220, 220, 230, 0.8)',  // gris très clair
    'rgba(200, 200, 210, 0.8)',  // gris clair
    'rgba(180, 180, 190, 0.8)',  // gris moyen clair
    'rgba(255, 255, 255, 0.8)',  // blanc pur
  ];
  
  // Effet pour initialiser et animer le globe
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configuration du canvas pour l'adapter à son conteneur
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    // Points sur le globe (longitude, latitude, taille)
    const points: [number, number, number][] = [];
    
    // Ajouter des points de données sur le globe
    for (let i = 0; i < 200; i++) {
      // Distribution non uniforme pour simuler des zones d'activité
      const longitude = Math.random() * Math.PI * 2;
      // Concentrer plus de points près de l'équateur
      const latitude = (Math.random() - 0.5) * Math.PI;
      // Varier la taille des points
      const size = Math.random() * 1.5 + 0.5;
      points.push([longitude, latitude, size]);
    }
    
    // Ajouter des connexions entre certains points (simule le réseau global)
    const connections: [number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const pointA = Math.floor(Math.random() * points.length);
      const pointB = Math.floor(Math.random() * points.length);
      if (pointA !== pointB) {
        connections.push([pointA, pointB]);
      }
    }
    
    // Fonction pour convertir les coordonnées sphériques en coordonnées cartésiennes
    const sphereToCartesian = (longitude: number, latitude: number, radius: number) => {
      return {
        x: radius * Math.cos(latitude) * Math.sin(longitude),
        y: radius * Math.sin(latitude),
        z: radius * Math.cos(latitude) * Math.cos(longitude)
      };
    };
    
    // État de la rotation
    let rotation = 0;
    
    // Fonction d'animation
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Centre du canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Rayon du globe
      const radius = Math.min(centerX, centerY) * 0.7;
      
      // Augmenter la rotation (vitesse de rotation)
      rotation += 0.003;
      
      // Dessiner le globe
      // Grille méridienne semi-transparente (méridiens)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.5;
      
      // Dessiner les méridiens
      for (let meridian = 0; meridian < Math.PI * 2; meridian += Math.PI / 12) {
        ctx.beginPath();
        for (let latitude = -Math.PI / 2; latitude <= Math.PI / 2; latitude += 0.05) {
          const point = sphereToCartesian(meridian + rotation, latitude, radius);
          // Vérifier si le point est visible (devant le globe)
          if (point.z > 0) {
            if (latitude === -Math.PI / 2) ctx.moveTo(centerX + point.x, centerY - point.y);
            else ctx.lineTo(centerX + point.x, centerY - point.y);
          }
        }
        ctx.stroke();
      }
      
      // Dessiner les parallèles
      for (let parallel = -Math.PI / 2; parallel <= Math.PI / 2; parallel += Math.PI / 12) {
        ctx.beginPath();
        for (let longitude = 0; longitude <= Math.PI * 2; longitude += 0.05) {
          const point = sphereToCartesian(longitude + rotation, parallel, radius);
          // Vérifier si le point est visible
          if (point.z > 0) {
            if (longitude === 0) ctx.moveTo(centerX + point.x, centerY - point.y);
            else ctx.lineTo(centerX + point.x, centerY - point.y);
          }
        }
        ctx.stroke();
      }
      
      // Dessiner les points de données
      points.forEach(([longitude, latitude, size]) => {
        const point = sphereToCartesian(longitude + rotation, latitude, radius);
        
        // Ne dessiner que les points visibles (face avant du globe)
        if (point.z > 0) {
          // Calculer l'opacité basée sur la position Z
          const opacity = 0.3 + (point.z / radius) * 0.7;
          
          ctx.beginPath();
          ctx.arc(centerX + point.x, centerY - point.y, size * (0.5 + (point.z / radius) * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      });
      
      // Dessiner les connexions
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.5;
      
      connections.forEach(([indexA, indexB]) => {
        const [lonA, latA] = points[indexA];
        const [lonB, latB] = points[indexB];
        
        const pointA = sphereToCartesian(lonA + rotation, latA, radius);
        const pointB = sphereToCartesian(lonB + rotation, latB, radius);
        
        // Ne dessiner que si les deux points sont visibles
        if (pointA.z > 0 && pointB.z > 0) {
          // Utiliser une opacité qui varie avec la position Z
          const opacityA = 0.15 + (pointA.z / radius) * 0.35;
          const opacityB = 0.15 + (pointB.z / radius) * 0.35;
          const avgOpacity = (opacityA + opacityB) / 2;
          
          ctx.beginPath();
          ctx.moveTo(centerX + pointA.x, centerY - pointA.y);
          ctx.lineTo(centerX + pointB.x, centerY - pointB.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${avgOpacity})`;
          ctx.stroke();
        }
      });
      
      // Effet de lueur autour du globe
      const gradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.95,
        centerX, centerY, radius * 1.05
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();
      
      // Continuer l'animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialiser et démarrer l'animation
    resizeCanvas();
    animate();
    
    // Ajuster le canvas lors du redimensionnement de la fenêtre
    window.addEventListener('resize', resizeCanvas);
    
    // Nettoyer à la destruction du composant
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
        {/* Effet de lueur ambiante */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-full"
          animate={{ 
            opacity: [0.5, 0.7, 0.5],
            scale: [0.95, 1, 0.95]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Le canvas qui dessine le globe */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
        
        {/* Points lumineux autour du globe pour effet 3D */}
        {Array.from({ length: 5 }).map((_, i) => {
          // Positionnement aléatoire autour du globe
          const angle = Math.random() * Math.PI * 2;
          const distance = 80 + Math.random() * 40;
          const x = 50 + Math.cos(angle) * distance;
          const y = 50 + Math.sin(angle) * distance;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ 
                opacity: [0, 0.9, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatDelay: 1 + Math.random() * 3
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DigitalGlobe; 