import { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { SITE } from '../../constants/site';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import Button from '../ui/Button';
import VideoModal from '../ui/VideoModal';

const PRODUCT_IMAGE = 'https://www-cdn.djiits.com/dps/ea3c067625b95ed7f8f07ed1f5eb7a3b@origin.jpg?w=3840&h=2160';
const VIDEO_URL = 'https://cdn.djivideos.com/watch/558ca777-edee-4505-875d-05fac7ebb277?autoplay=false&poster=http://videocaption.djicdn.com/poster/20251113/c9c2227d7a813403e4ea7ccc28e05f98.jpeg@!1200';

export default function Hero() {
  const scrollTo = useScrollToSection();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const handleOpenVideo = () => setIsVideoOpen(true);
  const handleCloseVideo = () => setIsVideoOpen(false);

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-start overflow-hidden bg-black" aria-labelledby="hero-heading">
        <img src={PRODUCT_IMAGE} alt={`${SITE.name} ${SITE.tagline}`} loading="eager" fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <h1 id="hero-heading" className="text-2xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-4 text-white">
              {SITE.name} <span className="text-gradient">{SITE.tagline}</span>
            </h1>
            {/* 2 nút nằm ngang trên mobile */}
            <div className="flex flex-row gap-3 w-full max-w-[320px] sm:max-w-none sm:w-auto">
              <Button size="sm" className="flex-1 sm:flex-none" onClick={() => scrollTo('#newsletter')}>
                {SITE.cta}
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 sm:flex-none" onClick={handleOpenVideo}>
                <Play className="w-3 h-3" aria-hidden="true" /> {SITE.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center text-white/40"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-l sm:text-sm font-light tracking-[0.1em] uppercase">
              Square Up , Nail the Move
            </span>
          </div>
          <div className="mt-3 flex flex-col items-center gap-2">
            <span className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </motion.div>
      </section>
      <VideoModal isOpen={isVideoOpen} onClose={handleCloseVideo} videoUrl={VIDEO_URL} />
    </>
  );
}