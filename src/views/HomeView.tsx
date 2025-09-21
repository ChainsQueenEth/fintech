import { Fragment } from 'react';

import { FeatureHighlights } from '@/components/FeatureHighlights';
import { HeroSection } from '@/components/HeroSection';
import { InsightsSection } from '@/components/InsightsSection';
import { MotionCardDeck } from '@/components/MotionCardDeck';
import { PricingSection } from '@/components/PricingSection';

export const HomeView = () => (
  <Fragment>
    <HeroSection />
    <FeatureHighlights />
    <MotionCardDeck />
    <InsightsSection />
    <PricingSection />
  </Fragment>
);
