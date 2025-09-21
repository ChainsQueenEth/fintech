import { screen } from '@testing-library/react';
import React from 'react';
import { FeatureHighlights } from '@/components/FeatureHighlights';
import { render } from '@/utils/test-utils';

describe('FeatureHighlights', () => {
  it('renders section heading and feature cards', () => {
    render(<FeatureHighlights />);
    expect(screen.getByRole('heading', { name: /Built for the way money moves now/i })).toBeInTheDocument();
    expect(screen.getByText(/Context-aware accounts/i)).toBeInTheDocument();
    expect(screen.getByText(/Borderless liquidity/i)).toBeInTheDocument();
    expect(screen.getByText(/Predictive safeguards/i)).toBeInTheDocument();
  });
});
