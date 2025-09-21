import { screen } from '@testing-library/react';

import { HeroSection } from '@/components/HeroSection';
import { render } from '@/utils/test-utils';

describe('HeroSection', () => {
  it('renders the hero headline and actions', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { name: /Money, moved your way\./i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /explore platform/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /watch story/i })).toBeInTheDocument();
  });
});
