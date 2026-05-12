import { motion, useScroll, useTransform, Variants } from 'motion/react';
import { NovaSphere } from './NovaSphere';
import { useRef } from 'react';
import { MagneticElement } from './MagneticElement';
import { GlitchText } from './GlitchText';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity1 = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const filter1 = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  // Text reveal animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
  };
  
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
  };

  const title = "Engineering the".split(" ");

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 [perspective:1000px]">
      <motion.div 
         style={{ y: y2, opacity: opacity1, filter: filter1 }}
         className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <NovaSphere />
      </motion.div>
      
      <motion.div 
         style={{ y: y1, opacity: opacity2 }}
         className="relative z-10 text-center max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center mt-32"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel mb-8 border-cyan-glow/30 text-sm font-mono text-cyan-glow shadow-[0_0_20px_rgba(0,244,255,0.1)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-glow/10 to-violet-glow/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow shadow-[0_0_10px_#00F4FF] animate-pulse" />
          <GlitchText text="SYSTEMS ONLINE_" />
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6 leading-tight flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex gap-4 overflow-hidden py-2" style={{ transformStyle: 'preserve-3d' }}>
            {title.map((word, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block drop-shadow-2xl">
                <GlitchText text={word} />
              </motion.span>
            ))}
          </div>
          <motion.div 
             className="relative"
             variants={letterVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-white to-violet-glow drop-shadow-[0_0_30px_rgba(0,244,255,0.4)]">
              Autonomous
            </span>{' '}
            <span className="drop-shadow-2xl text-white">Future.</span>
          </motion.div>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-400 font-sans max-w-2xl mb-12 mix-blend-screen"
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1 }}
        >
          We build end-to-end AI ecosystems. From predictive neural architectures to 
          liquid-smooth full-stack interfaces, we manifest the next era of tech.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 relative z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
        >
          <MagneticElement strength={0.4}>
            <button className="interactive group relative px-8 py-4 bg-white text-obsidian font-semibold rounded-full overflow-hidden transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(0,244,255,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-glow to-violet-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />
              <div className="absolute inset-0 block bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <span className="relative z-10 group-hover:text-obsidian transition-colors duration-500">INITIATE_PROJECT</span>
            </button>
          </MagneticElement>
          
          <MagneticElement strength={0.2}>
            <button className="interactive px-8 py-4 glass-panel rounded-full font-mono text-sm hover:text-cyan-glow transition-all duration-300 hover:border-cyan-glow/50 flex items-center gap-3 group relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-glow/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Explore Matrix</span> 
              <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">-&gt;</span>
            </button>
          </MagneticElement>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 mix-blend-screen"
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-glow via-violet-glow to-transparent shadow-[0_0_10px_#00F4FF]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-glow">Descend</span>
      </motion.div>
    </section>
  );
}
