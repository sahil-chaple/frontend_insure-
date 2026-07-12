import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../components/LoadingAnimation';

/**
 * SplashPage — shown on initial load.
 * Navigates to /login when the animation completes (or after the safety-net timeout).
 *
 * To swap in your real Lottie asset from Jitter:
 *   1. Drop the .json file into src/assets/ (e.g. loading-animation.json)
 *   2. Uncomment the import below and pass `animationData={myAnimation}` to <LoadingAnimation>
 */
// import myAnimation from '../assets/loading-animation.json';

export default function SplashPage() {
  const navigate = useNavigate();

  const handleAnimationComplete = useCallback(() => {
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-accent-600/20 rounded-full blur-3xl pointer-events-none" />

      <LoadingAnimation
        // animationData={myAnimation}  ← uncomment when you have the real Lottie file
        onComplete={handleAnimationComplete}
        timeout={2500}
      />
    </div>
  );
}
