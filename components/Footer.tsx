import React, { useState } from 'react';
import {
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
  LinkIcon,
  CheckIcon,
} from './Icons';
import { copyToClipboard } from '../utils/clipboardUtils';
import { COLORS } from '../constants';

interface FooterProps {
  onNavigateToPrivacy: () => void;
  onNavigateToGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToPrivacy,
  onNavigateToGuide,
}) => {
  const [copied, setCopied] = useState(false);

  // Share the app itself, not a specific diagram
  const appUrl = `${window.location.origin}${window.location.pathname}`;
  const shareText =
    'Check out Mermaid Studio - Create and share beautiful diagrams!';

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(appUrl);
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      console.error('Failed to copy URL to clipboard');
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <footer
      className="border-t py-4 px-6"
      style={{
        backgroundColor: COLORS.primary.base,
        borderColor: COLORS.border.base,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Share Section */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-slate-400 text-sm font-medium mr-2">
            Share Mermaid Studio:
          </span>

          <button
            onClick={handleFacebookShare}
            className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-slate-800 rounded-lg transition-all active:scale-90"
            title="Share Mermaid Studio on Facebook"
            aria-label="Share on Facebook"
          >
            <FacebookIcon className="w-5 h-5" />
          </button>

          <button
            onClick={handleLinkedInShare}
            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-800 rounded-lg transition-all active:scale-90"
            title="Share Mermaid Studio on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <LinkedInIcon className="w-5 h-5" />
          </button>

          <button
            onClick={handleTwitterShare}
            className="p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all active:scale-90"
            title="Share Mermaid Studio on Twitter"
            aria-label="Share on Twitter"
          >
            <TwitterIcon className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-slate-800 mx-1"></div>

          <button
            onClick={handleCopyUrl}
            className={`p-2.5 rounded-lg transition-all active:scale-90 ${
              copied
                ? 'text-emerald-500 bg-emerald-500/10'
                : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800'
            }`}
            title="Copy app URL"
            aria-label="Copy app URL to clipboard"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              <LinkIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Privacy & Guide Links */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={onNavigateToGuide}
            className="text-sm font-medium hover:underline transition-all px-3 py-1.5 rounded-lg hover:bg-slate-800"
            style={{ color: COLORS.accent.base }}
            aria-label="View Mermaid Guide"
          >
            📚 Mermaid Guide
          </button>
          <span style={{ color: COLORS.border.base }}>•</span>
          <button
            onClick={onNavigateToPrivacy}
            className="text-sm hover:underline transition-all px-3 py-1.5 rounded-lg hover:bg-slate-800"
            style={{ color: COLORS.text.muted }}
            aria-label="View Privacy Policy"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
