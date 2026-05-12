import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Smooth mouse follow using useMotionValue and useSpring
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Custom spring configurations for different layers
  const springConfigDot = { damping: 25, stiffness: 400, mass: 0.5 };
  const springConfigRing = { damping: 20, stiffness: 150, mass: 0.8 };
  const springConfigGlow = { damping: 50, stiffness: 200, mass: 1.5 };
  
  const cursorXSpring = useSpring(cursorX, springConfigDot);
  const cursorYSpring = useSpring(cursorY, springConfigDot);
  
  const ringXSpring = useSpring(cursorX, springConfigRing);
  const ringYSpring = useSpring(cursorY, springConfigRing);
  
  const glowXSpring = useSpring(cursorX, springConfigGlow);
  const glowYSpring = useSpring(cursorY, springConfigGlow);

  useEffect(() => {
    // Add a custom style to the main html to hide the default cursor
    document.documentElement.style.cursor = 'none';

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
         target.closest('button') || 
         target.closest('a') || 
         target.closest('.interactive') ||
         target.closest('input') ||
         target.closest('textarea')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.style.cursor = 'auto'; // Cleanup
    };
  }, [cursorX, cursorY, isHidden]);

  if (isHidden) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Core Dot */}
        <motion.div 
          className="w-1.5 h-1.5 bg-white rounded-full absolute"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Crosshair accents */}
        <motion.div 
           className="absolute inset-0"
           animate={{
              opacity: isHovering ? 1 : 0,
              rotate: isHovering ? 45 : 0
           }}
           transition={{ duration: 0.3 }}
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-cyan-glow shadow-[0_0_8px_#00F4FF]" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-cyan-glow shadow-[0_0_8px_#00F4FF]" />
           <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-cyan-glow shadow-[0_0_8px_#00F4FF]" />
           <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-cyan-glow shadow-[0_0_8px_#00F4FF]" />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-[60px] h-[60px] rounded-full pointer-events-none z-[99] hidden md:flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
      >
          {/* Outer Ring */}
          <motion.div
            className="absolute w-full h-full border rounded-full"
            animate={{
              scale: isHovering ? 1.4 : 1,
              borderColor: isHovering ? 'rgba(0, 244, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)',
              borderWidth: isHovering ? '2px' : '1px',
              backgroundColor: isHovering ? 'rgba(0, 244, 255, 0.05)' : 'transparent',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />

          {/* Dotted target circle when hovering */}
          <motion.div
             className="absolute w-[120%] h-[120%] rounded-full border border-dashed border-cyan-glow/40"
             animate={{
                opacity: isHovering ? 1 : 0,
                rotate: isHovering ? 90 : 0
             }}
             transition={{ duration: 0.4 }}
          />
      </motion.div>

      {/* Massive soft ambient glow tracking behind cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-violet-glow/5 blur-[120px] rounded-full pointer-events-none z-[0] hidden md:block translate-x-[-50%] translate-y-[-50%]"
        style={{
          x: glowXSpring,
          y: glowYSpring,
        }}
      />
    </>
  );
}
