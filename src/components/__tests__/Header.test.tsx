import { screen } from '@testing-library/react';
import React from 'react';
import { Header } from '@/components/Header';
import { render } from '@/utils/test-utils';

describe('Header', () => {
  it('renders nav items and CTA', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /VeroVault home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /insights/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /support/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });
});
