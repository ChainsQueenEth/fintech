import { motion } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

import { useDebug } from '@/utils/debug';

const metrics = [
  { label: 'Global transfers', value: '🪙 128K', change: '+34%' },
  { label: 'Savings automation', value: '🤖 92%', change: '+18%' },
  { label: 'Avg. revenue uplift', value: '📈 24%', change: '+6.5%' }
];

export const HeroSection = () => {
  const { log } = useDebug();

  return (
    <section className="relative grid gap-12 px-6 pt-20 pb-14 max-w-[1200px] mx-auto lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-24 lg:pb-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.h1
          {...motionHoverProps(2, 1.005)}
          className="mb-5 text-white font-extrabold leading-[1.05] [font-size:clamp(2.25rem,5vw,3.5rem)] transition hover:-translate-y-0.5 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        >
          Money, moved your way.
        </motion.h1>
        <p className="text-[1.05rem] text-slate-400 max-w-[38ch]">
          VeroVault gives you instant control over spending, saving, and investing—guided by live market
          signals and smart automation.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <motion.button
            type="button"
            {...motionHoverProps(3, 1.01)}
            onClick={() => log('CTA: Explore platform')}
            className="px-7 py-3 rounded-[20px] bg-gradient-to-tr from-blue-600 to-cyan-400 text-slate-900 font-bold shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
          >
            Explore platform
          </motion.button>
          <motion.button
            type="button"
            {...motionHoverProps(3, 1.01)}
            onClick={() => log('CTA: Watch story')}
            className="px-7 py-3 rounded-[20px] border border-slate-400/25 text-white font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
          >
            Watch story
          </motion.button>
        </div>
      </motion.div>
      <motion.article
        {...motionHoverProps(6, 1.02)}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 }}
        className="relative rounded-3xl bg-slate-800/75 p-9 border border-cyan-300/15 backdrop-blur-[30px] shadow-[0_20px_45px_rgba(15,23,42,0.45)] nv-card-hover"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Live wealth signals</p>
        <ul className="mt-7 grid gap-5">
          {metrics.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-white font-semibold gap-4">
              <div>
                {item.value}
                <span className="block text-xs mt-1 text-slate-400">{item.label}</span>
              </div>
              <motion.span
                className="text-emerald-300 text-sm"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {item.change}
              </motion.span>
            </li>
          ))}
        </ul>
      </motion.article>
    </section>
  );
};
