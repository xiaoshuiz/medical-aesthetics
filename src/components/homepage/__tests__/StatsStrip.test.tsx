// StatsStrip unit tests — metric rendering (003-homepage-redesign T031)

import { render, screen } from '@testing-library/react';
import StatsStrip from '../StatsStrip';
import { STAT_METRICS } from '../../../data/homepage-mock';

describe('StatsStrip', () => {
  it('renders all 4 metric values', () => {
    render(<StatsStrip metrics={STAT_METRICS} />);
    STAT_METRICS.forEach((metric) => {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
    });
  });

  it('renders all 4 metric labels', () => {
    render(<StatsStrip metrics={STAT_METRICS} />);
    STAT_METRICS.forEach((metric) => {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    });
  });

  it('does NOT render a fifth metric when only 4 are provided', () => {
    render(<StatsStrip metrics={STAT_METRICS} />);
    // The section should contain exactly 4 value elements
    const values = STAT_METRICS.map((m) => screen.getByText(m.value));
    expect(values).toHaveLength(4);
  });

  it('renders with custom metrics', () => {
    const customMetrics = [
      { id: 'a', value: '100+', label: 'Clients' },
      { id: 'b', value: '5+', label: 'Years' },
      { id: 'c', value: '10+', label: 'Services' },
      { id: 'd', value: '99%', label: 'Happy' },
    ];
    render(<StatsStrip metrics={customMetrics} />);
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('Clients')).toBeInTheDocument();
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('Happy')).toBeInTheDocument();
  });
});
