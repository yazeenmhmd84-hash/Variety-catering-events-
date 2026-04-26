import React, { useState, useRef, useEffect, ReactNode, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'motion/react';
import { Sparkles } from 'lucide-react';

const TiltContext = createContext<{ x: MotionValue<number>, y: MotionValue<number> } | null>(null);

export const useTilt = () => useContext(TiltContext);

export const HeadingGlint = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  return (
    <span className={`relative inline-block overflow-hidden group ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.div
        animate={{
          left: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
      />
    </span>
  );
};

export const GoldGlossyText = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <span className={`relative inline-block overflow-hidden group py-1 ${className}`}>
      {/* Sparkling Background */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 bg-amber-100 blur-[0.5px]"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
            />
          ))}
        </div>
      )}

      <motion.span 
        className={`relative z-10 bg-clip-text text-transparent block ${className} ${className.includes('bg-gradient') ? '' : 'bg-gradient-to-b from-amber-100 via-amber-400 to-amber-700'}`}
        style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
      >
        {children}
      </motion.span>
      
      <motion.div
        animate={{
          left: ['-150%', '250%'],
        }}
        transition={{
          duration: isMobile ? 6 : 4,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "linear",
        }}
        className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-35deg] pointer-events-none z-20"
      />
      
      {!isMobile && <div className="absolute inset-x-0 bottom-0 h-[2px] bg-amber-500/30 blur-[4px] rounded-full pointer-events-none" />}
    </span>
  );
};

export const CinematicSpotlight = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-soft-light opacity-30">
      <motion.div
        animate={{ 
          x: ["-20%", "20%"],
          y: ["-10%", "10%"]
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] blur-[100px]"
      />
    </div>
  );
};

export const SectionWarp = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.99, 1, 0.99]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        scale: isMobile ? 1 : scale,
        perspective: "2000px",
        transformStyle: "preserve-3d"
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export const CinematicParallax = ({ children, strength = 50, direction = 1 }: { children: ReactNode, strength?: number, direction?: 1 | -1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yValue = useTransform(scrollYProgress, [0, 1], [strength * direction, -strength * direction]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : yValue }} 
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export const InteractiveOrbit = ({ children, radius = 100, duration = 20, reverse = false }: { children: ReactNode, radius?: number, duration?: number, reverse?: boolean }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const orbitDuration = isMobile ? duration * 1.5 : duration;

  return (
    <motion.div
      animate={{ 
        rotate: reverse ? -360 : 360,
      }}
      transition={{ 
        duration: orbitDuration, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute flex items-center justify-center will-change-transform"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div 
        className="absolute" 
        style={{ 
          transform: `translateX(${radius}px)`,
          rotate: reverse ? 360 : -360 
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export const MagneticWrapper = ({ children, strength = 0.2, className = "" }: { children: ReactNode, strength?: number, key?: string | number, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SubtleHover = ({ children, className = "" }: { children: ReactNode, className?: string, key?: React.Key }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealOnScroll = ({ children, delay = 0, y = 20, className = "", direction = "up" }: { children: ReactNode, delay?: number, y?: number, key?: React.Key, className?: string, direction?: "up" | "down" | "left" | "right" }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const getInitial = () => {
    if (isMobile) return { opacity: 0, y: 15 };
    switch(direction) {
      case 'left': return { opacity: 0, x: y };
      case 'right': return { opacity: 0, x: -y };
      case 'down': return { opacity: 0, y: -y };
      case 'up':
      default: return { opacity: 0, y };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
      transition={{ 
        duration: isMobile ? 0.6 : 0.8, 
        delay: isMobile ? delay * 0.5 : delay, 
        ease: "easeOut" 
      }}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const LetterReveal = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const letters = text.split("");
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.03 : 0.08, 
        delayChildren: delay + 0.04 * i 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: isMobile ? 10 : 20,
      filter: isMobile ? "blur(4px)" : "blur(10px)",
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const BlurReveal = ({ children, delay = 0, duration = 1.2 }: { children: ReactNode, delay?: number, duration?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export const TiltLogo = ({ children }: { children: ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Subtle rotation values
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <TiltContext.Provider value={{ x, y }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className="relative flex items-center justify-center transition-transform duration-200"
      >
        <div style={{ transform: "translateZ(50px)" }} className="relative">
          {children}
        </div>
      </motion.div>
    </TiltContext.Provider>
  );
};

export const TiltParallax = ({ children, strength = 20, className = "" }: { children: ReactNode, strength?: number, className?: string }) => {
  const tilt = useTilt();
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const x = useTransform(tilt?.x || fallbackX, [-0.5, 0.5], [strength, -strength]);
  const y = useTransform(tilt?.y || fallbackY, [-0.5, 0.5], [strength, -strength]);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  return (
    <motion.div style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.div>
  );
};

export const FloatingParticles = ({ count = 20, color = "rgba(245, 158, 11, 0.3)" }: { count?: number, color?: string }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? Math.floor(count / 4) : count;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -80 - Math.random() * 80, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: isMobile ? 10 + Math.random() * 12 : 5 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 rounded-full blur-[0.5px] will-change-transform"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const ButterflyEffect = ({ color = "#f59e0b", className = "" }: { color?: string, className?: string }) => {
  return (
    <motion.div
      animate={{
        x: [0, 100, 200, 150, 50, 0],
        y: [0, -50, -100, -150, -100, -50, 0],
        rotateX: [0, 150, 300, 150, 0],
        rotateY: [0, 150, 300, 150, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`absolute pointer-events-none ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div className="relative flex">
        {/* Left Wing */}
        <motion.div
          animate={{ rotateY: [0, 80, 0] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="w-6 h-10 rounded-full origin-right"
          style={{ 
            backgroundColor: color,
            clipPath: "polygon(100% 50%, 0 0, 20% 50%, 0 100%)",
            opacity: 0.8
          }}
        />
        {/* Right Wing */}
        <motion.div
          animate={{ rotateY: [0, -80, 0] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="w-6 h-10 rounded-full origin-left"
          style={{ 
            backgroundColor: color,
            clipPath: "polygon(0 50%, 100% 0, 80% 50%, 100% 100%)",
            opacity: 0.8
          }}
        />
      </div>
    </motion.div>
  );
};
