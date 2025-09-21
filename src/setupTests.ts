import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for JSDOM (used by framer-motion's in-view features)
type IOCallback = (entries: unknown[], observer: unknown) => void;
type IOEntry = unknown;

class MockIntersectionObserver {
  constructor(_callback: IOCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IOEntry[] { return []; }
}

interface GlobalWithIO {
  IntersectionObserver?: unknown;
}

(globalThis as GlobalWithIO).IntersectionObserver = MockIntersectionObserver;
