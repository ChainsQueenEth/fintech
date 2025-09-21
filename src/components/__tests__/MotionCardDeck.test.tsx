import { screen } from '@testing-library/react';
import React from 'react';
import { MotionCardDeck } from '@/components/MotionCardDeck';
import { render } from '@/utils/test-utils';

describe('MotionCardDeck', () => {
  it('renders heading, CTA, and use case cards', () => {
    render(<MotionCardDeck />);
    expect(screen.getByRole('heading', { name: /Accelerate treasury, instantly\./i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /browse playbooks/i })).toBeInTheDocument();

    expect(screen.getByText(/Smart treasury/i)).toBeInTheDocument();
    expect(screen.getByText(/Growth capital/i)).toBeInTheDocument();
    expect(screen.getByText(/Collaborative accounts/i)).toBeInTheDocument();
  });
});
