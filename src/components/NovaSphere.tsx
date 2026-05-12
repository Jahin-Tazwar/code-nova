import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function NovaSphere() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pullFactor, setPullFactor] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nX = (e.clientX / window.innerWidth) * 2 - 1;
      const nY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({
        x: nX,
        y: nY,
      });
      const dist = Math.sqrt(nX * nX + nY * nY);
      setPullFactor(Math.exp(-dist * dist * 4));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[800px] flex items-center justify-center pointer-events-none [perspective:3000px]">
      {/* Background Volumetric Glows */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full bg-cyan-glow/10 blur-[120px] mix-blend-screen"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-violet-glow/20 blur-[100px] mix-blend-screen"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.6, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Intricate Geometric Core */}
      <motion.div
        className="relative w-[500px] h-[500px] grid place-items-center"
        animate={{
          rotateX: mousePos.y * 40,
          rotateY: mousePos.x * 40,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20, mass: 2 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer orbital rings (Multi-axis) */}
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i}
            className={`absolute inset-[-20%] border opacity-60 rounded-full ${i % 3 === 0 ? 'border-cyan-glow/40 shadow-[0_0_15px_rgba(0,244,255,0.2)]' : i % 3 === 1 ? 'border-violet-glow/40 shadow-[0_0_15px_rgba(138,43,226,0.2)]' : 'border-white/20'}`}
            style={{ 
              transform: `rotateX(${i * 15}deg) rotateY(${i * 15}deg)`,
              borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
              borderWidth: i % 4 === 0 ? '2px' : '1px'
            }}
            animate={{ 
              rotateZ: 360, 
              rotateX: [i * 15, i * 15 + 15, i * 15],
              rotateY: [i * 15, i * 15 - 15, i * 15]
            }}
            transition={{ duration: 30 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Mid-layer tech grid sphere */}
        <motion.div 
          className="absolute inset-[10%] border border-white/30 bg-gradient-to-tr from-cyan-glow/10 to-violet-glow/10 backdrop-blur-[4px] rounded-full [mask-image:radial-gradient(transparent_30%,black)] shadow-[inset_0_0_100px_rgba(0,244,255,0.2)]"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateZ: -360, rotateY: 360, rotateX: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
           {/* Lattice intersections */}
           <div className="w-full h-full rounded-full opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '5% 5%' }} />
        </motion.div>
        
        {/* Dense Energy Field / Black Hole Core */}
        <motion.div 
          className="absolute w-40 h-40 bg-obsidian border-[0.5px] border-white/20 rounded-full flex items-center justify-center overflow-hidden" 
          animate={{
             z: 50,
             scale: 1 + pullFactor * 0.4,
             boxShadow: `0 0 ${80 + pullFactor * 80}px rgba(0, 244, 255, ${0.6 + pullFactor * 0.4}), inset 0 0 ${40 + pullFactor * 40}px rgba(138, 43, 226, ${0.8 + pullFactor * 0.2})`
          }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
             
             {/* Swirling micro-stars inside core */}
             <motion.div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,transparent_10%)] bg-[length:6px_6px] opacity-40 mix-blend-screen"
                animate={{ rotate: -360, scale: [1, 2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             />

             {/* Intense Core Light */}
             <motion.div 
                className="w-20 h-20 bg-white rounded-full blur-[12px] mix-blend-screen shadow-[0_0_50px_#fff]" 
                animate={{ scale: [1, 1.4, 0.8, 1], opacity: [0.8, 1, 0.7, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.div 
                className="absolute w-2 h-[150%] bg-cyan-glow blur-[12px] mix-blend-screen"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
             <motion.div 
                className="absolute w-[150%] h-2 bg-violet-glow blur-[12px] mix-blend-screen"
                animate={{ rotate: -360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
             />
        </motion.div>

        {/* Orbiting Satellites / Data Packets */}
        {[...Array(12)].map((_, i) => (
           <motion.div
             key={`sat-${i}`}
             className="absolute inset-[-60%]"
             style={{ transformStyle: 'preserve-3d' }}
             animate={{ 
                rotateZ: 360,
                rotateX: i % 2 === 0 ? 45 : -45,
                rotateY: i % 3 === 0 ? 60 : -60 
             }}
             transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
           >
              <div 
                className="absolute top-0 left-1/2 w-3 h-3 rounded-full blur-[1px]"
                style={{ 
                   backgroundColor: i % 3 === 0 ? '#00F4FF' : i % 3 === 1 ? '#8A2BE2' : '#FFF',
                   boxShadow: `0 0 20px 4px ${i % 3 === 0 ? '#00F4FF' : i % 3 === 1 ? '#8A2BE2' : '#FFF'}`,
                   transform: `translateZ(${i * 20}px)`
                }}
              />
           </motion.div>
        ))}

        {/* Depth Rings */}
        {[...Array(4)].map((_, i) => (
           <motion.div
             key={`depth-${i}`}
             className="absolute w-[150%] h-[150%] border-t-2 border-l-2 border-white/5 rounded-full"
             style={{ transform: `translateZ(${-(i + 1) * 100}px)` }}
             animate={{ rotateZ: -360 }}
             transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
           />
        ))}

      </motion.div>
    </div>
  );
}
