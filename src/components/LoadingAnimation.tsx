import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useRef, useEffect } from 'react';

interface LoadingAnimationProps {
  /** Optional Lottie JSON data. If omitted, a CSS placeholder is shown. */
  animationData?: object;
  /** Called when the animation completes (or when placeholder timer fires). */
  onComplete?: () => void;
  /** Max duration in ms before onComplete is forcibly called (safety net). Defaults to 3000. */
  timeout?: number;
}

/**
 * LoadingAnimation — swappable between:
 *  1. A real Lottie JSON (import & pass as `animationData`)
 *  2. An animated SVG (render inline as children — future extension)
 *  3. A branded CSS placeholder (default when no animationData given)
 *
 * To swap in your real Jitter/SVGator asset:
 *   import myAnimation from './assets/loading.json';
 *   <LoadingAnimation animationData={myAnimation} onComplete={...} />
 */
export default function LoadingAnimation({
  animationData,
  onComplete,
  timeout = 3000,
}: LoadingAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Safety-net timeout so the screen always advances even if onComplete never fires
  useEffect(() => {
    const id = setTimeout(() => {
      onComplete?.();
    }, timeout);
    return () => clearTimeout(id);
  }, [onComplete, timeout]);

  if (animationData) {
    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay
        onComplete={onComplete}
        style={{ width: 220, height: 220 }}
      />
    );
  }

  // ── Branded CSS placeholder ──────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      {/* Animated brand logo */}
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-brand-500/30 animate-spin-slow" />
        {/* Inner pulse */}
        <div className="absolute inset-3 rounded-full border-4 border-accent-500/60 animate-ping" />
        {/* Center icon */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/40">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8 text-white"
            aria-hidden="true"
          >
            <path
              d="M12 2L3 7v5c0 4.97 3.85 9.63 9 10.93C17.15 21.63 21 16.97 21 12V7L12 2z"
              fill="currentColor"
              fillOpacity="0.9"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand name + tagline */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
          InsureAI
        </h1>
        <p className="mt-1 text-sm text-slate-400 tracking-widest uppercase">
          Smart Protection
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
          style={{
            animation: `progress ${timeout}ms ease-out forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}
