import { motion } from 'motion/react';
import { SendHorizontal } from 'lucide-react';
import { MagneticElement } from './MagneticElement';
import { GlitchText } from './GlitchText';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, View, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { ModelContact } from './Models';

export function Contact() {
  return (
    <section className="min-h-screen relative flex items-center justify-center py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <View className="absolute inset-0 w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <Suspense fallback={null}>
            <ModelContact />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            <Environment preset="city" />
          </Suspense>
        </View>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center pointer-events-none">
        
        <div className="flex-1 space-y-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-4">
              Open a <br/>
              <GlitchText text="Channel." className="text-gradient-violet" />
            </h2>
            <p className="text-gray-300 max-w-md font-sans leading-relaxed text-lg">
              Ready to transcend legacy systems? Initiate contact and our architects will align with your vision.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="flex flex-col gap-6 font-mono text-sm"
          >
             <div className="flex items-center gap-4 text-gray-400 group">
                <span className="w-12 h-[1px] bg-gray-700 group-hover:bg-cyan-glow transition-colors" />
                <a href="mailto:transmission@novatech.io" className="hover:text-white transition-colors interactive drop-shadow-[0_0_10px_rgba(0,244,255,0)] group-hover:drop-shadow-[0_0_10px_rgba(0,244,255,0.5)]">transmission@novatech.io</a>
             </div>
             <div className="flex items-center gap-4 text-gray-400 group">
                <span className="w-12 h-[1px] bg-gray-700 group-hover:bg-violet-glow transition-colors" />
                <span className="group-hover:text-white transition-colors">Sector 0x7A, San Francisco</span>
             </div>
          </motion.div>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          className="flex-1 w-full glass-panel rounded-[2rem] p-8 space-y-6 relative overflow-hidden group/form shadow-[0_20px_50px_rgba(0,0,0,0.5)] [perspective:1000px] pointer-events-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-violet-glow/10 opacity-0 group-focus-within/form:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <label className="text-[10px] font-mono text-cyan-glow uppercase tracking-[0.2em] pl-4">Signature / Name</label>
            <input 
              type="text" 
              className="w-full interactive bg-white/[0.02] border border-white/5 rounded-full px-6 py-4 outline-none focus:border-cyan-glow/50 focus:bg-white/[0.05] transition-all text-white font-sans focus:shadow-[0_0_20px_rgba(0,244,255,0.1)]"
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2 relative z-10">
            <label className="text-[10px] font-mono text-cyan-glow uppercase tracking-[0.2em] pl-4">Comms Link / Email</label>
            <input 
              type="email" 
              className="w-full interactive bg-white/[0.02] border border-white/5 rounded-full px-6 py-4 outline-none focus:border-violet-glow/50 focus:bg-white/[0.05] transition-all text-white font-sans focus:shadow-[0_0_20px_rgba(138,43,226,0.1)]"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2 relative z-10">
            <label className="text-[10px] font-mono text-cyan-glow uppercase tracking-[0.2em] pl-4">Directive / Message</label>
            <textarea 
              rows={4}
              className="w-full interactive bg-white/[0.02] border border-white/5 rounded-3xl px-6 py-4 outline-none focus:border-cyan-glow/50 focus:bg-white/[0.05] transition-all text-white font-sans resize-none focus:shadow-[0_0_20px_rgba(0,244,255,0.1)]"
              placeholder="Describe your architecture..."
            />
          </div>

          <MagneticElement className="w-full block" strength={0.2}>
            <button className="interactive relative z-10 w-full py-4 bg-white text-obsidian font-bold rounded-full overflow-hidden group/btn hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              <span className="relative z-10 font-mono uppercase tracking-widest text-sm">Transmit Logic</span>
              <SendHorizontal size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-glow/100 to-violet-glow/100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen" />
              <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] translate-x-[-50px] group-hover/btn:translate-x-[0px] opacity-0 group-hover/btn:opacity-30 transition-transform duration-[2s] pointer-events-none" />
            </button>
          </MagneticElement>
        </motion.form>
      </div>
    </section>
  );
}
