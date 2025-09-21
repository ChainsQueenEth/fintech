 import { screen, render, waitFor } from '@/utils/test-utils';
 import React from 'react';
 
 import { InsightsSection } from '@/components/InsightsSection';
 
 jest.mock('@/services/insightsService', () => {
  return {
    __esModule: true,
    fetchFinancialInsights: jest.fn()
  };
 });
 
 // eslint-disable-next-line @typescript-eslint/no-var-requires
 const { fetchFinancialInsights } = require('@/services/insightsService');

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
    expect(await screen.findByText(/Act on what matters/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Headline/i)).toBeInTheDocument();
  });

  it('renders error state on failure', async () => {
    fetchFinancialInsights.mockRejectedValueOnce(new Error('Network error'));
    render(<InsightsSection />);
    await waitFor(() => {
      expect(
        screen.getByText(/We could not fetch insights right now. Please retry shortly./i)
      ).toBeInTheDocument();
    });
  });
});
