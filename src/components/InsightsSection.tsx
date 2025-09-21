import { useQuery } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { motionHoverProps } from '@/design-system/motion/motion-presets';

import { fetchFinancialInsights } from '@/services/insightsService';
import { useDebug } from '@/utils/debug';

export const InsightsSection = () => {
  const { log } = useDebug();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['insights'],
    queryFn: fetchFinancialInsights,
    refetchInterval: process.env.NODE_ENV === 'test' ? false : 15_000,
    staleTime: 10_000
  });

  if (isLoading) {
    return (
      <section id="insights" className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid place-items-center rounded-[18px] border border-cyan-400/30 bg-slate-900/60 px-6 py-12">
          Loading personalised insights…
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section id="insights" className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid place-items-center rounded-[18px] border border-cyan-400/30 bg-slate-900/60 px-6 py-12">
          We could not fetch insights right now. Please retry shortly.
        </div>
      </section>
    );
  }

  return (
    <section id="insights" className="mx-auto max-w-[1200px] px-6 py-14">
      <header className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Insights</p>
        <m.h2
          {...motionHoverProps(2, 1.005)}
          className="text-3xl font-bold text-white transition hover:-translate-y-0.5 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        >
          Act on what matters
        </m.h2>
        <p className="text-slate-300 max-w-2xl">
          Smart insights show what’s changing and what to do next—so you can move first with confidence.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {data.map((insight, index) => (
          <m.article
            key={insight.id}
            {...motionHoverProps(6, 1.02)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group rounded-[18px] p-6 bg-slate-900/80 border border-cyan-400/25 shadow-[0_20px_45px_rgba(15,23,42,0.45)] nv-card-hover"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-300 transition transform group-hover:-translate-y-0.5 group-hover:scale-105">
              {insight.id}
            </p>
            <m.h3
              {...motionHoverProps(2, 1.005)}
              className="mt-2 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:z-10"
            >
              {insight.headline}
            </m.h3>
            <p className="mt-3 text-xs text-slate-400">
              Updated {new Date(insight.updatedAt).toLocaleTimeString()} — impact{' '}
              <span className="text-emerald-300">{insight.impact}</span>
            </p>
            <m.button
              type="button"
              {...motionHoverProps(3, 1.01)}
              onClick={() => log('Insight opened', insight)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900/50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-200 ring-1 ring-cyan-500/40 transition hover:-translate-y-0.5 hover:shadow-lg hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
            >
              Investigate signal
            </m.button>
          </m.article>
        ))}
      </div>
    </section>
  );
}

