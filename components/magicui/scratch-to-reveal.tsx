"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface ScratchToRevealProps {
  width: number;
  height: number;
  minScratchPercentage: number;
  children: ReactNode;
  className?: string;
  onReveal?: () => void;
}

export function ScratchToReveal({
  width,
  height,
  minScratchPercentage,
  children,
  className = "",
  onReveal
}: ScratchToRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#8B5CF6');
    gradient.addColorStop(0.3, '#A855F7');
    gradient.addColorStop(0.6, '#C084FC');
    gradient.addColorStop(1, '#DDD6FE');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add metallic overlay pattern
    const overlayGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
    overlayGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
    overlayGradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
    overlayGradient.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = overlayGradient;
    ctx.fillRect(0, 0, width, height);

    // Add decorative dots pattern
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let x = 20; x < width; x += 40) {
      for (let y = 20; y < height; y += 40) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Add main text with glow effect
    ctx.shadowColor = 'rgba(255,255,255,0.8)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎁 SCRATCH TO REVEAL', width / 2, height / 2 - 20);
    
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#F3E8FF';
    ctx.fillText('Your Coding Challenge!', width / 2, height / 2 + 15);
    
    // Add sparkle effects
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FBBF24';
    ctx.font = '16px Arial';
    ctx.fillText('✨', width / 2 - 80, height / 2 - 40);
    ctx.fillText('✨', width / 2 + 80, height / 2 - 40);
    ctx.fillText('⭐', width / 2 - 60, height / 2 + 50);
    ctx.fillText('⭐', width / 2 + 60, height / 2 + 50);
  }, [width, height]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Check if enough has been scratched
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const scratchedPercentage = (transparentPixels / (width * height)) * 100;
    
    if (scratchedPercentage >= minScratchPercentage && !isRevealed) {
      setIsRevealed(true);
      onReveal?.();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isScratching || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        scratch(x, y);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsScratching(false);
    };

    if (isScratching) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isScratching, width, height]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      scratch(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isScratching) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      scratch(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(false);
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div className="absolute inset-0">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        style={{ width, height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}