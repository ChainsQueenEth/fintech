import { screen, within } from '@testing-library/react';
import React from 'react';
import { Footer } from '@/components/Footer';
import { render } from '@/utils/test-utils';

describe('Footer', () => {
  it('renders core sections and contact link', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getAllByText(/VeroVault/i).length).toBeGreaterThanOrEqual(1);
    expect(within(footer).getByText(/Need help\?/i)).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /help@verovault.app/i })).toHaveAttribute(
      'href',
      'mailto:help@verovault.app'
    );
    expect(within(footer).getByText(/Legal/i)).toBeInTheDocument();
    expect(within(footer).getByText(/Privacy & security/i)).toBeInTheDocument();
  });
});
