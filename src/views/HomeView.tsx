import { Fragment, Suspense, lazy } from 'react';

import { HeroSection } from '@/components/HeroSection';

const FeatureHighlights = lazy(() =>
  import('@/components/FeatureHighlights').then((m) => ({ default: m.FeatureHighlights }))
);
const MotionCardDeck = lazy(() =>
  import('@/components/MotionCardDeck').then((m) => ({ default: m.MotionCardDeck }))
);
const InsightsSection = lazy(() =>
  import('@/components/InsightsSection').then((m) => ({ default: m.InsightsSection }))
);
const PricingSection = lazy(() =>
  import('@/components/PricingSection').then((m) => ({ default: m.PricingSection }))
);

export const HomeView = () => (
  <Fragment>
    <HeroSection />
    <Suspense fallback={<div className="px-6 py-10 text-slate-300">Loading…</div>}>
      <FeatureHighlights />
    </Suspense>
    <Suspense fallback={<div className="px-6 py-10 text-slate-300">Loading…</div>}>
      <MotionCardDeck />
    </Suspense>
    <Suspense fallback={<div className="px-6 py-10 text-slate-300">Loading…</div>}>
      <InsightsSection />
    </Suspense>
    <Suspense fallback={<div className="px-6 py-10 text-slate-300">Loading…</div>}>
      <PricingSection />
    </Suspense>
  </Fragment>
);
