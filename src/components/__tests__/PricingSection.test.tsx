import { screen } from '@testing-library/react';
import React from 'react';
import { PricingSection } from '@/components/PricingSection';
import { render } from '@/utils/test-utils';

describe('PricingSection', () => {
  it('renders pricing heading and tiers with CTA', () => {
    render(<PricingSection />);
    expect(screen.getByRole('heading', { name: /Aligned to your growth stage/i })).toBeInTheDocument();

    expect(screen.getByText(/Launch/i)).toBeInTheDocument();
    expect(screen.getByText(/Scale/i)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise/i)).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /Choose plan/i });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});
