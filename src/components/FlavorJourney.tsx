import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoldGlossyText, RevealOnScroll, BlurReveal, LetterReveal } from './AnimationWrappers';
import { ChefHat, Sparkles, Utensils, Zap, Coffee } from 'lucide-react';

const FLAVOR_PROFILES = [
  {
    id: 'coastal',
    name: 'Coastal Soul',
    malayalam: 'തീരദേശ രുചികൾ',
    description: 'Fresh catch from the Arabian Sea, infused with coconut and tamarind.',
    icon: <Sparkles className="w-6 h-6" />,
    color: '#3b82f6', // blue-500
    x: 40,
    y: 70,
    dishes: [
      { name: 'Karimeen Pollichathu', desc: 'Pearl spot fish marinated in spices and grilled in banana leaf.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chemmeen Roast', desc: 'Fiery prawn roast with caramelised onions and curry leaves.', image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=600&q=80' },
      { name: 'Alleppey Fish Curry', desc: 'Traditional seafood curry with raw mango and coconut milk.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'fusion',
    name: 'Global Fusion',
    malayalam: 'ഗ്ലോബൽ ഫ്യൂഷൻ',
    description: 'Traditional ingredients meeting modern global culinary techniques.',
    icon: <Zap className="w-6 h-6" />,
    color: '#8b5cf6', // violet-500
    x: 80,
    y: 65,
    dishes: [
      { name: 'Peri Peri Pathiri', desc: 'Traditional rice pancakes with a spicy Portuguese twist.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80' },
      { name: 'Beef Ulathiyathu Tacos', desc: 'Slow-roasted beef in Mexican-style soft tacos.', image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=600&q=80' },
      { name: 'Cardamom Infused Mousse', desc: 'Dark chocolate mousse with hints of organic Wayanad cardamom.', image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'desserts',
    name: 'Royal Sweets',
    malayalam: 'മധുര ലോകം',
    description: 'The perfect end to every feast. Rich, sweet, and unforgettable.',
    icon: <Coffee className="w-6 h-6" />,
    color: '#ec4899', // pink-500
    x: 10,
    y: 60,
    dishes: [
      { name: 'Mutta Mala', desc: 'String-like egg yolk yolks cooked in sugar syrup.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Saffron Milk Cake', desc: 'A modern dessert rich in Middle Eastern influence.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chatti Pathiri (Sweet)', desc: 'Layered pastry filled with nuts and dried fruits.', image: 'https://images.unsplash.com/photo-1551404973-7bb693325603?auto=format&fit=crop&w=600&q=80' }
    ]
  }
];

export const FlavorJourney = () => {
  const [selectedProfile, setSelectedProfile] = useState(FLAVOR_PROFILES[0]);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <section id="journey" className="py-20 md:py-64 px-6 relative overflow-hidden bg-black sm:snap-start">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,rgba(245,158,11,0.03),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <BlurReveal>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-amber-500/30" />
              <span className="text-amber-500 font-black uppercase tracking-[1em] text-[10px]">Taste Discovery</span>
              <div className="w-12 h-px bg-amber-500/30" />
            </div>
            <h2 className="text-5xl md:text-9xl font-serif font-black italic tracking-tighter mb-8 leading-none overflow-hidden pb-4">
              <GoldGlossyText>
                <LetterReveal text="Flavor Journey" />
              </GoldGlossyText>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-display italic opacity-80 px-4">
              "Discover the map of our culinary heritage, where every coordinate is a memory of taste."
            </p>
          </BlurReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Interactive Map/Diagram */}
          <div className="relative aspect-[4/3] md:aspect-square w-full max-w-xl mx-auto">
            {/* Connection Lines (Constellation Effect) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              {FLAVOR_PROFILES.map((profile, i) => (
                FLAVOR_PROFILES.slice(i + 1).map((next, j) => (
                  <motion.line 
                    key={`line-${i}-${j}`}
                    x1={`${profile.x}%`} 
                    y1={`${profile.y}%`} 
                    x2={`${next.x}%`} 
                    y2={`${next.y}%`}
                    stroke="url(#line-grad)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.2 }}
                  />
                ))
              ))}
            </svg>

            {/* Nodes */}
            {FLAVOR_PROFILES.map((profile) => (
              <motion.div
                key={profile.id}
                className="absolute"
                style={{ left: `${profile.x}%`, top: `${profile.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 * FLAVOR_PROFILES.indexOf(profile) }}
              >
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setIsHovered(profile.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => setSelectedProfile(profile)}
                  className={`relative -ml-6 -mt-6 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center transition-all duration-300 ${
                    selectedProfile.id === profile.id 
                    ? 'bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,0.5)]' 
                    : 'bg-zinc-900/50 text-amber-500/70 hover:text-amber-500'
                  }`}
                >
                  {profile.icon}
                  
                  {/* Aura */}
                  <AnimatePresence>
                    {(selectedProfile.id === profile.id || isHovered === profile.id) && (
                      <motion.div 
                        layoutId="node-aura"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="absolute inset-0 rounded-full border border-amber-500/50 -z-10 bg-amber-500/5"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Label */}
                  <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 pointer-events-none">
                    <div className="whitespace-nowrap flex flex-col items-start translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all">
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">{profile.name}</span>
                       <span className="text-[10px] font-malayalam text-amber-500/60 uppercase">{profile.malayalam}</span>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}

            {/* Orbiting ring for selected item */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute pointer-events-none"
              style={{ 
                left: `${selectedProfile.x}%`, 
                top: `${selectedProfile.y}%`,
                width: '120px',
                height: '120px',
                marginLeft: '-60px',
                marginTop: '-60px',
                borderRadius: '50%',
                border: '1px dashed rgba(245, 158, 11, 0.3)'
              }}
            />
          </div>

          {/* Details Panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProfile.id}
                initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-zinc-950/50 backdrop-blur-xl sm:backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Background Accent */}
                <div 
                  className="absolute -top-20 -right-20 w-64 h-64 blur-[100px] opacity-20 rounded-full"
                  style={{ backgroundColor: selectedProfile.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-black shadow-xl"
                      style={{ backgroundColor: selectedProfile.color || '#f59e0b' }}
                    >
                      {selectedProfile.icon}
                    </div>
                    <div>
                      <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-none mb-2">
                        {selectedProfile.name}
                      </h3>
                      <div className="text-amber-500 text-xl font-malayalam font-semibold tracking-wide italic">
                        {selectedProfile.malayalam}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-lg md:text-xl font-display leading-relaxed italic mb-12 border-l-2 border-amber-500/30 pl-6">
                    {selectedProfile.description}
                  </p>

                  <div className="space-y-6">
                    <h4 className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8">Selection of Masterpieces</h4>
                    <div className="grid grid-cols-1 gap-6">
                      {selectedProfile.dishes.map((dish, i) => (
                        <motion.div 
                          key={dish.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + (i * 0.1) }}
                          className="flex items-center gap-6 group cursor-pointer"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-amber-500/50 transition-colors duration-500">
                            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div>
                            <h5 className="text-white font-serif text-lg mb-1 group-hover:text-amber-500 transition-colors uppercase tracking-tighter">{dish.name}</h5>
                            <p className="text-[11px] text-gray-500 uppercase tracking-widest">{dish.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ x: 10 }}
                    className="mt-16 flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] group transition-all"
                  >
                    Explore Full {selectedProfile.name} Menu
                    <div className="w-8 h-px bg-amber-500 scale-x-100 group-hover:scale-x-150 transform origin-left transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
