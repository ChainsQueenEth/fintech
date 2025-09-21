import { MotionProps, Transition } from 'framer-motion';

// Shared transition tuned for UI hover/tap interactions
export const uiTransition: Transition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1], // easeOutQuint-ish
};

// Motion props to add subtle lift/scale on hover and tap
// Tailwind handles shadows and z-index via classes (e.g., hover:shadow-2xl hover:z-10)
export const motionHoverProps = (
  elevatePx = 4,
  hoverScale = 1.02,
  tapScale = 0.98,
): MotionProps => ({
  initial: { y: 0, scale: 1 },
  whileHover: { y: -elevatePx, scale: hoverScale, transition: uiTransition },
  whileFocus: { y: -elevatePx, scale: hoverScale, transition: uiTransition },
  whileTap: { scale: tapScale, y: Math.max(-elevatePx + 1, -1), transition: { ...uiTransition, duration: 0.14 } },
  style: { willChange: 'transform' },
});
