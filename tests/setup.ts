import '@testing-library/jest-dom';

// Mock IntersectionObserver — not available in jsdom (required by Framer Motion whileInView)
const mockIntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
