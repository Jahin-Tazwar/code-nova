import { useEffect, useRef } from 'react';

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      history: {x: number, y: number}[];

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Slightly larger for better visibility
        this.speedX = (Math.random() - 0.5) * 3; // Slightly faster for shooting stars
        this.speedY = (Math.random() - 0.5) * 3;
        this.history = [];
        
        const colors = ['#00F4FF', '#8A2BE2', '#ffffff', '#0B0B1A'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.history.push({ x: this.x, y: this.y });
        // Keep trail length up to 40 points for an elongated effect
        if (this.history.length > 40) {
           this.history.shift();
        }

        this.x += this.speedX;
        this.y += this.speedY;

        let wrapped = false;
        if (this.x > canvas.width) { this.x = 0; wrapped = true; }
        else if (this.x < 0) { this.x = canvas.width; wrapped = true; }
        
        if (this.y > canvas.height) { this.y = 0; wrapped = true; }
        else if (this.y < 0) { this.y = canvas.height; wrapped = true; }

        if (wrapped) {
          this.history = [];
        }
      }

      draw() {
        if (!ctx) return;
        
        // Draw fading trail first so it's behind the particle head
        if (this.history.length > 1) {
          ctx.lineCap = 'round';
          ctx.lineWidth = this.size * 0.8; // slightly thinner tail
          for (let i = 0; i < this.history.length - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(this.history[i].x, this.history[i].y);
            ctx.lineTo(this.history[i + 1].x, this.history[i + 1].y);
            ctx.strokeStyle = this.color;
            // Exponential fade for a subtle, elongated shooting star effect
            const fade = Math.pow(i / this.history.length, 3);
            ctx.globalAlpha = this.opacity * fade * 0.8; 
            ctx.stroke();
          }
        }

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid manually for a bit of structure
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      ctx.beginPath();
      for(let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for(let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // draw lines between close particles
        for(let j = i; j < particles.length; j++) {
           const dx = particles[i].x - particles[j].x;
           const dy = particles[i].y - particles[j].y;
           const distance = Math.sqrt(dx * dx + dy * dy);
           
           if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
           }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-obsidian">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/50 to-obsidian z-10" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
