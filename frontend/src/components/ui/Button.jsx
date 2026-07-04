import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40',
  secondary:
    'glass text-slate-950 hover:bg-slate-100 border border-slate-200 dark:text-white dark:hover:bg-white/[0.08] dark:border-white/10',
  ghost: 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/[0.05]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', className = '', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-xl
        transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-surface-dark
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
