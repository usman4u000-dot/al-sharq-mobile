import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 15 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -15 }
};

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
