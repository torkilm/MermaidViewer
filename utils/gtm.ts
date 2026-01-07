/**
 * Google Analytics (gtag.js) Initialization
 * Only loads Google Analytics when user has given explicit consent
 */

const GA_ID = 'G-8SC5M2QV91';

export const initializeGTM = (): void => {
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', GA_ID);

  // Inject Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
};

export const hasGTMConsent = (): boolean => {
  return localStorage.getItem('gtm-consent') === 'accepted';
};

export const setGTMConsent = (accepted: boolean): void => {
  localStorage.setItem('gtm-consent', accepted ? 'accepted' : 'declined');
  localStorage.setItem('gtm-consent-date', new Date().toISOString());
};

export const hasRespondedToConsent = (): boolean => {
  return localStorage.getItem('gtm-consent') !== null;
};

// Declare dataLayer type
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
