import { motion } from 'framer-motion';
import { FEATURES } from '../../constants/site';
import SectionHeading from '../common/SectionHeading';
import { useRef, useEffect } from 'react';

function getTileSpan(index) {
  const rowIndex = Math.floor(index / 2);
  const isFirstInRow = index % 2 === 0;
  const isEvenRow = rowIndex % 2 === 0;
  const isWide = isEvenRow ? isFirstInRow : !isFirstInRow;
  return isWide ? 'md:col-span-3' : 'md:col-span-2';
}

function VideoBackground({ videoSrc }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);
  return (
    <div className="absolute inset-0">
      <video ref={videoRef} src={videoSrc} className="w-full h-full object-cover" muted loop playsInline autoPlay />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/10" />
    </div>
  );
}

export default function Features() {
  return (
    <section 
      id="features" 
      className="section-padding relative overflow-hidden bg-[#f5f5f7] dark:bg-[#1c1c1e]" 
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent dark:from-white/5 pointer-events-none" aria-hidden="true" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading 
          id="features-heading" 
          title="Tính Năng Nổi Bật"
          description="Osmo Action 6 kết hợp khẩu độ thay đổi đột phá với cảm biến vuông 1/1.1 inch hoàn toàn mới để định nghĩa lại khả năng chụp ảnh hàng đầu của DJI và mở ra nhiều khả năng sáng tạo hơn cho việc quay phim."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 mt-12">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const hasImage = Boolean(feature.image);
            const hasVideo = Boolean(feature.video);
            return (
              <motion.div 
                key={feature.title} 
                initial={{ opacity: 0, y: 24 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-[2rem] overflow-hidden text-center border border-slate-200/50 dark:border-white/5 bg-white/80 dark:bg-surface-raisedDark/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-shadow duration-500 min-h-[340px] flex flex-col ${getTileSpan(index)}`}
              >
                {hasVideo && <VideoBackground videoSrc={feature.video} />}
                {!hasVideo && hasImage && (
                  <div className="absolute inset-0">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/10" />
                  </div>
                )}
                {!hasVideo && !hasImage && (
                  <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brand-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                )}
                <div className={`relative p-8 sm:p-10 flex-1 flex flex-col ${(hasVideo || hasImage) ? 'justify-start' : 'justify-between'}`}>
                  <div>
                    {Icon && !hasVideo && !hasImage && (
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-950/[0.04] dark:bg-white/[0.06] mb-6 group-hover:scale-110 group-hover:bg-brand-500/10 transition-all duration-300">
                        <Icon className="w-6 h-6 text-slate-700 dark:text-white/80 group-hover:text-brand-500 transition-colors duration-300" />
                      </div>
                    )}
                    <h3 className={`font-semibold tracking-tight mb-3 text-2xl sm:text-3xl ${(hasVideo || hasImage) ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
                      {feature.title}
                    </h3>
                  </div>
                  {feature.badge && (
                    <div className="mt-auto pt-8">
                      <span className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border-2 border-brand-500 text-brand-500 text-3xl font-bold">
                        {feature.badge}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}