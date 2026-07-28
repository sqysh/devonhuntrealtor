import { Variants } from "framer-motion";

export const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const drawRule: Variants = {
  hidden: { scaleY: 0, scaleX: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};
