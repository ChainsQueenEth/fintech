import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

import { useDebug } from '@/utils/debug';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Insights', href: '#insights' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support', href: '#support' }
];

export const Header = () => {
  const { log } = useDebug();
  const [isCondensed, setIsCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const shouldCondense = window.scrollY > 32;
      setIsCondensed(shouldCondense);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-10 backdrop-blur-md bg-slate-900/60 border-b border-white/5"
      animate={{ paddingTop: isCondensed ? 0 : 16, paddingBottom: isCondensed ? 0 : 16 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <nav className="mx-auto flex items-center justify-between max-w-[1200px] px-5 py-3 md:px-8 md:py-4">
        <motion.button
          {...motionHoverProps(3, 1.01)}
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            log('Brand clicked');
          }}
          aria-label="VeroVault home"
          className="group flex items-center gap-2 text-white font-bold text-[1.2rem] transition hover:-translate-y-0.5 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-[12px] bg-gradient-to-tr from-blue-600 to-cyan-400 text-slate-900 text-[0.9rem] shadow-lg shadow-blue-600/20 transition group-hover:shadow-xl group-hover:scale-105">
            VV
          </span>
          VeroVault
        </motion.button>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => log(`Navigate to ${item.label}`)}
              className="text-[0.95rem] text-slate-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <motion.button
          {...motionHoverProps(3, 1.01)}
          onClick={() => log('Call-to-action: Get started')}
          className="inline-flex items-center gap-2 rounded-[12px] px-3 py-2 font-semibold text-slate-900 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
        >
          Get started
        </motion.button>
      </nav>
    </motion.header>
  );
};
