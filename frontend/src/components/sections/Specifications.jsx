import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Specifications() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const h2Opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.3, 0.5], [0, 1, 1, 0]);
  const pOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const bottomGradientOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 2.6]);

  return (
    <div ref={containerRef} style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" id="specs" aria-labelledby="specs-heading">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`relative w-full h-full ${isMobile ? 'bg-black md:px-0' : ''}`}>
            <motion.img src="https://www-cdn.djiits.com/dps/213511bcef67078c2ea09e023974d0ce.jpg?w=3840&h=2160"
              alt="DJI Osmo Action 6 Background" className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover'}`}
              loading="eager" fetchPriority="high"
              style={{ scale: isMobile ? mobileScale : imgScale, opacity: 1 }} />
          </div>
          <div className="absolute inset-0 bg-black/20" />
          <motion.div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{ opacity: bottomGradientOpacity, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)' }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/10 z-20" />
        <div className="relative z-10 h-full flex items-start justify-center pt-20 md:pt-24 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center relative">
              <motion.h2 id="specs-heading" style={{ opacity: h2Opacity }}
                className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl ${isMobile ? 'pt-20' : ''}`}>
                DJI's First Variable Aperture Action <br /> Camera
              </motion.h2>
              <motion.p style={{ opacity: pOpacity, position: 'absolute', top: 0, left: 0, right: 0 }}
                className={`max-w-[100ch] mx-auto text-base md:text-lg leading-relaxed text-center text-white/80 mt-10 drop-shadow-lg ${isMobile ? 'pt-20' : ''}`}>
                As DJI's first action camera with a variable aperture of f/2.0<sup> [4]</sup> -f/4.0, Osmo Action 6 breaks away from the traditional fixed-aperture design and offers aperture modes that suit a wide range of scenarios <sup>[4]</sup>.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}