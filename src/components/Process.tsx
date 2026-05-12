import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, Suspense } from 'react';
import { GlitchText } from './GlitchText';
import { Canvas } from '@react-three/fiber';
import { Environment, View, PerspectiveCamera } from '@react-three/drei';
import { ModelProcess1, ModelProcess2, ModelProcess3, ModelProcess4 } from './Models';

const processes = [
  { step: '01', title: 'Synaptic Strategy', text: 'Mapping the digital terrain and identifying high-leverage AI augmentation points. We analyze your matrix.', model: <ModelProcess1 /> },
  { step: '02', title: 'Schema Design', text: 'Architecting the data pipelines and UI/UX flows in pure, unadulterated wireframes. Precision logic.', model: <ModelProcess2 /> },
  { step: '03', title: 'Algorithmic Forge', text: 'Training models, writing the core backend logic, and constructing the matrix. The engine awakens.', model: <ModelProcess3 /> },
  { step: '04', title: 'Liquid Integration', text: 'Fusing the frontend interfaces with the neural backends into a cohesive, pulsating digital entity.', model: <ModelProcess4 /> },
];

export function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Smoother scroll for horizontal movement
  const springScroll = useSpring(scrollYProgress, { stiffness: 400, damping: 50 });
  const x = useTransform(springScroll, [0, 1], ["10%", "-70%"]);
  
  // Parallax for background title
  const titleX = useTransform(springScroll, [0, 1], ["0%", "20%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-obsidian/50 backdrop-blur-sm">
        
        {/* Background Grid that moves counter to scroll */}
        <motion.div 
           className="absolute inset-0 bg-grid opacity-[0.03]"
           style={{ x: useTransform(springScroll, [0, 1], ["0%", "-10%"]) }}
        />

        {/* Title layer with Parallax */}
        <motion.div style={{ x: titleX }} className="absolute top-32 left-10 md:left-32 z-20 pointer-events-none">
          <h2 className="text-6xl md:text-[10rem] font-display font-bold text-white/[0.02] tracking-tighter mix-blend-screen">
            THE ENGINE
          </h2>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-[300px] items-center pb-20">
          {processes.map((proc, index) => {
             // Calculate individual card scale/opacity based on scroll
             // This is an approximation since we are faking horizontal scroll via vertical
             const cardActivePoint = index * 0.25;
             const cardScale = useTransform(springScroll, 
                [cardActivePoint - 0.2, cardActivePoint, cardActivePoint + 0.2], 
                [0.8, 1, 0.8]
             );
             const cardBlur = useTransform(springScroll, 
                [cardActivePoint - 0.2, cardActivePoint, cardActivePoint + 0.2], 
                ["blur(10px)", "blur(0px)", "blur(10px)"]
             );
             const cardOpacity = useTransform(springScroll, 
                [cardActivePoint - 0.2, cardActivePoint, cardActivePoint + 0.2], 
                [0.3, 1, 0.3]
             );
             
             // Liquid fill effect for numbers
             const fillHeight = useTransform(springScroll,
               [cardActivePoint - 0.1, cardActivePoint + 0.1],
               ["100%", "0%"]
             );

            return (
              <motion.div 
                key={proc.step}
                className="relative w-[350px] md:w-[500px] shrink-0 group interactive"
                style={{ scale: cardScale, filter: cardBlur, opacity: cardOpacity }}
              >
                {/* 3D Visualizer underneath */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none translate-y-[-20%] scale-150 mix-blend-screen">
                   <View className="absolute inset-0 w-full h-full">
                     <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                     <Suspense fallback={null}>
                       {proc.model}
                       <Environment preset="city" />
                     </Suspense>
                   </View>
                </div>

                {/* Large Background Number with Liquid Fill */}
                <div className="text-[120px] md:text-[180px] font-mono font-bold leading-none absolute -top-24 md:-top-32 -left-10 md:-left-16 transition-colors duration-700 pointer-events-none select-none">
                   {/* Base Outline Number */}
                   <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.05)' }}>
                     {proc.step}
                   </span>
                   {/* Liquid Fill Overlay */}
                   <div className="absolute inset-0 overflow-hidden" style={{ top: 0 }}>
                      <motion.div 
                         className="w-full h-full bg-obsidian absolute top-0"
                         style={{ height: fillHeight }}
                      />
                      <span className="text-cyan-glow/20 mix-blend-screen glitch-text-shadow">
                        {proc.step}
                      </span>
                   </div>
                </div>

                <div className="glass-panel p-10 md:p-14 rounded-[2rem] relative z-10 transition-all duration-500 border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-obsidian/80 backdrop-blur-xl">
                  {/* Glowing header bar */}
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-2 h-2 rounded-full bg-cyan-glow shadow-[0_0_10px_#00F4FF] animate-pulse" />
                     <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-glow to-violet-glow opacity-50" />
                     <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Phase</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">
                    {index === 0 || index === 2 ? <GlitchText text={proc.title}/> : proc.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-sans text-lg">
                    {proc.text}
                  </p>
                </div>
                
                {/* Connecting line */}
                {index !== processes.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-32 w-32 h-[1px] bg-white/[0.05]">
                    <div className="w-full h-full bg-gradient-to-r from-cyan-glow/0 via-cyan-glow/50 to-transparent shadow-[0_0_10px_rgba(0,244,255,0.5)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
