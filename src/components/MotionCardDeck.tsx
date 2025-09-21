import { motion } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

import { useDebug } from '@/utils/debug';

const useCases = [
  {
    title: 'Smart treasury',
    body: 'Automate working capital with liquidity sweeps, P&L forecasting, and treasury guardrails.',
    badge: 'New'
  },
  {
    title: 'Growth capital',
    body: 'Align credit lines with your momentum. Dynamic risk profiling keeps you fully funded.',
    badge: 'Pro'
  },
  {
    title: 'Collaborative accounts',
    body: 'Bring teams together with granular permissions, approval flows, and delegated budgets.',
    badge: 'Teams'
  }
];

export const MotionCardDeck = () => {
  const { log } = useDebug();

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-14">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Playbooks</p>
          <motion.h2
            {...motionHoverProps(2, 1.005)}
            className="text-3xl md:text-4xl font-bold text-white transition hover:-translate-y-0.5 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
          >
            Accelerate treasury, instantly.
          </motion.h2>
          <p className="text-slate-300 max-w-xl">
            Orchestrate cash, risk, and working capital in real time—beautifully simple, everywhere you operate.
          </p>
          <motion.button
            type="button"
            {...motionHoverProps(3, 1.01)}
            onClick={() => log('CTA: Browse playbooks')}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 px-4 py-2 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-500/40 transition hover:-translate-y-0.5 hover:shadow-lg hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
          >
            Browse playbooks
          </motion.button>
        </div>
        <div className="grid gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              {...motionHoverProps(6, 1.02)}
              initial={{ opacity: 0, y: 24, rotate: index % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[20px] bg-slate-900/85 border border-cyan-400/25 p-7 nv-card-hover"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-20%] top-[40%] h-[180px] w-[180px] opacity-75 [background:radial-gradient(circle,rgba(34,211,238,0.45),transparent_65%)] blur-[25px]"
              />
              <span className="mb-3 inline-flex w-fit rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200 transition transform group-hover:-translate-y-0.5 group-hover:scale-105">
                {useCase.badge}
              </span>
              <motion.h3
                {...motionHoverProps(2, 1.005)}
                className="text-xl font-semibold text-white transition hover:-translate-y-0.5 hover:z-10"
              >
                {useCase.title}
              </motion.h3>
              <p className="text-sm leading-relaxed text-slate-300">{useCase.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
