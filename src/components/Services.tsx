import { motion, useScroll, useTransform, Variants } from 'motion/react';
import { Cpu, Network, Code2, Database } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, View, PerspectiveCamera } from '@react-three/drei';
import { ModelNeural, ModelDecentralized, ModelAlgorithmic, ModelData } from './Models';

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, filter: "blur(5px)", rotateX: 20 },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  return (
    <section ref={ref} className="py-32 relative z-10 max-w-7xl mx-auto px-6">
      
      {/* Background floating elements for parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
           className="absolute top-1/4 left-10 w-64 h-64 border-[0.5px] border-cyan-glow/30 rounded-full"
           style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]), rotateX: 60, rotateY: 45 }}
           animate={{ rotateZ: 360 }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
           className="absolute bottom-1/4 right-10 w-96 h-96 border-[0.5px] border-violet-glow/30 shadow-[0_0_50px_rgba(138,43,226,0.1)] rounded-full"
           style={{ y: useTransform(scrollYProgress, [0, 1], [0, -600]), rotateX: 70, rotateZ: 45 }}
           animate={{ rotateY: 360 }}
           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
           className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-glow/5 rounded-full blur-[30px]"
           style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        />
      </div>

      <div className="mb-20 text-center relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        >
          The <span className="text-gradient">Suite</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 font-mono text-sm max-w-xl mx-auto uppercase tracking-widest"
        >
          Comprehensive neural & digital architectures
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] [perspective:1000px]"
      >
        {/* Main large card */}
        <motion.div variants={itemVariants} className="md:col-span-2 h-full">
           <TiltCard className="interactive glass-panel rounded-3xl p-10 relative overflow-hidden group hover:border-cyan-glow/50 transition-colors duration-500 h-full w-full">
              <div className="absolute top-0 right-0 w-80 h-80 opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                <View className="absolute inset-0 w-full h-full">
                  <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                  <Suspense fallback={null}>
                    <ModelNeural />
                    <Environment preset="city" />
                  </Suspense>
                </View>
              </div>
              <div className="relative z-10 w-2/3 h-full flex flex-col justify-end pointer-events-none">
                <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6">
                  <Cpu className="text-cyan-glow" size={32} />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">AI Agents & LLMs</h3>
                <p className="text-gray-400 max-w-md">Custom sentient-like architectures that reason, plan, and execute within your enterprise bounded context.</p>
              </div>
           </TiltCard>
        </motion.div>

        {/* Square card */}
        <motion.div variants={itemVariants} className="h-full">
           <TiltCard className="interactive glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-violet-glow/50 transition-colors duration-500 h-full w-full flex flex-col">
              <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                 <View className="absolute inset-0 w-full h-full">
                   <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                   <Suspense fallback={null}>
                     <ModelDecentralized />
                     <Environment preset="city" />
                   </Suspense>
                 </View>
              </div>
              <div className="relative z-10 flex-1 flex flex-col justify-end pointer-events-none">
                <h3 className="text-2xl font-display font-bold mb-3">Workflow Automations</h3>
                <p className="text-sm text-gray-400">Deep, structural mechanical flow design.</p>
              </div>
           </TiltCard>
        </motion.div>

        {/* Square card 2 */}
        <motion.div variants={itemVariants} className="h-full">
           <TiltCard className="interactive glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-white/30 transition-colors duration-500 h-full w-full">
              <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                 <View className="absolute inset-0 w-full h-full">
                   <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                   <Suspense fallback={null}>
                     <ModelAlgorithmic />
                     <Environment preset="city" />
                   </Suspense>
                 </View>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end pointer-events-none">
                <h3 className="text-2xl font-display font-bold mb-3">Full-Stack Dev</h3>
                <p className="text-sm text-gray-400">Liquid-smooth interfaces and unyielding backends.</p>
              </div>
           </TiltCard>
        </motion.div>

        {/* Medium card */}
        <motion.div variants={itemVariants} className="md:col-span-2 h-full">
           <TiltCard className="interactive glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-glow/30 transition-colors duration-500 flex items-center h-full w-full">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-80 h-80 opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                 <View className="absolute inset-0 w-full h-full">
                   <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                   <Suspense fallback={null}>
                     <ModelData />
                     <Environment preset="city" />
                   </Suspense>
                 </View>
              </div>
              <div className="relative z-10 flex gap-8 items-center w-full md:w-2/3 pointer-events-none">
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center mb-6">
                    <Database className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Data Infrastructure</h3>
                  <p className="text-gray-400 mb-6">Vector databases and deep pipelines to fuel your AI initiatives with clean text, image, and structured data.</p>
                  <button className="text-xs font-mono text-cyan-glow hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 interactive pointer-events-auto">
                    Learn More <span className="text-lg leading-none">&rarr;</span>
                  </button>
                </div>
              </div>
           </TiltCard>
        </motion.div>

      </motion.div>
    </section>
  );
}
