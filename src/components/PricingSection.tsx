import { motion } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

const tiers = [
  {
    name: 'Launch',
    price: '$0',
    description: 'Best for indie teams testing new revenue motions.',
    badge: 'Starter',
    features: ['Smart accounts', 'Automated invoicing', 'Expense controls']
  },
  {
    name: 'Scale',
    price: '$39',
    description: 'For product-led organisations scaling worldwide.',
    badge: 'Popular',
    features: ['Multi-entity treasury', 'Predictive cash analytics', 'Priority support']
  },
  {
    name: 'Enterprise',
    price: 'Let’s talk',
    description: 'Customised playbooks, compliance tooling, and dedicated analysts.',
    badge: 'Custom',
    features: ['Dedicated success partner', 'Compliance automation', 'On-premise modules']
  }
];

export const PricingSection = () => (
  <section id="pricing" className="mx-auto max-w-[1200px] px-6 pt-14 pb-20">
    <header className="mb-8 space-y-2">
      <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Pricing</p>
      <motion.h2
        {...motionHoverProps(2, 1.005)}
        className="text-3xl md:text-4xl font-bold text-white transition hover:-translate-y-0.5 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
      >
        Aligned to your growth stage
      </motion.h2>
      <p className="text-slate-300 max-w-2xl">
        Designed with a mobile-first mindset. Each card collapses gracefully while preserving legibility
        and contrast ratios for accessibility.
      </p>
    </header>
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier, index) => (
        <motion.article
          key={tier.name}
          {...motionHoverProps(6, 1.02)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: index * 0.12, duration: 0.4 }}
          className="group rounded-[20px] p-7 bg-slate-900/80 border border-slate-400/20 grid gap-4 shadow-[0_20px_45px_rgba(15,23,42,0.45)] nv-card-hover"
        >
          <span className="inline-flex w-fit rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200 transition transform group-hover:-translate-y-0.5 group-hover:scale-105">
            {tier.badge}
          </span>
          <div>
            <motion.h3
              {...motionHoverProps(2, 1.005)}
              className="text-2xl font-semibold text-white transition hover:-translate-y-0.5 hover:z-10"
            >
              {tier.name}
            </motion.h3>
            <p className="mt-1 text-slate-300 text-sm">{tier.description}</p>
          </div>
          <p className="text-3xl font-bold text-white">{tier.price}</p>
          <ul className="space-y-2 text-sm text-slate-300">
            {tier.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <motion.button
            type="button"
            {...motionHoverProps(3, 1.01)}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
          >
            Choose plan
          </motion.button>
        </motion.article>
      ))}
    </div>
  </section>
);
