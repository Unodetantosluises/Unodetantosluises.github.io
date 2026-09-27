import { useState, useEffect } from 'react';

/**
 * Hook to calculate proportional canvas scale based on viewport dimensions.
 * Maintains fixed design coordinate systems (desktop: 1920x908, mobile: 720x1600)
 * while ensuring an intentional 80% default zoom appearance.
 */
export const useCanvasScale = (baseWidth = 1920, baseHeight = 908) => {
  const [scaleState, setScaleState] = useState({
    scale: 1,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw <= 768;

      if (mobile) {
        // Mobile design canvas: 720 x 1600
        const scaleX = vw / 720;
        const scaleY = vh / 1600;
        const s = Math.min(scaleX, scaleY);
        setScaleState({
          scale: s,
          isMobile: true,
        });
      } else {
        // Desktop design canvas: 1920 x 908
        // User requested the spacious 80% zoom look by default:
        // A standard 1080p screen at 80% zoom offers ~2400px width.
        // We calculate scale relative to standard 1920 with 0.8 base ratio:
        const targetCanvasW = 1920 / 0.8; // 2400px
        const targetCanvasH = 908 / 0.8;  // 1135px

        const scaleX = vw / targetCanvasW;
        const scaleY = vh / targetCanvasH;
        const s = Math.min(scaleX, scaleY);

        setScaleState({
          scale: s,
          isMobile: false,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [baseWidth, baseHeight]);

  return scaleState;
};

export default useCanvasScale;
