/**
 * Framer Motion Animation Variants
 * 
 * Reusable animation presets for consistent motion design throughout the application
 * All animations use spring physics for natural, premium feel
 */

import { 
  DEFAULT_ANIMATION_DURATION, 
  STAGGER_DELAY, 
  SPRING_STIFFNESS, 
  SPRING_DAMPING 
} from './constants';

/**
 * Fade in and slide up animation
 * Perfect for hero sections, headings, and content reveals
 * 
 * @example
 * <motion.div variants={fadeInUp} initial="hidden" animate="visible">
 *   Content
 * </motion.div>
 */
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: DEFAULT_ANIMATION_DURATION, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Simple fade in animation
 * Ideal for overlays, modals, and subtle content appearances
 * 
 * @example
 * <motion.div variants={fadeIn} initial="hidden" animate="visible">
 *   Content
 * </motion.div>
 */
export const fadeIn = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

/**
 * Scale in animation with fade
 * Great for cards, buttons, and interactive elements
 * Uses spring physics for bouncy, premium feel
 * 
 * @example
 * <motion.div variants={scaleIn} initial="hidden" animate="visible">
 *   Card Content
 * </motion.div>
 */
export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      type: 'spring', 
      stiffness: SPRING_STIFFNESS,
      damping: SPRING_DAMPING
    }
  }
};

/**
 * Stagger container for animating children sequentially
 * Use this on parent elements to create cascading animations
 * 
 * @example
 * <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.div variants={fadeInUp}>Child 1</motion.div>
 *   <motion.div variants={fadeInUp}>Child 2</motion.div>
 * </motion.div>
 */
export const staggerContainer = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.1
    }
  }
};

/**
 * Slide in from right animation
 * Perfect for mobile menus, side panels, and notifications
 * 
 * @example
 * <motion.div variants={slideInFromRight} initial="hidden" animate="visible">
 *   Menu Content
 * </motion.div>
 */
export const slideInFromRight = {
  hidden: { 
    x: 100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Slide in from left animation
 * Useful for navigation elements and content panels
 * 
 * @example
 * <motion.div variants={slideInFromLeft} initial="hidden" animate="visible">
 *   Content
 * </motion.div>
 */
export const slideInFromLeft = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Slide in from top animation
 * Great for dropdowns and top notifications
 * 
 * @example
 * <motion.div variants={slideInFromTop} initial="hidden" animate="visible">
 *   Notification
 * </motion.div>
 */
export const slideInFromTop = {
  hidden: { 
    y: -100, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Slide in from bottom animation
 * Perfect for bottom sheets and toast notifications
 * 
 * @example
 * <motion.div variants={slideInFromBottom} initial="hidden" animate="visible">
 *   Toast Message
 * </motion.div>
 */
export const slideInFromBottom = {
  hidden: { 
    y: 100, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Rotate and scale animation
 * Ideal for loading spinners and attention-grabbing elements
 * 
 * @example
 * <motion.div variants={rotateScale} initial="hidden" animate="visible">
 *   Loading Icon
 * </motion.div>
 */
export const rotateScale = {
  hidden: { 
    opacity: 0, 
    scale: 0, 
    rotate: -180 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      duration: 0.6, 
      type: 'spring', 
      stiffness: SPRING_STIFFNESS 
    }
  }
};

/**
 * Continuous rotation animation
 * Perfect for loading indicators and spinning elements
 * 
 * @example
 * <motion.div animate="spin" variants={spin}>
 *   Spinner
 * </motion.div>
 */
export const spin = {
  spin: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

/**
 * Pulse animation
 * Great for drawing attention to elements or loading states
 * 
 * @example
 * <motion.div animate="pulse" variants={pulse}>
 *   Pulsing Element
 * </motion.div>
 */
export const pulse = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Bounce animation
 * Fun, playful animation for success states or interactive elements
 * 
 * @example
 * <motion.div animate="bounce" variants={bounce}>
 *   Success Icon
 * </motion.div>
 */
export const bounce = {
  bounce: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Shake animation
 * Useful for error states or drawing attention to validation issues
 * 
 * @example
 * <motion.div animate="shake" variants={shake}>
 *   Error Message
 * </motion.div>
 */
export const shake = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
};

/**
 * Hover scale animation
 * Apply to interactive elements for premium hover feedback
 * 
 * @example
 * <motion.button whileHover="hover" variants={hoverScale}>
 *   Button
 * </motion.button>
 */
export const hoverScale = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300
    }
  }
};

/**
 * Tap scale animation
 * Apply to buttons and clickable elements for tactile feedback
 * 
 * @example
 * <motion.button whileTap="tap" variants={tapScale}>
 *   Button
 * </motion.button>
 */
export const tapScale = {
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

/**
 * Progress bar fill animation
 * Smooth animation for confidence bars and progress indicators
 * 
 * @param {number} targetWidth - Target width percentage (0-100)
 * @returns {Object} - Framer Motion animation object
 * 
 * @example
 * <motion.div animate={progressFill(85)} />
 */
export const progressFill = (targetWidth) => ({
  width: `${targetWidth}%`,
  transition: {
    duration: 1,
    ease: 'easeOut',
    delay: 0.3
  }
});

/**
 * Exit animation for removing elements
 * Smooth fade out and scale down
 * 
 * @example
 * <motion.div exit="exit" variants={exitAnimation}>
 *   Content
 * </motion.div>
 */
export const exitAnimation = {
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};
