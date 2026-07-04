import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Layers, Film, Aperture, Monitor, Clock, 
  Shield, Droplets, Wifi, Gauge, HardDrive, Mic 
} from 'lucide-react';

const PRODUCTS = [
  { id: 'action6', badge: 'New', name: 'Osmo Action 6', tagline: 'Variable Aperture. Bigger Sensor.',
    image: 'https://www-cdn.djiits.com/cms/uploads/ae781cd30b6dc794eb49ad3d44e26845.png',
    specs: [
      { value: '1/1.1" Square CMOS', highlight: true, icon: Camera },
      { value: '13.5 Stops HDR', icon: Layers },
      { value: '4K/60fps · Custom Mode · Low-Light', icon: Film },
      { value: 'f/2.0 – f/4.0', highlight: true, icon: Aperture },
      { value: 'OLED & High-Brightness Display', icon: Monitor },
      { value: '240 min', icon: Clock },
      { value: 'RockSteady 3.0+ · 4K HorizonSteady', icon: Shield },
      { value: '20 m · 60 m (case) · EN13319', icon: Droplets },
      { value: 'Wi-Fi 6.0 · 80 MB/s', icon: Wifi },
      { value: 'Depth & Altitude · Auto Record', icon: Gauge },
      { value: '50 GB', icon: HardDrive },
      { value: 'Gesture & Voice', icon: Mic },
    ] },
  { id: 'action5pro', badge: null, name: 'Osmo Action 5 Pro', tagline: 'Pro Performance. All Terrain.',
    image: 'https://www-cdn.djiits.com/cms/uploads/20dd07025c2d44092cd9dbf76ad1ecb6.png',
    specs: [
      { value: '1/1.3" CMOS', icon: Camera },
      { value: '13.5 Stops HDR', icon: Layers },
      { value: '4K/60fps · Low-Light Imaging', icon: Film },
      { value: 'f/2.8', icon: Aperture },
      { value: 'OLED & High-Brightness Display', icon: Monitor },
      { value: '240 min', icon: Clock },
      { value: 'RockSteady 3.0+ · 2.7K HorizonSteady', icon: Shield },
      { value: '20 m · 60 m (case) · EN13319', icon: Droplets },
      { value: 'Wi-Fi 6.0 · 80 MB/s', icon: Wifi },
      { value: 'Depth & Altitude · Auto Record', icon: Gauge },
      { value: '47 GB', icon: HardDrive },
      { value: 'Voice', icon: Mic },
    ] },
  { id: 'action4', badge: null, name: 'Osmo Action 4', tagline: 'Reliable. Compact. Ready.',
    image: 'https://www-cdn.djiits.com/cms/uploads/c58213b847e85616ccfc9c7a5b57f94f.png',
    specs: [
      { value: '1/1.3" CMOS', icon: Camera },
      { value: '13.5 Stops HDR', icon: Layers },
      { value: '4K/60fps', icon: Film },
      { value: 'f/2.8', icon: Aperture },
      { value: 'LCD · No HDR Display', icon: Monitor },
      { value: '160 min', icon: Clock },
      { value: 'RockSteady 3.0+ · 2.7K HorizonSteady', icon: Shield },
      { value: '18 m · 60 m (case)', icon: Droplets },
      { value: 'Wi-Fi 5.0 · 30 MB/s', icon: Wifi },
      { value: 'N/A', icon: Gauge },
      { value: 'N/A', icon: HardDrive },
      { value: 'Voice', icon: Mic },
    ] },
];

export default function Gallery() {
  const [active, setActive] = useState('action6');

  return (
    <section id="gallery" className="section-padding relative overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f]" aria-labelledby="gallery-heading">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="gallery-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Sản phẩm nào phù hợp với bạn?
          </h2>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 mb-8">
            {PRODUCTS.map((p) => (
              <div key={p.id} className={`text-center flex flex-col items-center p-6 rounded-2xl border ${p.id === 'action6' 
                ? 'bg-white shadow-xl shadow-slate-200/60 border-white dark:bg-white/[0.08] dark:shadow-black/40 dark:border-white/10' 
                : 'bg-white/50 border-slate-200/50 dark:bg-white/[0.02] dark:border-white/5'}`}>
                <div className="h-6 flex items-center mb-4">
                  {p.badge && <span className="px-3 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-semibold tracking-widest uppercase">{p.badge}</span>}
                </div>
                <div className="w-full h-48 flex items-center justify-center mb-4">
                  <img src={p.image} alt={p.name} className="h-full w-auto object-contain drop-shadow-xl" loading="lazy" />
                </div>
                <h3 className={`text-lg font-semibold leading-tight ${p.id === 'action6' ? 'text-slate-950 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {p.name}
                </h3>
                <p className={`text-xs mt-1 ${p.id === 'action6' ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {p.tagline}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200/50 dark:border-white/5 mb-6" />

          {PRODUCTS[0].specs.map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-3 border-b border-slate-200/30 dark:border-white/5">
              {PRODUCTS.map((p) => {
                const specItem = p.specs[rowIdx];
                const Icon = specItem.icon;
                const isNA = specItem.value === 'N/A';
                return (
                  <div key={p.id} className={`py-4 px-4 flex flex-col items-center gap-2 text-center ${p.id === 'action6' ? 'bg-white/50 dark:bg-white/[0.03]' : ''}`}>
                    {Icon && <Icon className={`w-5 h-5 ${p.id === 'action6' ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'}`} />}
                    {isNA ? (
                      <span className="text-slate-300 dark:text-slate-600 text-sm">—</span>
                    ) : (
                      <span className={`text-sm leading-relaxed ${specItem.highlight || p.id === 'action6' ? 'font-semibold text-slate-950 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {specItem.value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="md:hidden">
          <div className="flex rounded-2xl bg-white/60 dark:bg-white/5 p-1 mb-8 gap-1 backdrop-blur-sm">
            {PRODUCTS.map((p) => (
              <button key={p.id} type="button" onClick={() => setActive(p.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${active === p.id ? 'bg-white dark:bg-white/10 text-slate-950 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                {p.name.replace('Osmo ', '')}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {PRODUCTS.filter((p) => p.id === active).map((p) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
                <div className="text-center mb-8">
                  <div className="h-48 flex items-end justify-center mb-6">
                    <img src={p.image} alt={p.name} className="h-full w-auto object-contain drop-shadow-xl" loading="lazy" />
                  </div>
                  {p.badge && <span className="inline-block mb-3 px-3 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-semibold tracking-widest uppercase">{p.badge}</span>}
                  <h3 className={`text-2xl font-bold ${p.id === 'action6' ? 'text-slate-950 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {p.name}
                  </h3>
                  <p className={`text-sm mt-1 ${p.id === 'action6' ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {p.tagline}
                  </p>
                </div>
                <div className={`rounded-2xl border overflow-hidden ${p.id === 'action6' 
                  ? 'bg-white dark:bg-white/[0.05] border-white dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/30' 
                  : 'bg-white/50 dark:bg-white/[0.02] border-slate-200/50 dark:border-white/5'}`}>
                  {p.specs.map((spec, i) => {
                    const Icon = spec.icon;
                    return (
                      <div key={i} className={`flex justify-between items-center gap-4 px-5 py-4 ${i !== p.specs.length - 1 ? 'border-b border-slate-200/30 dark:border-white/5' : ''}`}>
                        <div className="flex items-center gap-3 shrink-0">
                          {Icon && <Icon className={`w-5 h-5 ${p.id === 'action6' ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'}`} />}
                        </div>
                        <span className={`text-sm text-right leading-relaxed ${spec.value === 'N/A' ? 'text-slate-300 dark:text-slate-600' : spec.highlight || p.id === 'action6' ? 'font-semibold text-slate-950 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                          {spec.value === 'N/A' ? '—' : spec.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}