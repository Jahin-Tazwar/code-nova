import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 right-0 w-1 h-full bg-cyan-glow/20 z-[100] origin-top mix-blend-screen pointer-events-none"
      style={{ scaleY }}
    >
      <motion.div className="w-full h-full bg-cyan-glow blur-[2px] shadow-[0_0_10px_#00F4FF]" />
    </motion.div>
  );
}
