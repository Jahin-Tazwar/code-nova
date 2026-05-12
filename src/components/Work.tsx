import { motion, useScroll } from 'motion/react';
import { useRef, Suspense } from 'react';
import { TiltCard } from './TiltCard';
import { ArrowUpRight } from 'lucide-react';
import { MagneticElement } from './MagneticElement';
import { GlitchText } from './GlitchText';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, View, PerspectiveCamera } from '@react-three/drei';
import { ModelNebula, ModelAura, ModelOmni } from './Models';

const works = [
  {
    id: '01',
    title: 'Project Nebula',
    type: 'Predictive Infrastructure',
    desc: 'A decentralized neural network designed for instant, high-frequency data validation protocols. Scaled to over 10M events/sec.',
    color: 'from-cyan-glow to-blue-600',
    textGradient: 'text-cyan-glow',
    model: <ModelNebula />
  },
  {
    id: '02',
    title: 'Aura Sync',
    type: 'Workflow Automation',
    desc: 'Bridging disparate legacy systems into a singular, fluid intelligence stream. Complete digital transformation and lifecycle management.',
    color: 'from-violet-glow to-purple-600',
    textGradient: 'text-violet-glow',
    model: <ModelAura />
  },
  {
    id: '03',
    title: 'Omni Terminal',
    type: 'Full-Stack Interface',
    desc: 'A high-motion, 3D command center built to monitor global edge-node deployments in real-time, rendered purely in WebGL.',
    color: 'from-blue-400 to-indigo-600',
    textGradient: 'text-blue-400',
    model: <ModelOmni />
  }
];

export function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="py-40 relative z-10 max-w-7xl mx-auto px-6 overflow-hidden">
       <div className="mb-32 text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tighter"
          >
            The <span className="text-gradient">Archives</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-mono text-sm max-w-xl mx-auto uppercase tracking-widest mix-blend-screen"
          >
            Deployed Constructs & Work
          </motion.p>
       </div>

       <div className="flex flex-col gap-40">
          {works.map((work, idx) => (
             <motion.div
               key={work.id}
               initial={{ opacity: 0, y: 150 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-20%" }}
               transition={{ duration: 1, type: "spring", bounce: 0.2 }}
               className={`flex flex-col md:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
             >
                {/* Visual Side */}
                <div className="w-full md:w-1/2">
                   <TiltCard className="w-full aspect-[4/3] rounded-[2.5rem] p-1 relative group cursor-none">
                      {/* Outer Glass Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-20 group-hover:opacity-60 transition-opacity duration-1000 blur-3xl rounded-3xl`} />
                      
                      {/* Inner Card */}
                      <div className="relative w-full h-full glass-panel rounded-[2.3rem] overflow-hidden flex items-center justify-center border-white/[0.05] group-hover:border-white/30 transition-all duration-700 bg-obsidian/60 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                         
                         {/* 3D Model Canvas */}
                         <div className="absolute inset-0 z-0">
                           <View className="absolute inset-0 w-full h-full">
                             <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
                             <Suspense fallback={null}>
                               {work.model}
                               <Environment preset="city" />
                             </Suspense>
                             <OrbitControls 
                               enableZoom={true} 
                               enablePan={false} 
                               autoRotate 
                               autoRotateSpeed={0.5} 
                             />
                           </View>
                         </div>
                         
                         {/* Gradients and Grid Overlay */}
                         <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply pointer-events-none" />
                         <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80 pointer-events-none" />
                         <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />
                         
                         <motion.div
                           className={`absolute w-64 h-64 rounded-full blur-[60px] bg-gradient-to-tr ${work.color} opacity-30 mix-blend-screen pointer-events-none`}
                           style={{ transform: 'translateZ(10px)' }}
                           animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                         />
                         
                         {/* The "Screen" / Data visualization overlay */}
                         <div 
                           className="absolute inset-8 border border-white/10 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col overflow-hidden shadow-2xl group-hover:shadow-[0_0_50px_rgba(0,244,255,0.15)] transition-shadow duration-700 pointer-events-none"
                           style={{ transform: 'translateZ(50px)' }}
                         >
                            {/* Glitch Overlay on Hover */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 mix-blend-screen transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                            <div className="flex justify-between items-center p-4 border-b border-white/[0.05] bg-black/40">
                               <div className="flex gap-2">
                                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                               </div>
                               <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80 animate-pulse">{work.id} // SECONDS</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-end gap-3 p-6 opacity-80 bg-gradient-to-t from-black/80 to-transparent">
                               <div className="h-0.5 w-[90%] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                               <div className="h-0.5 w-[60%] bg-gradient-to-r from-transparent via-cyan-glow/80 to-transparent rounded-full shadow-[0_0_10px_#00F4FF]" />
                               <div className="h-0.5 w-[80%] bg-gradient-to-r from-transparent via-violet-glow/80 to-transparent rounded-full shadow-[0_0_10px_#8A2BE2]" />
                            </div>
                         </div>
                      </div>
                   </TiltCard>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 space-y-8 md:px-10">
                   <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase">
                      <span className={`${work.textGradient}`}>{work.id}</span>
                      <span className="w-12 h-[1px] bg-white/20" />
                      <span className="text-gray-500">{work.type}</span>
                   </div>
                   <h3 className="text-5xl md:text-6xl font-display font-bold">
                      <GlitchText text={work.title} />
                   </h3>
                   <p className="text-gray-400 font-sans text-xl leading-relaxed max-w-lg mix-blend-screen">
                      {work.desc}
                   </p>
                   
                   <MagneticElement strength={0.2} className="inline-block mt-4">
                     <button className="interactive group flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 hover:border-cyan-glow/50 bg-white/5 hover:bg-white/10 transition-all text-sm font-mono tracking-widest uppercase text-white hover:text-cyan-glow shadow-lg hover:shadow-[0_0_20px_rgba(0,244,255,0.2)]">
                        <span className="relative">
                           Deploy Logic
                        </span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </button>
                   </MagneticElement>
                </div>
             </motion.div>
          ))}
       </div>
    </section>
  );
}
