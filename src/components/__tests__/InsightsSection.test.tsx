 // Neutralize framer-motion in tests so whileInView/animations don't affect rendering
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    __esModule: true,
    motion: new Proxy(
      {},
      {
        get: () => (props: any) => React.createElement('div', props, props.children)
      }
    )
  };
});

jest.mock('@/services/insightsService', () => {
  return {
    __esModule: true,
    fetchFinancialInsights: jest.fn()
  };
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fetchFinancialInsights } = require('@/services/insightsService');

import { screen, render, waitFor } from '@/utils/test-utils';
import { waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { InsightsSection } from '@/components/InsightsSection';

describe('InsightsSection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    fetchFinancialInsights.mockImplementation(() => new Promise(() => {}));
    render(<InsightsSection />);
    expect(screen.getByText(/Loading personalised insights…/i)).toBeInTheDocument();
  });

  it('renders data on success', async () => {
    fetchFinancialInsights.mockResolvedValueOnce([
      { id: 'cashflow', headline: 'Test Headline', impact: 'positive', delta: 1, updatedAt: new Date().toISOString() }
    ]);
    render(<InsightsSection />);
    // Ensure the query fired and the resolved data is rendered
    await waitFor(() => expect(fetchFinancialInsights).toHaveBeenCalled());
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading personalised insights…/i));
    expect(screen.getByText(/Test Headline/i)).toBeInTheDocument();
  });

  it('renders error state on failure', async () => {
    fetchFinancialInsights.mockRejectedValueOnce(new Error('Network error'));
    render(<InsightsSection />);
    expect(
      await screen.findByText(/We could not fetch insights right now. Please retry shortly./i)
    ).toBeInTheDocument();
  });
});
