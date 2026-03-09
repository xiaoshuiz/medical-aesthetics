// TreatmentShowcase unit tests — image fallback (003-homepage-redesign T030)

import { render, screen, fireEvent } from '@testing-library/react';
import TreatmentShowcase from '../TreatmentShowcase';
import type { TreatmentEntry } from '../../../data/homepage-mock';

const mockTreatments: TreatmentEntry[] = [
  {
    id: 'test-1',
    name: 'Test Treatment',
    description: 'A test description.',
    imageUrl: 'https://invalid.example.com/broken-image.jpg',
  },
];

describe('TreatmentShowcase', () => {
  it('renders the section heading', () => {
    render(<TreatmentShowcase treatments={mockTreatments} />);
    expect(screen.getByText('Our Treatments')).toBeInTheDocument();
  });

  it('renders the treatment name', () => {
    render(<TreatmentShowcase treatments={mockTreatments} />);
    expect(screen.getByText('Test Treatment')).toBeInTheDocument();
  });

  it('renders the treatment description', () => {
    render(<TreatmentShowcase treatments={mockTreatments} />);
    expect(screen.getByText('A test description.')).toBeInTheDocument();
  });

  describe('image fallback (T014)', () => {
    it('renders the img element initially', () => {
      render(<TreatmentShowcase treatments={mockTreatments} />);
      const img = screen.getByRole('img', { name: 'Test Treatment' });
      expect(img).toBeInTheDocument();
    });

    it('shows the fallback placeholder and hides the img on onError', () => {
      render(<TreatmentShowcase treatments={mockTreatments} />);
      const img = screen.getByRole('img', { name: 'Test Treatment' });

      // Simulate image load error
      fireEvent.error(img);

      // Fallback div should now appear
      expect(screen.getByTestId('treatment-image-fallback')).toBeInTheDocument();

      // Broken img element should no longer be visible
      expect(screen.queryByRole('img', { name: 'Test Treatment' })).not.toBeInTheDocument();
    });
  });

  it('accepts a custom section title', () => {
    render(<TreatmentShowcase treatments={mockTreatments} title="Featured Services" />);
    expect(screen.getByText('Featured Services')).toBeInTheDocument();
  });
});
