import { Background } from './components/Background';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Work } from './components/Work';
import { Contact } from './components/Contact';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full">
      <CustomCursor />
      <ScrollProgress />
      <Background />
      
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
           className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-glow/10 blur-[130px]"
           animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
           className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] rounded-full bg-cyan-glow/10 blur-[160px]"
           animate={{
              x: [0, -40, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="relative z-10 selection:bg-cyan-glow/30 selection:text-white cursor-none">
        <Hero />
        <Stats />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      
      {/* Footer minimal */}
      <footer className="relative z-10 py-8 text-center text-gray-600 font-mono text-xs border-t border-white/[0.02] bg-midnight glass-panel w-full">
        <p>© {new Date().getFullYear()} NOVA TECH AGENCY. ALL SYSTEMS NOMINAL.</p>
      </footer>

      {/* Global Canvas for Views */}
      <Canvas
        eventSource={containerRef}
        className="pointer-events-none"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      >
        <View.Port />
      </Canvas>
    </div>
  );
}
