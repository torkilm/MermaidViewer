import React from 'react';
import { CloseIcon } from './Icons';
import { hasGTMConsent, setGTMConsent } from '../utils/gtm';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentChange: (accepted: boolean) => void;
  onNavigateToPrivacy: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onConsentChange,
  onNavigateToPrivacy,
}) => {
  const [currentConsent, setCurrentConsent] =
    React.useState<boolean>(hasGTMConsent());

  React.useEffect(() => {
    setCurrentConsent(hasGTMConsent());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConsentToggle = (accepted: boolean) => {
    setGTMConsent(accepted);
    setCurrentConsent(accepted);
    onConsentChange(accepted);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-2xl shadow-2xl bg-ms-primary-light"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b border-ms-border"
          >
            <h2
              className="text-2xl font-bold text-ms-text-primary"
            >
              Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-ms-text-secondary"
              aria-label="Close settings"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Privacy & Analytics Section */}
            <div>
              <h3
                className="text-lg font-semibold mb-3 text-ms-text-primary"
              >
                Privacy & Analytics
              </h3>

              <div
                className="p-4 rounded-xl mb-4 bg-ms-primary"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p
                      className="font-medium mb-1 text-ms-text-primary"
                    >
                      Analytics Cookies
                    </p>
                    <p
                      className="text-sm text-ms-text-secondary"
                    >
                      Help us improve Mermaid Studio by allowing analytics. Your
                      diagrams remain private and are never sent to our servers.
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => handleConsentToggle(!currentConsent)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      currentConsent
                        ? 'focus:ring-cyan-500 bg-ms-accent'
                        : 'focus:ring-slate-500 bg-ms-border'
                    }`}
                    role="switch"
                    aria-checked={currentConsent}
                    aria-label="Toggle analytics consent"
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        currentConsent ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <p className="text-xs text-ms-text-muted">
                Status: {currentConsent ? 'Accepted' : 'Declined'}
                {' • '}
                {(() => {
                  const consentDate = localStorage.getItem('gtm-consent-date');
                  return consentDate
                    ? `Last updated: ${new Date(consentDate).toLocaleDateString()}`
                    : 'Never updated';
                })()}
              </p>
            </div>

            {/* Information Section */}
            <div
              className="p-4 rounded-xl bg-ms-primary"
            >
              <p
                className="text-sm leading-relaxed text-ms-text-secondary"
              >
                <strong className="text-ms-text-primary">
                  Your Privacy Matters:
                </strong>{' '}
                All diagrams are stored locally in your browser. No data is ever
                sent to our servers. Analytics help us understand usage patterns
                without accessing your content.{' '}
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToPrivacy();
                  }}
                  className="underline hover:opacity-80 text-ms-accent"
                >
                  Read our Privacy Policy
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="p-6 border-t border-ms-border"
          >
            <button
              onClick={onClose}
              className="w-full h-12 font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90 bg-ms-accent text-ms-text-primary"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
