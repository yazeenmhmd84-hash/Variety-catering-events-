import { useState, useMemo, useEffect, useRef, ReactNode, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView, animate, useMotionValueEvent } from 'motion/react';
import { 
  Trophy,
  Medal,
  Clock, 
  ChevronDown,
  ChevronRight,
  ArrowUp,
  X,
  Plus,
  Menu,
  MessageCircle,
  ImageOff,
  Sparkles,
  Heart,
  Home,
  PartyPopper,
  Briefcase,
  Award,
  Star
} from 'lucide-react';
import { OCCASIONS, AWARDS, PHILOSOPHY_QUOTES } from './constants';
import { Occasion } from './types';
import { HeadingGlint, MagneticWrapper, GoldGlossyText, CinematicSpotlight, SectionWarp, CinematicParallax, InteractiveOrbit, SubtleHover, RevealOnScroll, LetterReveal, FloatingParticles, TiltLogo, TiltParallax, BlurReveal, ButterflyEffect } from './components/AnimationWrappers';
import { FlavorJourney } from './components/FlavorJourney';
import { ContactSection } from './components/ContactSection';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const AwardsSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -50] : [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 30] : [0, 100]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 5] : [0, 15]);

  return (
    <SectionWarp>
      <section ref={sectionRef} aria-labelledby="awards-heading" className="py-24 md:py-64 px-6 relative overflow-hidden bg-[#050505]">
        {/* Cinematic Backdrop Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,30,1)_0%,transparent_100%)] opacity-40" />
          <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-30">
            <GoldenLeafDrift count={isMobile ? 5 : 25} />
          </motion.div>
          
          <FloatingParticles count={isMobile ? 10 : 30} color="rgba(245, 158, 11, 0.1)" />
          
          {/* Drifting Bokeh */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`bokeh-${i}`}
              animate={{
                x: [0, (i % 2 === 0 ? 100 : -100), 0],
                y: [0, (i % 3 === 0 ? 150 : -50), 0],
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + (i % 3) * 30}%`
              }}
            />
          ))}
        </div>
        
        {/* Parallax Background Marker */}
        {!isMobile && (
          <motion.div style={{ y: y2, rotate: rotateValue }} className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-50">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-amber-500/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-40">
            <RevealOnScroll>
              <div className="flex flex-col items-center gap-12">
                <div className="flex items-center gap-6">
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 80, opacity: 1 }}
                    className="h-px bg-gradient-to-r from-transparent to-amber-500" 
                  />
                  <span className="text-amber-500 font-black uppercase tracking-[1em] text-[10px] whitespace-nowrap">Excellence Benchmarks</span>
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 80, opacity: 1 }}
                    className="h-px bg-gradient-to-l from-transparent to-amber-500" 
                  />
                </div>
                
                <div className="relative group">
                  <motion.div 
                    animate={{ 
                      scale: [0.95, 1.1, 0.95], 
                      opacity: [0.2, 0.5, 0.2],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -inset-40 bg-amber-500/10 blur-[150px] rounded-full -z-10"
                  />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none mix-blend-overlay" />
                  
                  <h2 id="awards-heading" className="text-6xl md:text-[13rem] font-display font-medium leading-[0.8] tracking-tight uppercase relative">
                    <GoldGlossyText className="block mb-4">
                      <LetterReveal text="Honours &" />
                    </GoldGlossyText>
                    <div className="flex items-center justify-center gap-10">
                      <motion.div 
                        animate={{ width: [0, 100, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent hidden md:block" 
                      />
                      <GoldGlossyText className="block tracking-tighter italic">
                        <LetterReveal text="Recognitions" delay={0.5} />
                      </GoldGlossyText>
                      <motion.div 
                        animate={{ width: [0, 100, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                        className="h-1 bg-gradient-to-l from-transparent via-amber-500 to-transparent hidden md:block" 
                      />
                    </div>
                  </h2>
                </div>

                <div className="max-w-4xl space-y-6">
                  <p className="text-gray-400 text-2xl md:text-5xl font-display italic leading-tight tracking-tight px-10">
                    "രുചി ഒരു പാരമ്പര്യമാണ്, ആ പാരമ്പര്യത്തിന് ലഭിച്ച വലിയ അംഗീകാരങ്ങൾ."
                  </p>
                  <div className="flex items-center justify-center gap-4 opacity-40">
                    <div className="w-12 h-px bg-white/20" />
                    <Sparkles size={16} className="text-amber-500" />
                    <div className="w-12 h-px bg-white/20" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div role="list" className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {AWARDS.map((award, i) => (
              <RevealOnScroll key={award.id} delay={i * 0.2} y={50}>
                <TiltLogo>
                  <motion.div
                    role="listitem"
                    tabIndex={0}
                    className="group relative flex flex-col bg-zinc-950/40 border border-white/5 rounded-[4rem] backdrop-blur-3xl overflow-hidden hover:border-amber-500/30 transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.8)] transform-style-3d cursor-default"
                  >
                    {/* Visual Section - The "Stage" */}
                    <div className="relative aspect-[16/10] overflow-hidden p-8">
                       <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden group/img-cont shadow-inner border border-white/10">
                          <motion.img 
                            src={award.image} 
                            alt={award.title}
                            className="w-full h-full object-cover grayscale-[0.5] group-hover/img-cont:grayscale-0 group-hover/img-cont:scale-110 transition-all duration-1000"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          
                          {/* Inner Cinematic Light Sweep */}
                          <motion.div
                            animate={{ left: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-45deg] pointer-events-none"
                          />

                          {/* 3D Floating Icon */}
                          <TiltParallax strength={40} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <motion.div 
                               initial={{ scale: 0, opacity: 0 }}
                               whileInView={{ scale: 1, opacity: 1 }}
                               transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 + i * 0.1 }}
                               className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 flex items-center justify-center text-black shadow-[0_0_50px_rgba(245,158,11,0.5)] border-4 border-white/20 relative"
                             >
                               <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20" />
                               {award.type === 'Certificate' && <Award size={isMobile ? 32 : 48} strokeWidth={2.5} />}
                               {award.type === 'Appreciation' && <Medal size={isMobile ? 32 : 48} strokeWidth={2.5} />}
                               {award.type === 'Trophy' && <Trophy size={isMobile ? 32 : 48} strokeWidth={2.5} />}
                               {award.type === 'Star' && <Sparkles size={isMobile ? 32 : 48} strokeWidth={2.5} />}
                             </motion.div>
                          </TiltParallax>

                          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                             <div className="px-6 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-amber-500/30 text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] shadow-2xl">
                                {award.year}
                             </div>
                             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md">
                                <Plus size={16} className="text-white/40" />
                             </div>
                          </div>
                          
                          {/* Corner Accents */}
                          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-amber-500/20 rounded-tl-2xl" />
                          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-amber-500/20 rounded-br-2xl" />
                       </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-12 md:p-16 flex flex-col gap-10">
                      <div className="flex justify-between items-start">
                         <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <span className="w-8 h-px bg-amber-500/40" />
                              <span className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px]">{award.awardedBy}</span>
                           </div>
                           <h3 className="text-3xl md:text-5xl font-display font-medium text-white leading-tight tracking-[0.02em]">
                              <HeadingGlint>{award.title}</HeadingGlint>
                           </h3>
                           <p className="text-xl md:text-2xl font-['Noto_Sans_Malayalam'] font-light italic text-amber-500/60 leading-none">
                              {award.malayalamTitle}
                           </p>
                         </div>
                         <div className="hidden md:block opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award size={64} strokeWidth={1} className="text-amber-500" />
                         </div>
                      </div>

                      <div className="space-y-6 border-l border-white/5 pl-10">
                         <p className="text-gray-400 text-lg leading-relaxed font-light first-letter:text-3xl first-letter:text-amber-500 first-letter:mr-1">
                            {award.description}
                         </p>
                         <p className="text-amber-100/60 text-xl font-['Noto_Sans_Malayalam'] font-light italic leading-loose tracking-wide">
                            {award.malayalamDescription}
                         </p>
                      </div>

                      {/* Interactive Button */}
                      <div className="mt-4">
                         <motion.div 
                           whileHover={{ x: 10 }}
                           className="flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] cursor-pointer group/link"
                         >
                            View Recognition Details 
                            <ChevronRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                         </motion.div>
                      </div>
                    </div>
                    
                    {/* Background Texture/Shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                  </motion.div>
                </TiltLogo>
              </RevealOnScroll>
            ))}
          </div>
          
          {/* Bottom Trust Indicators */}
          <div className="mt-48 flex flex-col items-center gap-16">
             <RevealOnScroll delay={0.5}>
               <div className="relative group">
                 <div className="absolute -inset-10 bg-amber-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 <motion.div 
                   whileHover={{ scale: 1.05 }}
                   className="relative flex flex-col md:flex-row items-center gap-12 px-16 py-10 bg-white/[0.01] border border-white/5 rounded-[4rem] backdrop-blur-2xl transition-all duration-700"
                 >
                   <div className="flex -space-x-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-14 h-14 rounded-full border-2 border-zinc-950 bg-zinc-900 overflow-hidden">
                           <Award size={24} className="m-3.5 text-amber-500 opacity-40" />
                        </div>
                      ))}
                   </div>
                   <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                     <span className="text-white font-display text-4xl leading-none">A Quarter Century of culinary Excellence</span>
                     <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">Trusted by 5000+ Families since 1996</span>
                   </div>
                 </motion.div>
               </div>
             </RevealOnScroll>
          </div>
        </div>
      </section>
    </SectionWarp>
  );
};

const PhilosophyCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isMobile = useIsMobile();

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 150 : 300) : (isMobile ? -150 : -300),
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45,
      z: -500,
      filter: "blur(8px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isMobile ? 150 : 300) : (isMobile ? -150 : -300),
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45,
      z: -500,
      filter: "blur(8px)"
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prevIndex) => (prevIndex + newDirection + PHILOSOPHY_QUOTES.length) % PHILOSOPHY_QUOTES.length);
  };

  return (
    <div className="relative h-[550px] md:h-[700px] w-full flex items-center justify-center perspective-[2000px] mb-20 overflow-visible">
      {/* Background Ambient Glows - Optimized for Mobile */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-amber-500/5 blur-[120px] pointer-events-none" />
      
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 260, damping: 20 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            rotateY: { duration: 0.5, ease: "easeOut" },
            z: { duration: 0.5 },
            filter: { duration: 0.4 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={isMobile ? 0.2 : 0.4}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full max-w-5xl cursor-grab active:cursor-grabbing px-6 z-10"
        >
          <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden group shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-t-white/20">
             {/* Decorative Background Glow */}
             <div className="absolute -inset-20 bg-amber-500/[0.03] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
             
             {/* Textural Accent */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.03] pointer-events-none" />
             
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-700">
                <Sparkles size={isMobile ? 80 : 120} className="text-amber-500" />
             </div>

             {/* Background Interactive Element - Premium Touch */}
             {!isMobile && (
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute -right-32 -top-32 w-96 h-96 border border-amber-500/5 rounded-full pointer-events-none"
               />
             )}
             
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className="flex flex-col gap-8 md:gap-14 text-center md:text-left relative z-10"
             >
                <div className="flex items-center justify-center md:justify-start gap-4">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: 48 }}
                     className="h-px bg-amber-500/40" 
                   />
                   <span className="text-amber-500 font-black uppercase tracking-[0.8em] text-[10px] md:text-[11px] drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                     {PHILOSOPHY_QUOTES[index].depth}
                   </span>
                </div>

                <div className="space-y-8 md:space-y-12">
                  <motion.h3 
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-2xl sm:text-4xl md:text-7xl font-malayalam font-normal italic text-white leading-[1.4] md:leading-tight tracking-tight relative"
                  >
                    <GoldGlossyText className="!py-0">
                      <LetterReveal text={`"${PHILOSOPHY_QUOTES[index].malayalam}"`} />
                    </GoldGlossyText>
                  </motion.h3>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col gap-6 md:gap-8"
                  >
                     <p className="text-base sm:text-xl md:text-[1.75rem] font-malayalam font-medium uppercase tracking-[0.05em] text-gray-400 group-hover:text-amber-100/70 transition-colors duration-700 max-w-4xl mx-auto md:mx-0 leading-relaxed">
                       {PHILOSOPHY_QUOTES[index].quote}
                     </p>
                     <div className="w-12 h-[1px] bg-amber-500/30 mx-auto md:mx-0 group-hover:w-32 transition-all duration-700" />
                     <p className="text-[10px] md:text-[12px] font-malayalam font-bold uppercase tracking-[0.4em] text-amber-500/40 group-hover:text-amber-500 transition-colors">
                       — {PHILOSOPHY_QUOTES[index].author}
                     </p>
                  </motion.div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                   {PHILOSOPHY_QUOTES.map((_, i) => (
                     <button
                       key={i}
                       onClick={() => {
                         if (i === index) return;
                         setDirection(i > index ? 1 : -1);
                         setIndex(i);
                       }}
                       className="group relative flex items-center justify-center p-2"
                     >
                        <div className={`h-[2px] transition-all duration-700 rounded-full ${i === index ? 'w-12 bg-amber-500' : 'w-4 bg-white/10 group-hover:bg-white/20'}`} />
                        {i === index && (
                          <motion.div 
                            layoutId="indicator-glow"
                            className="absolute inset-0 bg-amber-500/20 blur-md rounded-full -z-10"
                          />
                        )}
                     </button>
                   ))}
                </div>
             </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Simplified for Mobile Reachability */}
      <div className="absolute inset-x-0 bottom-[-80px] md:bottom-[-160px] flex justify-center gap-6 md:gap-16">
         <motion.button 
           whileHover={{ scale: 1.1, backgroundColor: "rgba(245, 158, 11, 1)", color: "#000" }}
           whileTap={{ scale: 0.9 }}
           onClick={() => paginate(-1)}
           className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-3xl flex items-center justify-center text-white/40 transition-all shadow-2xl group"
         >
            <ChevronDown className="rotate-90 group-hover:scale-110 transition-transform" size={isMobile ? 20 : 40} />
         </motion.button>
         <motion.button 
           whileHover={{ scale: 1.1, backgroundColor: "rgba(245, 158, 11, 1)", color: "#000" }}
           whileTap={{ scale: 0.9 }}
           onClick={() => paginate(1)}
           className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-3xl flex items-center justify-center text-white/40 transition-all shadow-2xl group"
         >
            <ChevronDown className="-rotate-90 group-hover:scale-110 transition-transform" size={isMobile ? 20 : 40} />
         </motion.button>
      </div>

      <div className="absolute top-[-80px] flex flex-col items-center gap-4">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <span className="text-gray-500 text-[10px] uppercase tracking-[0.6em] font-black">Philosophy Gallery</span>
         </div>
      </div>
    </div>
  );
};

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1] 
      });
    }
  }, [isInView, count, value]);

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  return (
    <motion.span 
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {displayValue.toLocaleString()}{suffix}
    </motion.span>
  );
};

const GoldenLeafDrift = ({ count = 10 }) => {
  const leaves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2,
      rotation: Math.random() * 360,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -30,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            animate={{
              y: ["0vh", "110vh"],
              x: ["0vw", `${(Math.random() - 0.5) * 40}vw`],
              rotate: [leaf.rotation, leaf.rotation + 1080],
              opacity: [0, leaf.opacity, leaf.opacity, 0]
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              delay: leaf.delay,
              ease: [0.45, 0.05, 0.55, 0.95] // Smooth organic ease
            }}
          className="absolute bg-gradient-to-br from-amber-400 to-amber-600 blur-[0.5px] will-change-transform"
          style={{
            left: leaf.x,
            top: "-10vh",
            width: leaf.size,
            height: leaf.size * 0.6,
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 70%", // Irregular organic shape
          }}
        />
      ))}
    </div>
  );
};

const DeepSky = () => {
  const isMobile = useIsMobile();
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#020205]">
      {/* Moving Auroras */}
      {[...Array(isMobile ? 1 : 2)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: ["-50%", "50%"],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent blur-[120px] rotate-[15deg]"
          style={{ top: `${20 + i * 30}%` }}
        />
      ))}
      
      {/* Distant Nebula Clusters */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-[60%] h-[60%] bg-blue-600/5 blur-[80px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/4 w-[70%] h-[70%] bg-amber-600/5 blur-[100px] rounded-full"
      />
    </div>
  );
};

const BackgroundStar = ({ star, mouseX, mouseY }: { star: any, mouseX: any, mouseY: any, key?: number | string }) => {
  const x = useTransform(mouseX, (val: number) => val * star.depth * 30);
  const y = useTransform(mouseY, (val: number) => val * star.depth * 30);
  
  return (
    <motion.div
      style={{ 
        x, 
        y,
        top: star.top,
        left: star.left,
        width: star.size,
        height: star.size,
        zIndex: star.twinkle ? 1 : 0
      }}
      animate={{ 
        opacity: [star.opacity, 0.2, star.opacity],
        scale: star.twinkle ? [1, 1.2, 1] : [1, 1, 1],
      }}
      transition={{
        opacity: { duration: star.duration, repeat: Infinity, delay: star.delay, ease: "linear" },
        scale: { duration: star.duration * 0.6, repeat: Infinity, delay: star.delay },
      }}
      className={`absolute rounded-full ${star.color} will-change-transform`}
    />
  );
};

const StarField = ({ count = 60, mouseX, mouseY }: { count?: number, mouseX?: any, mouseY?: any }) => {
  const isMobile = useIsMobile();
  const stars = useMemo(() => {
    const colors = ["bg-white", "bg-amber-100", "bg-blue-100", "bg-amber-500/40"];
    const activeCount = isMobile ? Math.floor(count / 2) : count;
    return Array.from({ length: activeCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.3,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      depth: Math.random() * 5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      twinkle: Math.random() > 0.8
    }));
  }, [count, isMobile]);

  const defaultVal = useMotionValue(0);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <BackgroundStar 
          key={star.id} 
          star={star} 
          mouseX={mouseX || defaultVal} 
          mouseY={mouseY || defaultVal} 
        />
      ))}
      
      {/* Pruned Shooting Stars */}
      {!isMobile && [...Array(4)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          initial={{ 
            top: `${Math.random() * 40}%`, 
            left: `${Math.random() * 20}%`,
            opacity: 0,
            scale: 0.5 + Math.random()
          }}
          animate={{
            x: ["0%", "180%"],
            y: ["0%", "120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5 + Math.random() * 1.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 4,
            delay: i * 2,
            ease: "easeOut",
          }}
          className="absolute w-40 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-[-15deg] blur-[1px] will-change-transform"
        />
      ))}
      {/* Distant Fast Shooting Stars */}
      {!isMobile && [...Array(2)].map((_, i) => (
        <motion.div
          key={`fast-shooting-${i}`}
          initial={{ 
            top: `${Math.random() * 60}%`, 
            left: `${Math.random() * 30}%`,
            opacity: 0 
          }}
          animate={{
            x: ["0%", "200%"],
            y: ["0%", "150%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: Math.random() * 15 + 10,
            delay: i * 7 + 3,
            ease: "linear",
          }}
          className="absolute w-64 h-[0.5px] bg-white/20 blur-[2px] rotate-[-25deg] will-change-transform"
        />
      ))}
    </div>
  );
};

const ImageWithFallback = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`bg-zinc-800 flex flex-col items-center justify-center gap-4 ${className}`}>
        <ImageOff size={48} className="text-white/10" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Image Not Available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};

const ParallaxImage = ({ src, alt }: { src: string, alt: string }) => {
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="h-full w-full overflow-hidden relative bg-zinc-800/50 flex items-center justify-center">
      {error ? (
        <div className="flex flex-col items-center gap-3">
          <ImageOff size={40} className="text-white/10" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Media Unavailable</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          style={{ y, scale: 1.15 }}
          className="w-full h-full object-cover will-change-transform"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      )}
    </div>
  );
};

const StaggeredText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const isMobile = useIsMobile();
  // Use Intl.Segmenter for safe character splitting (handles Malayalam ligatures correctly)
  const segments = useMemo(() => {
    try {
      const segmenter = new (Intl as any).Segmenter("ml", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text)).map((s: any) => s.segment);
    } catch (e) {
      // Fallback to words if Segmenter is not supported
      return text.split(" ");
    }
  }, [text]);
  
  return (
    <motion.div className={`flex flex-wrap justify-center gap-x-[0.05em] md:gap-x-[0.1em] relative ${className}`}>
      {/* Background Aura for the line - simplified */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 2, delay }}
          className="absolute inset-x-0 h-[1.5em] bg-amber-500/20 blur-[40px] -z-10"
        />
      )}

      {segments.map((char, charIndex) => (
          <motion.span
          key={charIndex}
          className="inline-block relative overflow-visible will-change-transform"
          initial={{ 
            opacity: 0, 
            y: isMobile ? 15 : 30, 
            scale: isMobile ? 0.9 : 0.7,
            filter: isMobile ? "none" : "blur(12px)",
            rotate: isMobile ? 0 : -5
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: "none",
            rotate: 0
          }}
          viewport={{ once: true, margin: isMobile ? "0px" : "-10%" }}
          transition={{ 
            duration: isMobile ? 0.8 : 1.2, 
            delay: delay + charIndex * (isMobile ? 0.03 : 0.04),
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <span className="relative z-10">{char === " " ? "\u00A0" : char}</span>
          
          {/* Internal Glow Bloom - disabled on mobile */}
          {!isMobile && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ 
                opacity: [0, 0.4, 0], 
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 1.5, 
                delay: delay + charIndex * 0.03 + 0.1
              }}
              className="absolute inset-0 text-amber-300 blur-[2px] pointer-events-none select-none"
            >
              {char === " " ? "" : char}
            </motion.span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

const CelestialClouds = () => {
  const isMobile = useIsMobile();
  const clouds = useMemo(() => {
    const activeCount = isMobile ? 4 : 12;
    return Array.from({ length: activeCount }).map((_, i) => ({
      id: i,
      width: 150 + Math.random() * 400,
      height: 40 + Math.random() * 120,
      top: `${Math.random() * 90}%`,
      left: `${-30 - Math.random() * 30}%`,
      duration: 50 + Math.random() * 70,
      delay: Math.random() * -140,
      opacity: 0.02 + Math.random() * 0.04,
    }));
  }, [isMobile]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          animate={{
            x: ["0vw", "160vw"],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: "linear",
          }}
          className="absolute bg-white/20 blur-[100px] rounded-full will-change-transform"
          style={{
            width: cloud.width,
            height: cloud.height,
            top: cloud.top,
            left: cloud.left,
            opacity: cloud.opacity,
          }}
        />
      ))}
    </div>
  );
};

const GreatComet = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* First Great Comet - Top Right to Bottom Left */}
      <motion.div
        initial={{ x: "120%", y: "-10%", opacity: 0 }}
        animate={{
          x: ["110%", "-20%"],
          y: ["-10%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "linear",
        }}
        className="absolute w-[500px] h-[2px] bg-gradient-to-l from-transparent via-amber-400 to-transparent rotate-[35deg] blur-[2px] will-change-transform"
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_40px_#f59e0b,0_0_80px_#ffffff]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`trail-1-${i}`}
              animate={{
                x: [0, 300],
                opacity: [0.8, 0],
                scale: [1.2, 0.3]
              }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
              className="absolute w-1.5 h-1.5 bg-amber-200 rounded-full blur-[2px]"
            />
          ))}
        </div>
      </motion.div>

      {/* Second Great Comet - Top Left to Bottom Right */}
      <motion.div
        initial={{ x: "-20%", y: "15%", opacity: 0 }}
        animate={{
          x: ["-20%", "150%"],
          y: ["15%", "90%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatDelay: 25,
          delay: 7,
          ease: "linear",
        }}
        className="absolute w-[450px] h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent rotate-[-20deg] blur-[2px] will-change-transform"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_40px_#60a5fa,0_0_80px_#ffffff]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`trail-2-${i}`}
              animate={{
                x: [0, -250],
                opacity: [0.8, 0],
                scale: [1.1, 0.4]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full blur-[2px]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const DriftingKeyword = ({ item, i, scrollYProgress }: { item: any, i: number, scrollYProgress: any, key?: string | number }) => {
  const y = useTransform(scrollYProgress, [0.3, 0.7], [0, 200 * item.depth]);
  return (
    <motion.div
      style={{ 
        y,
        x: i % 2 === 0 ? "10%" : "auto",
        right: i % 2 !== 0 ? "5%" : "auto",
        top: item.top
      }}
      className="absolute flex flex-col items-center gap-4 text-amber-500/5 leading-none"
    >
      <div className="opacity-20">{item.icon}</div>
      <div className="text-[8vw] font-display font-thin italic whitespace-nowrap">{item.text}</div>
    </motion.div>
  );
};

export default function App() {
  const isMobile = useIsMobile();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isBioOpen, setIsBioOpen] = useState(false);
  
  const { scrollY } = useScroll();

  useEffect(() => {
    // Intersection Observer for active section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sectionIds = ['home', 'about', 'philosophy', 'occasions', 'contact'];
    
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Show WhatsApp button after a delay
    const timer = setTimeout(() => setShowWhatsApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  // Defined hooks for About/Leader section to avoid conditional calls
  const legacyAboutY = useTransform(scrollYProgress, [0.3, 0.7], [100, -200]);
  const legacyAboutOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.1, 0]);
  const spotlightOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0.6, 0]);
  const arcOffset = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const shihabRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const shihabRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);
  const shihabYScroll = useTransform(scrollYProgress, [0.3, 0.7], [0, -40]);
  
  const shihabBadgeX = useTransform(mouseXSpring, [-0.5, 0.5], [40, -40]);
  const shihabBadgeY = useTransform(mouseYSpring, [-0.5, 0.5], [40, -40]);
  const shihabLegacyBadgeX = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
  const shihabLegacyBadgeY = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]);
  
  const statBadgeX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const statBadgeY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);
  const statBadgeScrollY = useTransform(scrollYProgress, [0.3, 0.7], [0, -80]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      x.set(clientX / innerWidth - 0.5);
      y.set(clientY / innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  const { scrollYProgress: pageScrollProgress } = useScroll();
  const scaleX = useSpring(pageScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[100svh] bg-[#020202] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden relative gpu sm:snap-y sm:snap-proximity"
    >
      {/* Wonderful Reading Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 z-[200] origin-[0%] blur-[0.5px]"
        style={{ scaleX }}
      />
      {!isMobile && (
        <>
          <DeepSky />
          <GreatComet />
        </>
      )}
      
      {/* Global Sky Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarField count={isMobile ? 15 : 50} mouseX={mouseXSpring} mouseY={mouseYSpring} />
        {!isMobile && <CelestialClouds />}
        <CinematicSpotlight />
        
        {/* Pruned Fine Dust */}
        {!isMobile && [...Array(10)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.2, 0.1],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 7 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * -10,
            }}
            className="absolute w-0.5 h-0.5 bg-amber-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes orbit {
            from { transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
            to { transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
          }

          .orbit-planet {
            animation: orbit var(--orbit-duration) linear infinite;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 1px;
            background: #f59e0b;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 100%;
          }
        `}
      </style>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex items-center justify-between bg-black/40 border-b border-white/5"
      >
        <div className="flex items-center gap-4 group cursor-pointer relative">
          <MagneticWrapper strength={0.4}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border border-amber-500/30 flex items-center justify-center bg-black/50 relative overflow-hidden group-hover:border-amber-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-700">
                <img src="https://i.ibb.co/b5vdQzKw/logo.png" alt="Logo" className="w-6 h-6 object-contain z-10 group-hover:scale-125 transition-transform duration-700" />
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-['Cormorant_Garamond'] font-black tracking-tighter leading-none mb-1">
                  <GoldGlossyText className="!py-0">VARIETY</GoldGlossyText>
                </span>
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-amber-500/80">Catering</span>
              </div>
            </div>
          </MagneticWrapper>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {['Home', 'About', 'Philosophy', 'Journey', 'Occasions'].map((item) => (
            <MagneticWrapper key={item} strength={0.2}>
              <SubtleHover>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link relative text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-amber-500' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-[1px] bg-amber-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </SubtleHover>
            </MagneticWrapper>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MagneticWrapper strength={0.3}>
            <motion.a 
              href="#contact"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(245, 158, 11, 1)",
                color: "#000000",
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-block px-6 py-2.5 border border-amber-500/30 rounded-full text-[9px] font-black uppercase tracking-widest text-amber-500 transition-all duration-500 relative overflow-hidden group"
            >
              <motion.div
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute top-0 bottom-0 w-8 bg-white/20 skew-x-[-25deg] pointer-events-none"
              />
              <span className="relative z-10">Book Now</span>
            </motion.a>
          </MagneticWrapper>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white z-[110]"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] bg-black md:hidden overflow-hidden flex flex-col items-center justify-center"
          >
            {/* Swipe to close indicator */}
            <motion.div 
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, 10, 0], opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <div className="w-8 h-1 bg-white/20 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Swipe down to close</span>
            </motion.div>

            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsMenuOpen(false);
                }
              }}
              className="w-full flex flex-col items-center justify-center p-8 touch-none"
            >
              {/* Background elements for mobile menu */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 7, repeat: Infinity }}
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"
                />
              </div>

              <nav className="relative z-10 flex flex-col items-center gap-10">
                {['Home', 'About', 'Philosophy', 'Journey', 'Occasions', 'Contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      color: activeSection === item.toLowerCase() ? 'rgba(245, 158, 11, 1)' : 'rgba(156, 163, 175, 0.6)'
                    }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl sm:text-5xl font-display font-light italic tracking-[0.1em] sm:tracking-[0.2em] relative group transition-all duration-700 px-8 py-2 ${
                      activeSection === item.toLowerCase() ? 'scale-110 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]' : ''
                    }`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <>
                        <motion.div 
                          layoutId="mobileActiveTab"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" 
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <motion.div
                          layoutId="mobileActiveHighlight"
                          className="absolute inset-0 bg-amber-500/5 rounded-2xl -z-10 ring-1 ring-amber-500/20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      </>
                    )}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-20 flex flex-col items-center gap-6"
              >
                <div className="w-12 h-px bg-amber-500/30" />
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Since 1996</span>
                  <span className="text-amber-500/80 text-[7px] font-black uppercase tracking-[1.2em]">Variety Catering</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-6 sm:snap-start">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }} 
          className="absolute inset-0 z-0"
        >
          <FloatingParticles count={isMobile ? 10 : 30} />
          <motion.div 
            animate={{ opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none opacity-10" 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-10 text-center"
        >
          {/* Background Nebula Layer */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-amber-500/10 blur-[80px] rounded-full"
            />
            <motion.div 
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/10 blur-[80px] rounded-full"
            />
            
            {/* Shooting Comets */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`comet-${i}`}
                initial={{ x: "-100%", y: "100%", opacity: 0 }}
                animate={{ 
                  x: "200%", 
                  y: "-100%", 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 7,
                  ease: "linear"
                }}
                className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent rotate-[-45deg] blur-[1px]"
              />
            ))}
          </div>

          {/* Solar System Container */}
          <TiltLogo>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-40 h-40 md:w-96 md:h-96 mx-auto mb-16 md:mb-64 relative flex items-center justify-center p-10"
            >
            {/* The Sun (Logo) - Rich Version */}
            <div className="w-32 h-32 md:w-80 md:h-80 rounded-full border-2 border-amber-500/50 flex items-center justify-center bg-black/95 overflow-hidden relative z-20 shadow-[0_0_120px_rgba(245,158,11,0.6)] group">
               {/* Rich Plasma Corona Effect */}
               <div className="absolute inset-0 z-0 pointer-events-none">
                 <motion.div 
                   animate={{ 
                     scale: [1, 1.25, 1],
                     opacity: [0.3, 0.6, 0.3],
                     rotate: [0, 180, 360]
                   }}
                   transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-20%] bg-gradient-to-tr from-amber-500/40 via-transparent to-amber-300/40 blur-[40px]"
                 />
                 <motion.div 
                   animate={{ 
                     scale: [1.3, 1, 1.3],
                     opacity: [0.2, 0.4, 0.2],
                     rotate: [360, 180, 0]
                   }}
                   transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-30%] bg-gradient-to-bl from-amber-600/30 via-transparent to-white/10 blur-[60px]"
                 />
               </div>

               <TiltParallax strength={40}>
                 <motion.img 
                   src="https://i.ibb.co/b5vdQzKw/logo.png" 
                   alt="Variety Catering Logo" 
                   loading="eager"
                   animate={{ 
                     scale: [1, 1.05, 1],
                   }}
                   transition={{ 
                     scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                   }}
                   style={{ transform: "translateZ(80px)" }}
                   className="w-24 h-24 md:w-64 md:h-64 object-contain group-hover:scale-110 transition-transform duration-700 relative z-10 drop-shadow-[5px_5px_15px_rgba(0,0,0,0.8)] drop-shadow-[-2px_-2px_5px_rgba(245,158,11,0.4)] md:drop-shadow-[10px_10px_20px_rgba(0,0,0,0.9)] md:drop-shadow-[-4px_-4px_10px_rgba(245,158,11,0.5)]" 
                   referrerPolicy="no-referrer" 
                 />
               </TiltParallax>
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-white/5 pointer-events-none z-20" />
            </div>

            {/* Rich Solar Projectiles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`flare-${i}`}
                animate={{
                  x: [0, (Math.random() - 0.5) * 600],
                  y: [0, (Math.random() - 0.5) * 500],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeOut"
                }}
                className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full blur-[2px] z-10 shadow-[0_0_10px_rgba(245,158,11,1)]"
              />
            ))}

            {/* Rich Orbiting Rings - Sacred Geometry Aesthetic */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              style={{ transform: 'rotateX(70deg)' }}
            >
              <motion.circle
                cx="50%"
                cy="50%"
                r={isMobile ? "70" : "120"}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeOpacity="0.6"
                className="drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, rotate: -360 }}
                transition={{ 
                  pathLength: { duration: 4 },
                  rotate: { duration: 40, repeat: Infinity, ease: "linear" }
                }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
            {[
              { r: isMobile ? 60 : 100, rotate: 'rotateX(75deg) rotateY(10deg)', color: 'text-amber-500/40', dash: '8,4' },
              { r: isMobile ? 90 : 140, rotate: 'rotateX(65deg) rotateY(-20deg)', color: 'text-white/20', dash: '4,10' },
              { r: isMobile ? 120 : 180, rotate: 'rotateX(80deg) rotateY(5deg)', color: 'text-amber-400/30', dash: '' },
              { r: isMobile ? 150 : 230, rotate: 'rotateX(30deg) rotateY(30deg)', color: 'text-white/15', dash: '2,2' },
              { r: isMobile ? 180 : 280, rotate: 'rotateX(85deg) rotateY(-5deg)', color: 'text-amber-600/20', dash: '20,5' },
            ].map((ring, i) => (
              <svg 
                key={i}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                style={{ transform: ring.rotate }}
              >
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r={ring.r}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray={ring.dash}
                  className={`${ring.color} drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1, rotate: 360 }}
                  transition={{ 
                    pathLength: { duration: 3, delay: i * 0.2 },
                    rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ transformOrigin: "center" }}
                />
              </svg>
            ))}

            {/* Orbiting Category Elements - Rich Version */}
            <div className="absolute inset-0 z-30 pointer-events-none" style={{ transform: "translateZ(80px)" }}>
              {[
                { icon: <PartyPopper size={isMobile ? 12 : 18} />, radius: isMobile ? '80px' : '130px', duration: '18s', delay: '0s', color: 'bg-amber-500', glow: 'shadow-amber-500/50' },
                { icon: <Briefcase size={isMobile ? 10 : 16} />, radius: isMobile ? '100px' : '175px', duration: '24s', delay: '-3s', color: 'bg-amber-400', glow: 'shadow-amber-400/50' },
                { icon: <Heart size={isMobile ? 14 : 20} />, radius: isMobile ? '120px' : '220px', duration: '20s', delay: '-7s', color: 'bg-orange-600', glow: 'shadow-orange-600/50' },
                { icon: <Sparkles size={isMobile ? 12 : 18} />, radius: isMobile ? '140px' : '270px', duration: '30s', delay: '-11s', color: 'bg-white', glow: 'shadow-white/40' },
                { icon: <Star size={isMobile ? 10 : 16} />, radius: isMobile ? '160px' : '325px', duration: '22s', delay: '-15s', color: 'bg-amber-300', glow: 'shadow-amber-300/50' },
                { icon: <Award size={isMobile ? 12 : 18} />, radius: isMobile ? '180px' : '380px', duration: '35s', delay: '-19s', color: 'bg-amber-600', glow: 'shadow-amber-600/50' },
                { icon: <Clock size={isMobile ? 10 : 16} />, radius: isMobile ? '200px' : '440px', duration: '26s', delay: '-23s', color: 'bg-zinc-100', glow: 'shadow-zinc-100/30' },
              ].map((planet, i) => (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 orbit-planet flex items-center justify-center"
                  style={{ 
                    '--orbit-radius': planet.radius, 
                    '--orbit-duration': planet.duration,
                    animationDelay: planet.delay
                  } as any}
                >
                  <motion.div 
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ 
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className={`p-3.5 rounded-full ${planet.color} text-black shadow-[0_0_25px_rgba(245,158,11,0.6)] border border-white/20 relative z-10 will-change-transform ${planet.glow} backdrop-blur-sm bg-opacity-90`}
                  >
                    <div className="relative z-10 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                      {planet.icon}
                    </div>
                  </motion.div>

                  {/* Trails */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    {[...Array(4)].map((_, j) => (
                      <motion.div
                        key={j}
                        animate={{ 
                          opacity: [0.5 - j*0.1, 0],
                          scale: [1, 0.4]
                        }}
                        transition={{ 
                          duration: 1.2, 
                          repeat: Infinity, 
                          delay: j * 0.15 
                        }}
                        className={`absolute w-3 h-3 rounded-full ${planet.color} blur-[4px]`}
                        style={{ 
                          transform: `translateX(calc(-1 * ${planet.radius}))`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Corona Glow */}
            <div className="absolute inset-0 bg-amber-500/20 blur-[80px] rounded-full animate-pulse" />
          </motion.div>
          </TiltLogo>
          
          <RevealOnScroll y={40}>
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-7xl sm:text-8xl md:text-[12rem] font-display font-bold tracking-tighter mb-4 leading-none uppercase relative group"
            >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:-translate-y-2">
               <span className="text-amber-500/40 text-[10px] uppercase tracking-[0.8em] font-black">Heavenly Flavors</span>
            </div>
            
            <div className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">Variety</span>
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-x-0 -bottom-1 h-[2px] bg-amber-500/40 blur-[1px]" 
              />
            </div>
            {" "}
            <div className="relative inline-block">
              <span className="text-amber-500 italic relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">Catering</span>
              <motion.div 
                animate={{ 
                  scaleX: [0, 1, 0],
                  left: ["0%", "50%", "100%"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 h-[1px] w-12 bg-amber-300 pointer-events-none"
              />
            </div>

            {/* Malayalam Subtitle Spark */}
            <BlurReveal delay={1.8}>
              <div className="mt-4 text-xs font-['Noto_Sans_Malayalam'] text-amber-500/60 font-medium tracking-[0.2em]">
                നന്മയോടെ വിളമ്പുന്ന സ്വാദ് 
              </div>
            </BlurReveal>
            
            {/* Gold Leaf Shimmer Effect */}
            <motion.div 
              animate={{ 
                x: ["-100%", "200%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 3
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent skew-x-[-30deg] pointer-events-none z-20"
            />
            
            {/* Floating Energy Sparks around title */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute w-1 h-1 bg-amber-400 rounded-full blur-[1px]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.h1>
          </RevealOnScroll>
          
              <RevealOnScroll delay={0.2}>
                <LetterReveal 
                  text="Crafting unforgettable culinary experiences since 1996."
                  className="text-gray-400 max-w-xl mx-auto mb-12 uppercase tracking-[0.3em] text-[10px]"
                />
              </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-amber-500/60 font-['Noto_Sans_Malayalam'] text-xs tracking-widest animate-pulse"
              >
                കണക്റ്റ് ചെയ്യാൻ ക്ഷണിക്കുന്നു...
              </motion.div>
              <motion.a 
                href="#contact"
              initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: isMobile ? "0 0 20px rgba(245,158,11,0.2)" : [
                "0 0 20px rgba(245,158,11,0.2)",
                "0 0 40px rgba(245,158,11,0.5)",
                "0 0 20px rgba(245,158,11,0.2)"
              ]
            }}
            transition={{ 
              opacity: { delay: 1.2 }, 
              y: { delay: 1.2 },
              boxShadow: isMobile ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 60px rgba(245,158,11,0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-10 md:py-5 bg-amber-500 text-black font-black rounded-full text-base md:text-lg uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 relative overflow-hidden group/btn"
          >
            {/* Button Shimmer */}
            <motion.div 
              animate={{ 
                x: ["-100%", "200%"],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 3
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg]"
            />
            
            <span className="relative z-10">Connect With Us</span>
            <ChevronRight size={20} className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
          </motion.a>
          </div>
          </RevealOnScroll>
        </motion.div>
      </section>
      
      {/* Journey CTA Section */}
      <section className="py-24 flex justify-center relative z-20 bg-[#050505]">
        <RevealOnScroll>
          <MagneticWrapper strength={0.2}>
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 40px rgba(245, 158, 11, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-8 md:px-24 md:py-12 bg-transparent border border-amber-500/20 rounded-[2rem] overflow-hidden backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors duration-700" />
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)] blur-2xl" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-amber-500/30" />
                  <Sparkles size={16} className="text-amber-500/60" />
                  <div className="w-12 h-px bg-amber-500/30" />
                </div>
                
                <span className="text-3xl md:text-5xl font-display font-light italic tracking-[0.2em] text-white group-hover:text-amber-500 transition-colors duration-500 text-center">
                  Start a Journey <span className="font-display">With Us</span>
                </span>
                
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-amber-500/40 group-hover:text-amber-500/60 transition-colors">Begin the Experience</span>
                  <ChevronDown className="text-amber-500/40 group-hover:text-amber-500/60 transition-colors" size={14} />
                </motion.div>
              </div>

              {/* Decorative Corner Elements */}
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-6 left-6 w-8 h-8 border-t border-l border-amber-500/30 rounded-tl-3xl" 
              />
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-amber-500/30 rounded-br-3xl" 
              />
            </motion.a>
          </MagneticWrapper>
        </RevealOnScroll>
      </section>

      {/* Visionary Leader Section */}
      <SectionWarp>
        <section id="about" className="py-32 md:py-48 px-6 relative overflow-hidden bg-black/50 sm:snap-start">
          <FloatingParticles count={isMobile ? 5 : 15} color="rgba(245, 158, 11, 0.15)" />
          <GoldenLeafDrift count={isMobile ? 5 : 15} />
          
          {/* Parallax Background Text - Refined with dual speed */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <motion.div 
            style={{ 
              y: legacyAboutY,
              opacity: legacyAboutOpacity
            }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[20vw] font-display font-black text-amber-500 whitespace-nowrap leading-none tracking-widest blur-[2px]"
          >
            LEGACY
          </motion.div>
        </div>

        {/* Floating Atmospheric Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mouse Following Spotlight Layer */}
          <motion.div 
            style={{ 
              left: mouseXSpring, 
              top: mouseYSpring,
              opacity: spotlightOpacity
            }}
            className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(245,158,11,0.08),transparent_70%)] blur-[40px] z-0"
          />

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                y: [0, -100 * (i % 3 + 1), 0],
                x: [0, 50 * (i % 2 === 0 ? 1 : -1), 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
              className="absolute w-1 h-1 bg-amber-500/20 rounded-full blur-[2px]"
              style={{
                top: `${20 + i * 10}%`,
                left: `${10 + (i * 12) % 80}%`,
              }}
            />
          ))}
        </div>

        {/* Dynamic Scroll Growing Arc with Traveler */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-[120vh] pointer-events-none overflow-visible opacity-30">
          <svg viewBox="0 0 100 200" className="w-full h-full fill-none overflow-visible">
            <motion.path
              id="scrollArc"
              d="M100,0 C20,40 20,160 100,200"
              stroke="url(#arcGradient)"
              strokeWidth="0.8"
              strokeDasharray="1000"
              initial={{ pathLength: 0 }}
              style={{ pathLength: scrollYProgress }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Glowing Traveler following the path */}
            <motion.circle
              r="2"
              fill="#f59e0b"
              filter="blur(4px)"
              style={{ 
                offsetPath: "path('M100,0 C20,40 20,160 100,200')",
                offsetDistance: arcOffset
              }}
            />
            <motion.circle
              r="0.5"
              fill="#ffffff"
              style={{ 
                offsetPath: "path('M100,0 C20,40 20,160 100,200')",
                offsetDistance: arcOffset
              }}
            />
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Global Light Scan Effect */}
        <motion.div 
          animate={{ 
            y: ["-100%", "200%"],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear"
          }}
          className="absolute inset-x-0 h-[20vh] bg-gradient-to-b from-transparent via-amber-500/10 to-transparent pointer-events-none z-0"
        />

        {/* Parallax Drifting Philosophy Keywords & Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {[
            { text: "Tradition", top: "15%", left: "10%", depth: 0.2, icon: <Sparkles className="w-8 h-8" /> },
            { text: "Quality", top: "65%", left: "15%", depth: 0.3, icon: <Star className="w-6 h-6" /> },
            { text: "Taste", top: "25%", right: "10%", depth: 0.15, icon: <Heart className="w-10 h-10" /> },
            { text: "Sincerity", top: "80%", right: "20%", depth: 0.4, icon: <Heart className="w-7 h-7" /> },
          ].map((item, i) => (
            <DriftingKeyword key={`float-${i}`} item={item} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center relative z-10">
          {/* Visual Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative group perspective-[2000px] gpu">
              {/* Specialized Interactive Halo */}
              <div className="absolute -inset-10 md:-inset-20 z-0 pointer-events-none">
                <InteractiveOrbit radius={250} duration={40}>
                  <div className="w-2 h-2 bg-amber-500/40 rounded-full blur-[2px]" />
                </InteractiveOrbit>
                <InteractiveOrbit radius={180} duration={30} reverse>
                  <div className="w-1 h-1 bg-white/20 rounded-full blur-[1px]" />
                </InteractiveOrbit>
                
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(245,158,11,0.1)_180deg,transparent_360deg)] rounded-full blur-[80px]"
                />

                {/* Shihab Butterflies */}
                {!isMobile && (
                  <>
                    <ButterflyEffect color="#f59e0b" className="-top-20 -left-10 opacity-40" />
                    <ButterflyEffect color="#fbbf24" className="bottom-20 -right-20 opacity-30" />
                  </>
                )}
              </div>

              {/* Main Image Container with Enhanced 3D Interaction */}
              <motion.div 
                style={{ 
                  rotateY: shihabRotateY,
                  rotateX: shihabRotateX,
                  y: shihabYScroll
                }}
                className="relative z-10 aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)] border border-white/10 bg-zinc-950 group/image transform-style-3d"
              >
                <motion.div className="absolute inset-0 z-0">
                  <motion.img 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    src="https://i.ibb.co/p9yjJ9Z/shihab.jpg" 
                    alt="Shihab - Visionary Leader" 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover/image:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </motion.div>
                
                {/* Visual Depth Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                
                {/* Parallax Info Panels */}
                <motion.div 
                  style={isMobile ? { translateZ: "20px" } : { 
                    x: shihabBadgeX,
                    y: shihabBadgeY,
                    translateZ: "80px"
                  }}
                  className="absolute top-12 left-12 z-30"
                >
                  <div className="px-6 py-2 bg-black/60 shadow-2xl border border-amber-500/30 rounded-full flex items-center gap-3">
                    <Sparkles size={12} className="text-amber-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">The Visionary</span>
                  </div>
                </motion.div>

                <motion.div 
                  style={isMobile ? { translateZ: "10px" } : { 
                    x: shihabLegacyBadgeX,
                    y: shihabLegacyBadgeY,
                    translateZ: "40px"
                  }}
                  className="absolute top-32 left-8 z-30"
                >
                  <div className="px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-[8px] font-black uppercase tracking-[0.3em]">
                    Legacy of Taste
                  </div>
                </motion.div>
              </motion.div>

              {/* Advanced Floating Badge */}
              <motion.div 
                style={{ 
                  x: statBadgeX,
                  y: statBadgeY,
                  translateY: statBadgeScrollY
                }}
                className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 z-30 pointer-events-none"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
                  className="p-8 md:p-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[3rem] shadow-[0_30px_90px_rgba(245,158,11,0.5)] relative overflow-hidden group/badge"
                >
                  <div className="relative z-10 text-black text-center">
                    <Award size={48} className="mx-auto mb-4" />
                    <div className="text-7xl md:text-9xl font-display font-black leading-none mb-2">5K+</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em]">Exquisite Events</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column with Deep Parallax & Enhanced Legibility */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-10 bg-black/40 blur-3xl rounded-[4rem] -z-10" />
            
            <CinematicParallax strength={40}>
              <RevealOnScroll>
                <div className="flex items-center gap-6 mb-12">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    className="h-[2px] bg-gradient-to-r from-amber-500 to-transparent" 
                  />
                  <div className="flex items-center gap-4">
                    <span className="text-amber-500 font-bold uppercase tracking-[0.6em] text-[10px] font-sans">Visionary Narrative</span>
                    <motion.div
                      animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="text-amber-500/40"
                    >
                      <Sparkles size={14} />
                    </motion.div>
                  </div>
                </div>

                <h2 className="relative">
                  <LetterReveal 
                    text="The Shihab"
                    className="text-7xl md:text-9xl font-display font-medium mb-8 overflow-visible leading-[0.8] tracking-tighter uppercase relative group"
                  />
                  <div className="absolute -inset-20 bg-[radial-gradient(circle,rgba(245,158,11,0.3)_0%,transparent_70%)] blur-[80px] -z-10 pointer-events-none" />
                </h2>
              </RevealOnScroll>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative mb-20 pl-12 border-l-2 border-amber-500/20"
              >
                <div className="absolute inset-x-0 -inset-y-4 bg-amber-500/[0.03] blur-2xl rounded-full -z-10" />
                <p className="relative z-10 text-2xl md:text-4xl text-gray-400 font-['Noto_Sans_Malayalam'] font-light italic leading-relaxed mb-8">
                  "30 വർഷത്തെ പാരമ്പര്യവും 5000-ലധികം വിജയകരമായ ഇവന്റുകളും ഞങ്ങളുടെ കരുത്താണ്."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-amber-500/20 flex items-center justify-center">
                    <Star size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="text-white font-black uppercase tracking-widest text-[10px]">Quality Guaranteed</div>
                    <div className="text-gray-500 text-[9px] uppercase tracking-widest">Since 1996</div>
                  </div>
                </div>

                {/* Highly Stylized Floating Watermark */}
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.03, 0.08, 0.03],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-32 -right-32 text-[15vw] font-['Noto_Sans_Malayalam'] font-black whitespace-nowrap pointer-events-none select-none blur-[2px] text-amber-500"
                >
                  സ്വാദ്
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-2 gap-8 md:gap-12">
                {[
                  { value: 30, label: "Years Experience", description: "Legacy of excellence", icon: <Clock size={22} />, suffix: "+" },
                  { value: 100, label: "Service Boys", description: "Exquisite hospitality", icon: <Star size={22} />, suffix: "+" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group/stat p-10 bg-white/[0.03] border border-white/10 rounded-[3rem] sm:backdrop-blur-3xl hover:bg-white/[0.07] transition-all duration-700 relative overflow-hidden"
                  >
                    {/* Inner Card Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                      <div className="text-amber-500 mb-6 group-hover/stat:scale-110 transition-transform duration-500">{stat.icon}</div>
                      <div className="text-5xl md:text-6xl font-['Cormorant_Garamond'] font-black text-white mb-3">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/60 mb-2 group-hover/stat:text-amber-500 transition-colors">{stat.label}</div>
                      <div className="text-[8px] font-medium uppercase tracking-widest text-gray-500 opacity-0 group-hover/stat:opacity-100 transition-all duration-700 translate-y-2 group-hover/stat:translate-y-0">
                        {stat.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CinematicParallax>
          </div>
        </div>
      </section>
    </SectionWarp>

    <AwardsSection />

    {/* Refined Food Philosophy Poem Section - Ultra Creative Minimal */}
      <SectionWarp>
        <section id="philosophy" className="py-48 px-6 relative overflow-hidden bg-black sm:snap-start">
          {/* Obsidian Background Architecture */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.03)_0%,transparent_50%)]" />
            
            {/* Drifting Philosophy Fragments */}
            <motion.div 
              style={{ x: useTransform(scrollYProgress, [0.6, 0.8], [0, -300]) }}
              className="absolute top-[10%] right-[10%] text-[20vw] font-black text-white/[0.01] select-none uppercase tracking-tighter"
            >
              ESSENCE
            </motion.div>
            <motion.div 
              style={{ x: useTransform(scrollYProgress, [0.6, 0.8], [0, 300]) }}
              className="absolute bottom-[10%] left-[5%] text-[15vw] font-black text-white/[0.01] select-none uppercase tracking-tighter italic"
            >
              SOUL
            </motion.div>

            {/* Abstract Spice Silhouettes - Brighter for Rich Feel */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`spice-drift-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{
                  y: [0, -150, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.03, 0.08, 0.03]
                }}
                transition={{
                  duration: 25 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-64 h-64 border border-amber-500/10 rounded-full blur-[100px]"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-32 md:gap-48"
            >
              {/* Interactive Philosophy Carousel */}
              <div className="flex flex-col gap-24">
                <div className="text-center px-6">
                  <RevealOnScroll>
                    <div className="flex flex-col items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-px bg-amber-500/30" />
                        <span className="text-amber-500 font-black uppercase tracking-[1em] text-[10px]">Ruchiyude Darshanam</span>
                        <div className="w-12 h-px bg-amber-500/30" />
                      </div>
                      <h2 className="text-6xl md:text-[8rem] font-display font-medium text-white tracking-tighter leading-[0.9] uppercase">
                        <LetterReveal text="The soul of" /> <br /> 
                        <GoldGlossyText className="italic">
                          <LetterReveal text="Hospitality" delay={0.4} />
                        </GoldGlossyText>
                      </h2>
                    </div>
                  </RevealOnScroll>
                </div>
                <PhilosophyCarousel />
              </div>

               {/* Founder Section Built In - Rich Minimalist */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mt-48 pt-48 border-t border-white/5 relative">
                {/* Visual Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                
                <div className="order-2 lg:order-1">
                  <RevealOnScroll direction="up">
                    <div className="flex flex-col gap-12">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-px bg-amber-500/40" />
                          <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 0.6, x: 0 }}
                            className="text-amber-500 font-sans font-bold uppercase tracking-[1em] text-[10px]"
                          >
                            Founder's Philosophy
                          </motion.span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-display font-medium text-white leading-[0.9] tracking-tighter">
                          Crafting <br />
                          <span className="italic text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">Soulful</span> Moments
                        </h2>
                      </div>

                      <p className="text-gray-400 text-2xl md:text-4xl font-display italic leading-relaxed max-w-xl border-l-2 border-amber-500/20 pl-10">
                        "വാക്കുകൾ കൊണ്ട് വിവരിക്കാൻ കഴിയാത്ത ഒന്നാണ് രുചി. ഓരോ സ്പൂൺ ഭക്ഷണത്തിലും നൂറ്റാണ്ടുകളുടെ പാരമ്പര്യവും സ്നേഹവും നിറയ്ക്കുക എന്നതാണ് എന്റെ ലക്ഷ്യം."
                      </p>

               <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-8 group/founder cursor-pointer" onClick={() => setIsBioOpen(true)}>
                    <div className="relative">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-amber-500/30 overflow-hidden group-hover/founder:border-amber-500 transition-colors duration-500 p-1"
                      >
                        <img 
                          src="https://i.ibb.co/p9yjJ9Z/shihab.jpg" 
                          alt="Shihab" 
                          className="w-full h-full object-cover rounded-full grayscale group-hover/founder:grayscale-0 group-hover/founder:scale-110 transition-all duration-1000"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-lg"
                      >
                        <Plus size={20} strokeWidth={3} />
                      </motion.div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-display text-5xl md:text-7xl tracking-widest italic leading-tight group-hover:text-amber-500 transition-colors">
                        <LetterReveal text="Shihab" />
                      </span>
                      <span className="text-amber-500 font-malayalam text-xl tracking-[0.2em] font-medium opacity-60">ശിഹാബ്</span>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setIsBioOpen(true)}
                    whileHover={{ scale: 1.05, x: 20 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-6 group/btn mt-4 ml-[150px] w-fit"
                  >
                    <div className="flex flex-col items-start">
                       <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] group-hover/btn:tracking-[0.6em] transition-all duration-500">Read Full Story</span>
                       <div className="h-px w-24 bg-amber-500/20 group-hover/btn:w-full group-hover/btn:bg-amber-500/60 transition-all duration-700 mt-2" />
                    </div>
                    <motion.div 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center group-hover/btn:bg-amber-500 group-hover/btn:text-black transition-all"
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                  </motion.button>

                  <div className="flex flex-col gap-2 pl-[150px] mt-4">
                    <span className="text-amber-500 font-black uppercase tracking-[1em] text-[10px] opacity-40">Founder & CEO</span>
                    <span className="text-gray-700 text-[8px] uppercase tracking-[0.5em]">Variety Catering Group | Est. 1996</span>
                  </div>
               </div>
                    </div>
                  </RevealOnScroll>
                </div>

                <div className="order-1 lg:order-2 flex justify-center scale-110">
                  <RevealOnScroll delay={0.3}>
                    <div className="relative group">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.15, 1],
                          opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute inset-0 bg-amber-500/30 blur-[120px] rounded-full"
                      />
                      
                      <div className="relative flex flex-col items-center">
                        <GoldGlossyText className="text-7xl md:text-[14rem] font-sans font-black leading-none text-center block tracking-tighter bg-gradient-to-b from-amber-200 to-amber-600 bg-clip-text text-transparent px-4 py-8">
                          സ്നേഹമാണ് <br /> വിളമ്പുന്നത്
                        </GoldGlossyText>
                        
                        {/* Interactive Sparkle Element */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute -top-10 -right-10 text-amber-500/40"
                        >
                          <Sparkles size={100} strokeWidth={0.5} />
                        </motion.div>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionWarp>

        <FlavorJourney />

      {/* Occasions of Excellence Section */}
      <SectionWarp>
        <section id="occasions" className="py-24 md:py-48 px-6 relative overflow-hidden bg-black sm:snap-start">
          <FloatingParticles count={isMobile ? 8 : 20} color="rgba(245, 158, 11, 0.1)" />
          {/* Immersive Background Atmosphere */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
            
            {/* Animated Light Blobs */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-amber-500/5 blur-[120px] rounded-full"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.15, 0.05],
                x: [0, -40, 0],
                y: [0, 60, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-32">
              <BlurReveal>
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-amber-500/30" />
                  <h4 className="text-amber-500 font-bold uppercase tracking-[0.8em] text-[10px] animate-pulse">Our Expertise</h4>
                  <div className="w-8 h-px bg-amber-500/30" />
                </div>
                
                <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-display font-light mb-12 leading-none tracking-tighter uppercase text-center">
                  <GoldGlossyText className="!py-4">
                    <LetterReveal text="Occasions of" /> <br className="hidden md:block" /> 
                    <span className="opacity-40 italic">
                      <LetterReveal text="Excellence" delay={0.5} />
                    </span>
                  </GoldGlossyText>
                </h2>
              </BlurReveal>
              
              <BlurReveal delay={0.3}>
                <div className="max-w-2xl mx-auto space-y-6">
                  <p className="text-gray-400 text-base md:text-xl font-display italic tracking-wide">
                    "Every celebration is a canvas, and we are the artists of taste."
                  </p>
                  <div className="flex flex-col items-center">
                     <div className="text-amber-500/60 text-sm font-['Noto_Sans_Malayalam'] font-medium tracking-[0.2em] mb-4">ഏതൊരു ആഘോഷവും അവിസ്മരണീയമാക്കാൻ...</div>
                     <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: 100 }}
                      className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" 
                     />
                  </div>
                </div>
              </BlurReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 min-h-[450px]">
              {OCCASIONS.map((event, idx) => {
                const Icon = {
                  'event-wedding': <Heart size={20} />,
                  'event-nikkah': <Sparkles size={20} />,
                  'event-housewarming': <Home size={20} />,
                  'event-parties': <PartyPopper size={20} />,
                  'event-corporate': <Briefcase size={20} />,
                }[event.id] || <Star size={20} />;

                return (
                <RevealOnScroll key={event.id} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ 
                      y: -15, 
                      scale: 1.02,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                    }}
                    onClick={() => setSelectedOccasion({ ...event, icon: Icon })}
                    className="group relative h-[450px] md:h-[500px] sm:backdrop-blur-3xl bg-zinc-950/50 border border-white/10 rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-1000"
                  >
                    {/* Background Image Container */}
                    <div className="absolute inset-0 z-0">
                      <ImageWithFallback 
                        src={event.heroImage} 
                        alt={event.name}
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
                    </div>

                    {/* Local Spotlight Effect */}
                    <motion.div 
                      className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(245,158,11,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                        if (rect) {
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                        }
                      }}
                    />

                    {/* Content Section */}
                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-4"
                      >
                         <div className="w-10 h-10 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-700">
                          {Icon}
                        </div>
                      </motion.div>
                      
                      <div className="relative">
                        <h3 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-tighter transition-all duration-700 group-hover:text-amber-100">
                          {event.name}
                        </h3>
                        <div className="text-amber-500/80 text-[10px] font-['Noto_Sans_Malayalam'] font-black uppercase tracking-[0.2em] mb-4 group-hover:text-amber-400 transition-all duration-700">
                          {event.malayalam}
                        </div>
                        
                        <p className="text-[10px] text-gray-300 uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 max-w-xs">
                          {event.shortDesc}
                        </p>
                      </div>

                      {/* Explore Button Indicator */}
                      <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100 translate-y-4 group-hover:translate-y-0">
                        <div className="w-6 h-px bg-amber-500/50" />
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-amber-500">View Details</span>
                        <ChevronRight size={10} className="text-amber-500" />
                      </div>
                    </div>

                    {/* Card Edge Glow */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  </motion.div>
                </RevealOnScroll>
              ); })}
            </div>
          </div>
        </section>
      </SectionWarp>

      <SectionWarp>
        <ContactSection />
      </SectionWarp>

      {/* Cinematic Footer Section */}
      <footer className="py-32 px-6 border-t border-white/5 bg-black/40 relative overflow-hidden sm:snap-start">
        {/* Advanced Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(245,158,11,0.15),transparent_70%)]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(245,158,11,0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <FloatingParticles count={isMobile ? 5 : 15} color="rgba(245, 158, 11, 0.1)" />
        <CinematicSpotlight />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 items-center relative z-10">
          <RevealOnScroll>
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <MagneticWrapper strength={0.4}>
                <div className="flex items-center gap-4 mb-8 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl border border-amber-500/30 flex items-center justify-center bg-black/50 overflow-hidden group-hover:border-amber-500 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all duration-700">
                    <img src="https://i.ibb.co/b5vdQzKw/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-['Cormorant_Garamond'] font-black tracking-tighter leading-none mb-1">
                      <GoldGlossyText children="VARIETY" />
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.5em] text-amber-500/60 group-hover:text-amber-500 transition-colors">Catering</span>
                  </div>
                </div>
              </MagneticWrapper>
              
              <div className="flex flex-col gap-2 mb-8">
                <span className="text-amber-500 font-['Noto_Sans_Malayalam'] text-[10px] tracking-[0.2em] uppercase opacity-70">കണക്റ്റ് ചെയ്യാൻ ക്ഷണിക്കുന്നു</span>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] leading-loose max-w-sm">
                  Crafting unforgettable culinary journeys since 1996. <br />
                  <span className="text-gray-400">Karuvanpoyil, Kozhikode, Kerala.</span> <br />
                  <motion.a 
                    whileHover={{ scale: 1.05, x: 5, textShadow: "0 0 15px rgba(245,158,11,0.8)" }}
                    href="tel:+919349810267" 
                    className="text-amber-500 hover:text-white transition-all tracking-widest mt-4 inline-block font-black drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  >
                    +91 93498 10267
                  </motion.a>
                </p>
              </div>
            </div>
          </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
                  {[
                    { name: 'Instagram', url: 'https://instagram.com/varietycatering' },
                    { name: 'Facebook', url: '#' },
                    { name: 'WhatsApp', url: 'https://wa.me/919349810267' }
                  ].map((social) => (
                    <MagneticWrapper key={social.name} strength={0.2}>
                      <SubtleHover>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 transition-all duration-300 hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] block text-center overflow-hidden"
                        >
                          <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent skew-x-[-20deg]"
                          />
                          <span className="relative z-10">{social.name}</span>
                        </a>
                      </SubtleHover>
                    </MagneticWrapper>
                  ))}
                </div>
              </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-[9px] uppercase tracking-[0.3em] mb-2">© 2026 Variety Catering.</p>
              <p className="text-gray-700 text-[8px] uppercase tracking-[0.3em]">Designed for the celestial palate.</p>
              <div className="mt-6 flex items-center justify-center md:justify-end gap-3 opacity-20">
                <div className="w-12 h-px bg-white/20" />
                <span className="text-[7px] font-black uppercase tracking-[1em] text-white">Pure Soul</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
      </footer>

      {/* Occasion Detail Modal */}
      <AnimatePresence>
        {selectedOccasion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/98 sm:backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 50, opacity: 0 }}
              className="relative w-full max-w-6xl bg-zinc-950 rounded-[2rem] md:rounded-[4rem] border border-white/5 shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
            >
              <button
                onClick={() => setSelectedOccasion(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-full text-white hover:bg-amber-500 hover:text-black transition-all border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Dynamic Image/Hero Section */}
              <div className="w-full md:w-1/2 relative h-96 md:h-auto overflow-hidden">
                <ImageWithFallback 
                  src={selectedOccasion.heroImage} 
                  alt={selectedOccasion.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Floating Icon in Hero */}
                <div className="absolute bottom-12 left-12 p-6 backdrop-blur-xl bg-amber-500/10 border border-amber-500/20 rounded-[2rem] hidden md:flex items-center gap-6">
                  <div className="text-amber-500">{selectedOccasion.icon}</div>
                  <div className="w-px h-8 bg-amber-500/20" />
                  <span className="text-amber-500 font-display italic text-3xl">{selectedOccasion.malayalam}</span>
                </div>
              </div>

              {/* Detailed Content Section */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center overflow-y-auto">
                <RevealOnScroll>
                  <div className="mb-12">
                    <h4 className="text-amber-500 font-bold uppercase tracking-[0.6em] text-[10px] mb-6 animate-pulse">Signature Expertise</h4>
                    <h2 className="text-5xl md:text-7xl font-display font-light text-white leading-tight mb-4 tracking-tighter">
                      {selectedOccasion.name} <br />
                      <span className="italic opacity-40 font-extralight text-4xl">{selectedOccasion.malayalam}</span>
                    </h2>
                  </div>

                  <div className="space-y-8 mb-12">
                     <p className="text-xl md:text-2xl font-display text-gray-300 italic leading-relaxed">
                       "{selectedOccasion.detailedDesc}"
                     </p>
                     
                     <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 border-l-4 border-l-amber-500">
                       <p className="text-gray-400 font-['Noto_Sans_Malayalam'] font-medium leading-loose tracking-wide">
                         {selectedOccasion.malayalamDetailedDesc}
                       </p>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <h5 className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px] mb-6">Service Highlights</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedOccasion.highlights.map((highlight, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-colors" />
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{highlight}</span>
                            <span className="text-[9px] font-['Noto_Sans_Malayalam'] text-gray-500 tracking-wider">
                              {selectedOccasion.malayalamHighlights[i]}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(245, 158, 11, 1)", color: "#000" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        setSelectedOccasion(null);
                        const contactEl = document.getElementById('contact');
                        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-16 w-full py-6 border border-amber-500/30 text-amber-500 font-black rounded-3xl uppercase tracking-[0.4em] text-[10px] transition-all flex items-center justify-center gap-4 group"
                  >
                    Request a Quote
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </RevealOnScroll>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button with Steam Effect */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: -50 }}
            className="fixed bottom-10 left-6 md:left-10 z-[110] flex flex-col items-center"
          >
            {/* Rising Steam/Aavi Effect */}
            <div className="absolute bottom-full mb-2 w-12 h-20 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`steam-${i}`}
                  initial={{ y: 20, x: 0, opacity: 0, scale: 0.5 }}
                  animate={{ 
                    y: -60, 
                    x: Math.sin(i) * 20, 
                    opacity: [0, 0.4, 0],
                    scale: [0.5, 2, 1]
                  }}
                  transition={{ 
                    duration: 2 + i, 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full blur-md"
                />
              ))}
            </div>

            <motion.a
              href="https://wa.me/919349810267"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.15,
                boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)"
              }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] relative group"
            >
              {/* Spinning Aura */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4px] border-2 border-dashed border-[#25D366]/40 rounded-full group-hover:scale-110 transition-transform"
              />
              <MessageCircle size={32} fill="white" className="z-10 group-hover:rotate-12 transition-transform" />
            </motion.a>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="mt-4 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-[#25D366] whitespace-nowrap"
            >
              Chat With Us
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Biography Modal */}
      <AnimatePresence>
        {isBioOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12 overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBioOpen(false)}
              className="absolute inset-0 bg-black/98 backdrop-blur-xl" 
            />
            
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ y: 100, opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className="relative w-full max-w-7xl h-[90vh] md:h-auto bg-zinc-950 border border-white/10 p-10 md:p-24 rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                <button 
                  onClick={() => setIsBioOpen(false)}
                  className="fixed top-20 md:top-32 right-12 md:right-32 w-14 h-14 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all z-[210] group"
                >
                  <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                {/* Butterflies Dancing in the Background */}
                {!isMobile && (
                  <div className="pointer-events-none">
                    <ButterflyEffect color="#f59e0b" className="top-20 left-20 opacity-30" />
                    <ButterflyEffect color="#fbbf24" className="bottom-40 right-20 opacity-20" />
                    <ButterflyEffect color="#d97706" className="top-1/2 left-1/3 opacity-10" />
                  </div>
                )}

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-500/5 blur-[200px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                  <div className="lg:col-span-5 relative group/bio-img sticky top-0">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                      className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
                    >
                        <img 
                          src="https://i.ibb.co/p9yjJ9Z/shihab.jpg" 
                          alt="Shihab" 
                          className="w-full h-full object-cover grayscale-[0.2] group-hover/bio-img:grayscale-0 group-hover/bio-img:scale-105 transition-all duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </motion.div>
                    
                    <motion.div 
                      animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-10 -right-10 w-48 h-48 bg-zinc-900 border-2 border-amber-500/30 rounded-[3rem] p-8 hidden md:flex flex-col items-center justify-center shadow-3xl backdrop-blur-3xl z-20"
                    >
                        <div className="text-amber-500 text-6xl font-display font-black leading-none mb-1 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">30</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center leading-tight">Years Excellence <br /> In Catering</div>
                    </motion.div>

                    {/* Floating Accent Elements */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 border border-amber-500/10 rounded-full animate-spin-slow pointer-events-none" />
                    <div className="absolute top-1/2 -right-16 w-32 h-px bg-gradient-to-r from-amber-500/40 to-transparent pointer-events-none" />
                  </div>

                  <div className="lg:col-span-7 space-y-16">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: 64 }}
                          className="h-[2px] bg-amber-500/40" 
                        />
                        <span className="text-amber-500 font-black uppercase tracking-[1em] text-[10px] bg-amber-500/5 px-4 py-1 rounded-full">The Founding Visionary</span>
                      </div>
                      
                      <div className="space-y-4">
                        <h2 className="text-6xl md:text-[8rem] font-display font-medium text-white italic tracking-tighter leading-[0.8]">
                          <LetterReveal text="Shihab" /> <br /> 
                          <span className="text-amber-500 block mt-4">
                            <LetterReveal text="Karuvanpoyil" delay={0.3} />
                          </span>
                        </h2>
                        <motion.p 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 }}
                          className="text-amber-500/60 font-malayalam text-3xl md:text-5xl tracking-[0.05em]"
                        >
                          ശിഹാബ് കരുവൻപൊയിൽ
                        </motion.p>
                      </div>
                    </div>

                    <div className="space-y-12">
                      <div className="relative">
                        <div className="absolute -left-16 -top-20 text-amber-500/5 text-[300px] font-serif select-none pointer-events-none leading-none">"</div>
                        
                        <div className="space-y-16 relative z-10">
                          <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="text-white text-2xl md:text-5xl font-malayalam leading-tight tracking-[0.02em] font-light italic"
                          >
                            <span className="text-amber-500 text-6xl md:text-8xl font-bold float-left mr-6 leading-none select-none">"</span>
                            രുചി ഒരു കലയാണ്, അതൊരു സംസ്കാരമാണ്. സ്നേഹം ചേർത്ത് വിളമ്പുന്ന വിഭവം ഒരിക്കലും തോൽക്കില്ല എന്നതാണ് എന്റെ ഏറ്റവും വലിയ പാഠം.
                          </motion.p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                             {[
                               { 
                                 title: "1996 - BEGINNINGS", 
                                 text: "1996-ൽ ഒരു ചെറിയ തുടക്കമായിരുന്നു വെറൈറ്റി കാറ്ററിംഗ്. ഓരോ വിഭത്തിലും പുതുമയ്ക്കായുള്ള സമർപ്പണം അന്ന് മുതലേ ഞങ്ങൾക്കുണ്ട്.",
                                 malayalam: "തുടക്കം"
                               },
                               { 
                                 title: "OUR PHILOSOPHY", 
                                 text: "പാരമ്പര്യത്തിന്റെ തനിമ ചോരാതെ, ആധുനികതയുടെ മിഴിവോടെ രുചികരമായ വിഭവങ്ങൾ വിളമ്പുക എന്നതാണ് ഞങ്ങളുടെ ശൈലി.",
                                 malayalam: "ശൈലി"
                               }
                             ].map((item, idx) => (
                               <motion.div 
                                 key={idx}
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: 1.2 + idx * 0.2 }}
                                 className="p-10 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] group/card hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden"
                               >
                                  <div className="absolute -right-8 -bottom-8 text-amber-500/[0.03] text-8xl font-malayalam select-none group-hover/card:scale-110 transition-transform">
                                    {item.malayalam}
                                  </div>
                                  <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-6 flex items-center gap-3">
                                    <div className="w-6 h-px bg-amber-500/40" />
                                    {item.title}
                                  </h4>
                                  <p className="text-xl text-gray-400 font-malayalam leading-relaxed">
                                    {item.text}
                                  </p>
                               </motion.div>
                             ))}
                          </div>

                          <div className="p-12 md:p-20 bg-amber-500/[0.03] border border-amber-500/10 rounded-[4rem] relative overflow-hidden group/final-box">
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 10, repeat: Infinity }}
                              className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full"
                            />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                               <div className="w-24 h-24 rounded-3xl bg-amber-500 flex items-center justify-center text-black shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                                  <Sparkles size={48} />
                               </div>
                               <div className="space-y-4 text-center md:text-left">
                                  <h4 className="text-white font-display text-4xl md:text-6xl tracking-widest italic group-hover/final-box:text-amber-500 transition-colors">Shihab Karuvanpoyil</h4>
                                  <p className="text-gray-400 font-malayalam text-xl leading-relaxed">
                                    ഓരോ വിരുന്നിലും സ്നേഹത്തിന്റേയും രുചിയുടേയും മനോഹരമായ നിമിഷങ്ങൾ ഞങ്ങളിലൂടെ നിലനിൽക്കട്ടെ.
                                  </p>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 30px rgba(245, 158, 11, 0.6)"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-[110] w-14 h-14 bg-amber-500 text-black rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
