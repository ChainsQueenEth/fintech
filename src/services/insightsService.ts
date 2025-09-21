 import { z } from 'zod';
 import { api, parseWith, isApiConfigured } from './api-client';

const insightSchema = z.object({
  id: z.string(),
  headline: z.string(),
  impact: z.enum(['positive', 'neutral', 'negative']),
  delta: z.number(),
  updatedAt: z.string()
});

 export type Insight = {
  id: string;
  headline: string;
  impact: 'positive' | 'neutral' | 'negative';
  delta: number;
  updatedAt: string;
};

const mockInsights: Insight[] = [
  {
    id: 'cashflow',
    headline: 'Cash flow runway extended by 5.4 months',
    impact: 'positive',
    delta: 5.4,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'spend',
    headline: 'Marketing spend efficiency improved 12%',
    impact: 'positive',
    delta: 12,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'risk',
    headline: 'Transaction risk alerts down 32% week-over-week',
    impact: 'positive',
    delta: -32,
    updatedAt: new Date().toISOString()
  }
];

 export const fetchFinancialInsights = async (): Promise<Insight[]> => {
  // If API is configured, hit the endpoint; otherwise use local mock
  if (isApiConfigured) {
    const data = await api.get<unknown>('/insights');
    return parseWith(z.array(insightSchema), data);
  }

  await new Promise((resolve) => setTimeout(resolve, 420));
  return mockInsights.map((insight) => ({
    ...insight,
    updatedAt: new Date().toISOString()
  }));
 };
