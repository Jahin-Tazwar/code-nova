import { useState, useEffect, useRef } from "react";

export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clip1, setClip1] = useState("");
  const [clip2, setClip2] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8 || isHovered) {
        setIsGlitching(true);
        // Randomize slices
        setClip1(`inset(${Math.floor(Math.random() * 50)}% 0 ${Math.floor(Math.random() * 50)}% 0)`);
        setClip2(`inset(${Math.floor(Math.random() * 50)}% 0 ${Math.floor(Math.random() * 50)}% 0)`);
        
        timeout = setTimeout(() => setIsGlitching(false), 50 + Math.random() * 150);
      }
    }, isHovered ? 150 : 2000);
    return () => {
      clearInterval(glitchInterval);
      clearTimeout(timeout);
    };
  }, [isHovered]);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsGlitching(false); }}
    >
      <span className={`relative z-10 ${className}`}>{text}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-[3px] -z-10 text-cyan-glow mix-blend-screen opacity-80" 
            style={{ clipPath: clip1 }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 -left-[3px] -z-10 text-violet-glow mix-blend-screen opacity-80" 
            style={{ clipPath: clip2 }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}
