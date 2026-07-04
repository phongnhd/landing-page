import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, align = 'center', id }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mb-12 sm:mb-16 ${alignClass}`}
    >
      {label && (
        <span className="inline-block text-brand-400 text-sm font-semibold tracking-wider uppercase mb-3">
          {label}
        </span>
      )}
      <h2 id={id} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-600 dark:text-white/60 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
