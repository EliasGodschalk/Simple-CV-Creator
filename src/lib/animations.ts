/**
 * Animation Constants
 * Standardized Framer Motion transitions and variants for application-wide consistency.
 */

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  restDelta: 0.001
} as const;

export const slowSpring = {
  type: "spring",
  stiffness: 50,
  damping: 20
} as const;

export const microSpring = {
  type: "spring",
  stiffness: 300,
  damping: 30
} as const;

export const standardEase = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1]
};

export const staggeredContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggeredItem = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springTransition
  }
};

export const buttonPress = {
  whileTap: { scale: 0.98, y: 1 },
  whileHover: { scale: 1.02 }
};
