import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useRef } from 'react';

export function MagneticElement({ 
  children, 
  className = '',
  strength = 0.3
}: { 
  children: React.ReactNode, 
  className?: string,
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX * strength);
    y.set(mouseY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
       ref={ref}
       onMouseMove={handleMouseMove}
       onMouseLeave={handleMouseLeave}
       style={{ x: springX, y: springY }}
       className={`inline-block ${className}`}
    >
       {children}
    </motion.div>
  );
}
