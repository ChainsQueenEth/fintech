import { m } from 'framer-motion';

export const LoadingScreen = () => (
  <div role="status" aria-live="polite" className="grid place-items-center px-6 py-24">
    <m.span
      className="block h-[52px] w-[52px] rounded-full border-2 border-cyan-400/35 border-t-blue-600/95"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
    />
  </div>
);
