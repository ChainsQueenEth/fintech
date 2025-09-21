import { m } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

const features = [
  {
    title: 'Context-aware accounts',
    description:
      'Segment funds automatically based on goals, pay cycles, and spending behaviours detected across devices.',
    emoji: '🧠'
  },
  {
    title: 'Borderless liquidity',
    description:
      'Multi-currency vaults with real-time FX intelligence. Move faster with no hidden fees and instant settlement.',
    emoji: '🌍'
  },
  {
    title: 'Predictive safeguards',
    description:
      'Fraud defense trained on your patterns. Get proactive alerts, velocity limits, and biometric verifications.',
    emoji: '🛡️'
  }
];

export const FeatureHighlights = () => (
  <section id="features" className="mx-auto max-w-[1200px] px-6 pt-12 pb-8">
    <header className="mb-8 max-w-xl space-y-2">
      <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Experience</p>
      <m.h2
        {...motionHoverProps(2, 1.005)}
        className="text-3xl md:text-4xl font-bold text-white transition hover:-translate-y-0.5 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
      >
        Built for the way money moves now
      </m.h2>
      <p className="text-slate-300">
        Clear, everyday benefits—spend smarter, save automatically, and stay secure.
      </p>
    </header>
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature, index) => (
        <m.article
          key={feature.title}
          {...motionHoverProps(6, 1.02)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: index * 0.12, duration: 0.4 }}
          className="group rounded-[18px] bg-slate-900/80 border border-slate-400/20 p-7 grid gap-2 shadow-[0_20px_45px_rgba(15,23,42,0.45)] nv-card-hover"
        >
          <span
            className="text-3xl transition transform group-hover:-translate-y-0.5 group-hover:rotate-6 group-hover:scale-110"
            role="img"
            aria-label="feature icon"
          >
            {feature.emoji}
          </span>
          <m.h3
            {...motionHoverProps(2, 1.005)}
            className="text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:z-10"
          >
            {feature.title}
          </m.h3>
          <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
        </m.article>
      ))}
    </div>
  </section>
);
