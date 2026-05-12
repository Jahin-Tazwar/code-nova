import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleElementsHover = () => {
      const interactables = document.querySelectorAll('button, a, input, textarea, select, .interactive, .cursor-pointer, .cursor-none, canvas');
      
      const setHover = () => setIsHovering(true);
      const removeHover = () => setIsHovering(false);

      interactables.forEach((el) => {
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', removeHover);
      });

      return () => {
        interactables.forEach((el) => {
          el.removeEventListener('mouseenter', setHover);
          el.removeEventListener('mouseleave', removeHover);
        });
      };
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Slight delay to ensure elements are mounted
    const cleanupInteractions = setTimeout(handleElementsHover, 100);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(cleanupInteractions);
    };
  }, [cursorX, cursorY]);

  if (isHidden) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center"
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
        
        {/* Outer Ring */}
        <motion.div
          className="w-10 h-10 border border-white/50 rounded-full absolute"
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? 'rgba(0, 244, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
            borderWidth: isHovering ? '2px' : '1px'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-cyan-glow" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-cyan-glow" />
           <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-cyan-glow" />
           <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-cyan-glow" />
        </motion.div>
      </motion.div>
    </>
  );
}
