import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, View, PerspectiveCamera } from '@react-three/drei';
import { ModelStats1, ModelStats2, ModelStats3 } from './Models';

function Counter({ value, label, delay = 0, model }: { value: number; label: string; delay?: number; model: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, { duration: 2000 + delay, bounce: 0 });
  const display = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 glass-panel rounded-3xl relative overflow-hidden group h-64">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-violet-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
         <View className="absolute inset-0 w-full h-full">
           {/* Replace camera with PerspectiveCamera from drei */}
           <PerspectiveCamera makeDefault position={[0, 0, 5]} />
           <Suspense fallback={null}>
             {model}
             <Environment preset="city" />
           </Suspense>
         </View>
      </div>

      <motion.div className="text-5xl md:text-7xl font-display font-bold text-white mb-2 relative z-10 flex items-center pointer-events-none">
        <motion.span>{display}</motion.span>
        <span className="text-cyan-glow ml-1">+</span>
      </motion.div>
      <div className="text-sm font-mono text-white/80 uppercase tracking-widest relative z-10 pointer-events-none">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-24 relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Counter value={98} label="Models Trained" delay={0} model={<ModelStats1 />} />
        <Counter value={452} label="Automations Deployed" delay={200} model={<ModelStats2 />} />
        <Counter value={12} label="Enterprise Architects" delay={400} model={<ModelStats3 />} />
      </div>
    </section>
  );
}
