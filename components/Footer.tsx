import React, { useState } from 'react';
import { FacebookIcon, LinkedInIcon, TwitterIcon, LinkIcon, CheckIcon } from './Icons';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const shareText = 'Check out this Mermaid diagram!';

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
        <span className="text-slate-400 text-sm font-medium mr-2">Share:</span>
        
        <button
          onClick={handleFacebookShare}
          className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-slate-800 rounded-lg transition-all active:scale-90"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="w-5 h-5" />
        </button>

        <button
          onClick={handleLinkedInShare}
          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-800 rounded-lg transition-all active:scale-90"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="w-5 h-5" />
        </button>

        <button
          onClick={handleTwitterShare}
          className="p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all active:scale-90"
          title="Share on Twitter"
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
          title="Copy URL"
          aria-label="Copy URL to clipboard"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <LinkIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </footer>
  );
};
