import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorXOutline = useSpring(-100, { stiffness: 200, damping: 25 });
  const cursorYOutline = useSpring(-100, { stiffness: 200, damping: 25 });

  useEffect(() => {
    // Hide default cursor completely, and only run on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorXOutline.set(e.clientX);
      cursorYOutline.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');
        
      setIsHovering(!!isClickable);
      
      // Update body cursor conditionally to overcome overriding elements
      if (isClickable) {
        document.body.style.cursor = 'none';
        target.style.cursor = 'none';
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, cursorXOutline, cursorYOutline]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brand-orange rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-brand-orange rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXOutline,
          y: cursorYOutline,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(249, 115, 22, 0.5)' : 'rgba(249, 115, 22, 1)'
        }}
      />
    </>
  );
}
