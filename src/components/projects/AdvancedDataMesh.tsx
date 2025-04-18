'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AdvancedDataMeshProps {
  density?: number;
  speed?: number;
  color?: string;
}

export default function AdvancedDataMesh({ 
  density = 100,
  speed = 1,
  color = '#4f46e5'
}: AdvancedDataMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number[];
    }> = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < density; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * speed * 0.6;
        const vy = (Math.random() - 0.5) * speed * 0.6;
        const connections: number[] = [];
        
        nodes.push({
          x, y, vx, vy, radius, connections
        });
      }
    };
    
    const connectNodes = () => {
      const connectionDistance = canvas.width * 0.07;
      
      // Reset connections
      nodes.forEach(node => {
        node.connections = [];
      });
      
      // Calculate connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            nodes[i].connections.push(j);
            nodes[j].connections.push(i);
          }
        }
      }
    };
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.3;
      
      nodes.forEach((node, index) => {
        node.connections.forEach(connIndex => {
          const connectedNode = nodes[connIndex];
          const opacity = 1 - (Math.sqrt(
            Math.pow(node.x - connectedNode.x, 2) + 
            Math.pow(node.y - connectedNode.y, 2)
          ) / (canvas.width * 0.07));
          
          ctx.beginPath();
          ctx.globalAlpha = opacity * 0.7;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();
        });
      });
      
      // Draw nodes
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = color;
      
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Update positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      // Reconnect nodes
      connectNodes();
      
      // Request next frame
      animationFrameId = requestAnimationFrame(draw);
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, color]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
} 