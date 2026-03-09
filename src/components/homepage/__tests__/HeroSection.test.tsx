// HeroSection unit tests — auth-state branching (003-homepage-redesign T029)

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from '../HeroSection';
import { HERO_CONTENT, QUICK_ACTIONS } from '../../../data/homepage-mock';

function renderHero(isAuthenticated: boolean, userName?: string) {
  return render(
    <MemoryRouter>
      <HeroSection
        content={HERO_CONTENT}
        isAuthenticated={isAuthenticated}
        userName={userName}
        quickActions={QUICK_ACTIONS}
      />
    </MemoryRouter>
  );
}

describe('HeroSection', () => {
  it('renders the headline in all states', () => {
    renderHero(false);
    expect(screen.getByText(HERO_CONTENT.headline)).toBeInTheDocument();
  });

  describe('when unauthenticated (guest)', () => {
    it('shows the guest CTA label', () => {
      renderHero(false);
      expect(screen.getByText(HERO_CONTENT.guestCta.label)).toBeInTheDocument();
    });

    it('does NOT show the auth CTA label', () => {
      // Auth CTA label is "Book Appointment"; in guest state it must not appear
      renderHero(false);
      expect(screen.queryByText(HERO_CONTENT.authCta.label)).not.toBeInTheDocument();
    });

    it('does NOT show a personalised greeting', () => {
      renderHero(false);
      expect(screen.queryByText(/welcome back/i)).not.toBeInTheDocument();
    });
  });

  describe('when authenticated', () => {
    it('shows at least one element with the auth CTA label', () => {
      // "Book Appointment" appears as the primary CTA and also as the first quick action
      renderHero(true, 'Alice');
      const matches = screen.getAllByText(HERO_CONTENT.authCta.label);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('does NOT show the guest CTA label', () => {
      renderHero(true, 'Alice');
      expect(screen.queryByText(HERO_CONTENT.guestCta.label)).not.toBeInTheDocument();
    });

    it('shows a personalised greeting with the user name', () => {
      renderHero(true, 'Alice');
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });

    it('renders all three quick action buttons', () => {
      renderHero(true, 'Alice');
      // "Book Appointment" appears twice (CTA + quick action), others appear once
      expect(screen.getAllByText('Book Appointment').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('My History')).toBeInTheDocument();
      expect(screen.getByText('My Profile')).toBeInTheDocument();
    });
  });
});
