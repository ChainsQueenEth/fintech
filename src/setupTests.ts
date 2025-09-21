import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for JSDOM (used by framer-motion's in-view features)
class MockIntersectionObserver {
  constructor(private _callback: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

(globalThis as any).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
