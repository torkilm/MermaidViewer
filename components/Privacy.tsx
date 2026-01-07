import React from 'react';
import { COLORS } from '../constants';
import { CloseIcon } from './Icons';

interface PrivacyProps {
  onBack: () => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
  return (
    <div 
      className="min-h-screen overflow-auto"
      style={{ backgroundColor: COLORS.primary.base }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-10 border-b"
        style={{ 
          backgroundColor: COLORS.primary.base,
          borderColor: COLORS.border.base 
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 
            className="text-2xl font-bold"
            style={{ color: COLORS.text.primary }}
          >
            Privacy Policy
          </h1>
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            style={{ color: COLORS.text.secondary }}
            aria-label="Back to app"
            title="Back to app"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 pb-24">
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: COLORS.text.secondary }}
            >
              At Mermaid Studio, we take your privacy seriously. This page explains how we handle your data 
              and what information is collected when you use our service.
            </p>
          </section>

          {/* Local Storage */}
          <section>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: COLORS.text.primary }}
            >
              Your Diagrams Stay Private
            </h2>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <p 
                className="leading-relaxed mb-3"
                style={{ color: COLORS.text.secondary }}
              >
                <strong style={{ color: COLORS.accent.base }}>All your diagrams are stored locally in your browser.</strong>
                {' '}We never send your diagram content to any server. Your work remains on your device and is never transmitted 
                over the network.
              </p>
              <ul 
                className="list-disc list-inside space-y-2 ml-2"
                style={{ color: COLORS.text.secondary }}
              >
                <li>Diagrams are saved using browser localStorage</li>
                <li>No cloud storage or server-side processing</li>
                <li>No accounts or authentication required</li>
                <li>Your content never leaves your device</li>
              </ul>
            </div>
          </section>

          {/* Analytics */}
          <section>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: COLORS.text.primary }}
            >
              Analytics & Tracking (Optional)
            </h2>
            <div 
              className="p-6 rounded-xl mb-4"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <p 
                className="leading-relaxed mb-4"
                style={{ color: COLORS.text.secondary }}
              >
                We use <strong style={{ color: COLORS.text.primary }}>Google Tag Manager (GTM)</strong> to understand 
                how users interact with Mermaid Studio. This helps us improve the application and prioritize features.
              </p>
              <p 
                className="font-semibold mb-2"
                style={{ color: COLORS.accent.base }}
              >
                GTM only loads if you explicitly accept analytics.
              </p>
            </div>

            <h3 
              className="text-lg font-semibold mb-3"
              style={{ color: COLORS.text.primary }}
            >
              What We Track (When Enabled)
            </h3>
            <div 
              className="p-6 rounded-xl mb-4"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <ul 
                className="space-y-2"
                style={{ color: COLORS.text.secondary }}
              >
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.accent.base }}>•</span>
                  <span><strong>Page views:</strong> Which pages you visit within the app</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.accent.base }}>•</span>
                  <span><strong>User interactions:</strong> Button clicks, feature usage (e.g., export, zoom)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.accent.base }}>•</span>
                  <span><strong>Device information:</strong> Browser type, device type, screen size</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.accent.base }}>•</span>
                  <span><strong>Usage patterns:</strong> How often features are used, session duration</span>
                </li>
              </ul>
            </div>

            <h3 
              className="text-lg font-semibold mb-3"
              style={{ color: COLORS.text.primary }}
            >
              What We DON&apos;T Track
            </h3>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <ul 
                className="space-y-2"
                style={{ color: COLORS.text.secondary }}
              >
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.success.base }}>✓</span>
                  <span><strong>Your diagram content:</strong> We never see or track what you create</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.success.base }}>✓</span>
                  <span><strong>Personal information:</strong> No names, emails, or identifying data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.success.base }}>✓</span>
                  <span><strong>Diagram titles:</strong> Your custom titles remain private</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: COLORS.success.base }}>✓</span>
                  <span><strong>Exported files:</strong> No tracking of exports or downloads</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Consent Management */}
          <section>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: COLORS.text.primary }}
            >
              Managing Your Consent
            </h2>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <p 
                className="leading-relaxed mb-4"
                style={{ color: COLORS.text.secondary }}
              >
                You have complete control over analytics tracking:
              </p>
              <ul 
                className="list-disc list-inside space-y-2 ml-2 mb-4"
                style={{ color: COLORS.text.secondary }}
              >
                <li>You can accept or decline analytics when first using the app</li>
                <li>Change your preference anytime in the Settings (⚙️ icon)</li>
                <li>Your choice is saved locally in your browser</li>
                <li>Declining analytics doesn&apos;t affect any app features</li>
              </ul>
              <p 
                className="text-sm"
                style={{ color: COLORS.text.muted }}
              >
                Note: If you decline analytics, we collect no information about your usage.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: COLORS.text.primary }}
            >
              Cookies & Local Storage
            </h2>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <p 
                className="leading-relaxed mb-4"
                style={{ color: COLORS.text.secondary }}
              >
                We use browser localStorage (not cookies) for:
              </p>
              <ul 
                className="list-disc list-inside space-y-2 ml-2"
                style={{ color: COLORS.text.secondary }}
              >
                <li><strong>Saving your diagrams:</strong> Your code and diagram titles</li>
                <li><strong>Consent preference:</strong> Whether you accepted or declined analytics</li>
                <li><strong>App settings:</strong> User preferences and configurations</li>
              </ul>
              <p 
                className="text-sm mt-4"
                style={{ color: COLORS.text.muted }}
              >
                When you accept analytics, Google Tag Manager may set cookies to track your session. 
                These are standard analytics cookies managed by Google.
              </p>
            </div>
          </section>

          {/* Third Party Services */}
          <section>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: COLORS.text.primary }}
            >
              Third-Party Services
            </h2>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <p 
                className="leading-relaxed mb-3"
                style={{ color: COLORS.text.secondary }}
              >
                We use the following third-party services:
              </p>
              <div className="space-y-4">
                <div>
                  <p 
                    className="font-semibold mb-1"
                    style={{ color: COLORS.text.primary }}
                  >
                    Google Tag Manager (GTM)
                  </p>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: COLORS.text.secondary }}
                  >
                    Only loaded with your consent. Used for analytics and understanding user behavior.
                    {' '}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:opacity-80"
                      style={{ color: COLORS.accent.base }}
                    >
                      Google Privacy Policy
                    </a>
                  </p>
                </div>
                <div>
                  <p 
                    className="font-semibold mb-1"
                    style={{ color: COLORS.text.primary }}
                  >
                    Mermaid.js
                  </p>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: COLORS.text.secondary }}
                  >
                    Loaded from CDN to render diagrams. This is a client-side library that processes your diagrams 
                    entirely in your browser. No data is sent to their servers.
                  </p>
                </div>
                <div>
                  <p 
                    className="font-semibold mb-1"
                    style={{ color: COLORS.text.primary }}
                  >
                    GitHub Pages
                  </p>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: COLORS.text.secondary }}
                  >
                    Our hosting provider. GitHub may collect standard web server logs (IP addresses, timestamps) 
                    as part of their hosting service.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* GDPR Compliance */}
          <section>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: COLORS.text.primary }}
            >
              GDPR Compliance
            </h2>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <p 
                className="leading-relaxed mb-4"
                style={{ color: COLORS.text.secondary }}
              >
                We are committed to GDPR compliance:
              </p>
              <ul 
                className="list-disc list-inside space-y-2 ml-2"
                style={{ color: COLORS.text.secondary }}
              >
                <li><strong>Consent-based tracking:</strong> Analytics only run with your explicit consent</li>
                <li><strong>Right to withdraw:</strong> Change your mind anytime in Settings</li>
                <li><strong>Data minimization:</strong> We collect only anonymous usage data</li>
                <li><strong>No data processing:</strong> Your diagrams never reach our servers</li>
                <li><strong>Transparency:</strong> This page explains everything we track</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: COLORS.text.primary }}
            >
              Questions or Concerns?
            </h2>
            <div 
              className="p-6 rounded-xl"
              style={{ backgroundColor: COLORS.primary.light }}
            >
              <p 
                className="leading-relaxed"
                style={{ color: COLORS.text.secondary }}
              >
                If you have questions about this privacy policy or how we handle your data, please open an issue on our 
                {' '}
                <a 
                  href="https://github.com/torkilm/MermaidViewer/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                  style={{ color: COLORS.accent.base }}
                >
                  GitHub repository
                </a>
                .
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <section>
            <p 
              className="text-sm text-center pt-4"
              style={{ color: COLORS.text.muted }}
            >
              Last updated: January 6, 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
