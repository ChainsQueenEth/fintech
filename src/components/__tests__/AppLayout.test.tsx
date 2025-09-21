import { screen } from '@testing-library/react';
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { render } from '@/utils/test-utils';

describe('AppLayout', () => {
  it('renders header, footer, debug console trigger, and children', () => {
    render(
      <AppLayout>
        <div>Child content</div>
      </AppLayout>
    );

    // Header brand button
    expect(screen.getByRole('button', { name: /VeroVault home/i })).toBeInTheDocument();
    // Footer landmark should be present
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    // Debug toggle button
    expect(screen.getByRole('button', { name: /debug mode/i })).toBeInTheDocument();
    // Child content
    expect(screen.getByText(/Child content/i)).toBeInTheDocument();
  });
});
