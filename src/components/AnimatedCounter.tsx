import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ end, duration = 2.5, suffix = '', prefix = '', decimals = 0 }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const rounded = useTransform(count, (value) => {
    return prefix + Number(value.toFixed(decimals)).toLocaleString() + suffix;
  });

  useEffect(() => {
    if (isInView) {
      animate(count, end, {
        duration: duration,
        ease: "easeOut"
      });
    }
  }, [count, end, duration, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
