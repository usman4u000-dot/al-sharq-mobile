import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScratchToWinOffer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDrawing = useRef(false);
  
  const discountCode = "SHARQ15OFF";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill canvas with grey overlay
    const fillCanvas = () => {
      ctx.fillStyle = '#94a3b8'; // slate-400
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text on top
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.fillStyle = '#f8fafc'; // slate-50
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Scratch Here for a Surprise', canvas.width / 2, canvas.height / 2);
    };

    fillCanvas();

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;
      
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true;
      e.preventDefault();
      
      const { x, y } = getMousePos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      checkScratchPercentage();
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      e.preventDefault();

      const { x, y } = getMousePos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      checkScratchPercentage();
    };

    const handleEnd = () => {
      isDrawing.current = false;
    };

    const checkScratchPercentage = () => {
      if (isScratched) return;
      
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentPixels++;
      }
      
      const percentage = (transparentPixels / (pixels.length / 4)) * 100;
      
      if (percentage > 40) {
        setIsScratched(true);
        // Clear rest of canvas automatically
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.pointerEvents = 'none';
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isScratched]);

  const copyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-orange/5 pattern-grid-lg opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex w-16 h-16 bg-brand-orange/10 rounded-full items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-brand-orange" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">
            Unlock Your Secret Offer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready for a special discount? Scratch the card below using your mouse or finger to reveal an exclusive promo code for your next repair.
          </p>
        </motion.div>

        <div className="relative max-w-md mx-auto" ref={containerRef}>
          {/* Underlying Revealed Content */}
          <div className="w-full h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 border-2 border-brand-orange border-dashed relative z-0">
            <h3 className="text-xl font-bold text-brand-blue dark:text-white mb-2">You Won 15% OFF!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Applicable on all screen & battery replacements.</p>
            
            <button 
              onClick={copyCode}
              disabled={!isScratched}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold text-lg transition-all ${
                copied 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 cursor-copy'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  {discountCode}
                  <Copy className="w-5 h-5 text-gray-400" />
                </>
              )}
            </button>
          </div>

          {/* Canvas Overlay for Scratching */}
          <canvas
            ref={canvasRef}
            width={400} // Set fixed intrinsic resolution
            height={192} // 48 tailwind height is normally 192px
            className={`absolute top-0 left-0 w-full h-full rounded-2xl cursor-crosshair z-10 transition-opacity duration-700 touch-none shadow-xl ${isScratched ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
