import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoldGlossyText, BlurReveal, MagneticWrapper } from './AnimationWrappers';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationState {
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<ValidationState>({
    name: null,
    email: null,
    phone: null,
    message: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = null;
    switch (name) {
      case 'name':
        if (value.length > 0 && value.length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        if (value.length > 0 && !/^\+?[\d\s-]{10,}$/.test(value)) error = 'Please enter a valid phone number';
        break;
      case 'message':
        if (value.length > 0 && value.length < 10) error = 'Message is too short';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    const newErrors: ValidationState = {
      name: formData.name.length < 3 ? 'Name is required' : null,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Valid email is required' : null,
      phone: formData.phone.length < 10 ? 'Valid phone is required' : null,
      message: formData.message.length < 10 ? 'Message is required' : null
    };

    if (Object.values(newErrors).some(err => err !== null)) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 md:py-64 px-6 relative overflow-hidden bg-black sm:snap-start">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-0 w-[50vw] h-[50vw] bg-amber-500/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-zinc-900/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Info Side */}
          <div>
            <BlurReveal>
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-amber-500/30" />
                <h4 className="text-amber-500 font-bold uppercase tracking-[0.8em] text-[10px]">Contact Us</h4>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif font-light mb-12 tracking-tighter uppercase leading-none">
                Start your <br />
                <span className="italic opacity-40">Culinary Journey</span>
              </h2>
              
              <div className="space-y-12 mb-16">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: 'Email Us', value: 'varietycatering@gmail.com', link: 'mailto:varietycatering@gmail.com' },
                  { icon: <Phone className="w-5 h-5" />, label: 'Call Us', value: '+91 93498 10267', link: 'tel:+919349810267' },
                  { icon: <MapPin className="w-5 h-5" />, label: 'Visit Us', value: 'Karuvanpoyil, Kozhikode, Kerala', link: '#' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-8 group"
                  >
                    <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center bg-zinc-900/50 group-hover:border-amber-500/50 transition-colors">
                      <div className="text-amber-500">{item.icon}</div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-1">{item.label}</p>
                      <a href={item.link} className="text-xl md:text-2xl font-display font-medium text-white hover:text-amber-500 transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 backdrop-blur-xl sm:backdrop-blur-3xl">
                <p className="text-gray-400 italic font-display text-xl leading-relaxed">
                  "We believe that every message is the beginning of a beautiful celebration. Reach out, and let us craft something legendary together."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/30">
                    <img src="https://i.postimg.cc/mD7XFp9T/Variety-Logo.png" alt="Shihab" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-widest text-white">Shihab</span>
                    <span className="block text-[9px] uppercase tracking-widest text-amber-500/60">Founder, Variety Catering</span>
                  </div>
                </div>
              </div>
            </BlurReveal>
          </div>

          {/* Form Side */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-zinc-950/50 backdrop-blur-xl sm:backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl relative"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-4xl font-serif font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-gray-400 mb-10 max-w-xs mx-auto">We've received your inquiry and will get back to you with celestial flavors soon.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] hover:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Name Field */}
                      <div className="relative">
                        <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-3 ml-2">Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`w-full bg-zinc-900/50 border ${errors.name ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-display text-lg`}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.span 
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute top-full left-2 mt-1 text-[10px] text-red-500 flex items-center gap-1"
                            >
                              <AlertCircle size={10} /> {errors.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-3 ml-2">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email address"
                          className={`w-full bg-zinc-900/50 border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-display text-lg`}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.span 
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute top-full left-2 mt-1 text-[10px] text-red-500 flex items-center gap-1"
                            >
                              <AlertCircle size={10} /> {errors.email}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="relative">
                      <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-3 ml-2">Phone Number</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXX XXX XXX"
                        className={`w-full bg-zinc-900/50 border ${errors.phone ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-display text-lg`}
                      />
                      <AnimatePresence>
                        {errors.phone && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-full left-2 mt-1 text-[10px] text-red-500 flex items-center gap-1"
                          >
                            <AlertCircle size={10} /> {errors.phone}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-3 ml-2">Your Message</label>
                      <textarea 
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your event..."
                        className={`w-full bg-zinc-900/50 border ${errors.message ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-display text-lg`}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.span 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-full left-2 mt-1 text-[10px] text-red-500 flex items-center gap-1"
                          >
                            <AlertCircle size={10} /> {errors.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <MagneticWrapper strength={0.2} className="w-full">
                      <motion.button
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-16 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 transition-all hover:bg-white disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Send Message
                            <Send size={16} />
                          </>
                        )}
                      </motion.button>
                    </MagneticWrapper>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
