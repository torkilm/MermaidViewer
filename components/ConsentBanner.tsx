import React, { useState, useEffect } from 'react';
import { hasGTMConsent, setGTMConsent } from '../utils/gtm';

interface ConsentBannerProps {
  onConsent: (accepted: boolean) => void;
  onNavigateToPrivacy: () => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({
  onConsent,
  onNavigateToPrivacy,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner if user hasn't accepted analytics (includes first-time visitors and those who declined)
    if (!hasGTMConsent()) {
      // Delay slightly for better UX (doesn't interrupt initial render)
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleAccept = () => {
    setGTMConsent(true);
    setIsVisible(false);
    onConsent(true);
  };

  const handleDecline = () => {
    setGTMConsent(false);
    setIsVisible(false);
    onConsent(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe backdrop-blur-md border-t border-ms-border bg-ms-primary/95"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h3
            className="font-bold text-lg mb-2 text-ms-text-primary"
          >
            Analytics & Cookies
          </h3>
          <p
            className="text-sm leading-relaxed text-ms-text-secondary"
          >
            We use analytics to understand how you use Mermaid Studio and
            improve your experience. Your diagrams remain private and are never
            sent to our servers. You can decline analytics and still use all
            features.{' '}
            <button
              onClick={onNavigateToPrivacy}
              className="underline hover:opacity-80 text-ms-accent"
            >
              Learn more in our Privacy Policy
            </button>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 h-12 font-semibold rounded-xl transition-all active:scale-[0.98] bg-ms-primary-lighter hover:bg-ms-border-light text-ms-text-secondary"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 h-12 font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98] bg-ms-accent hover:bg-ms-accent-hover text-ms-text-primary"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
};
