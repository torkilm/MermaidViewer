/**
 * Google Tag Manager Initialization
 * Only loads GTM when user has given explicit consent
 */

const GTM_ID = import.meta.env.VITE_GTM_ID;

export const initializeGTM = (): void => {
  if (!GTM_ID) {
    console.warn('GTM_ID not configured. Skipping GTM initialization.');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  // Inject GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  // Inject noscript iframe
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  
  document.body.insertBefore(noscript, document.body.firstChild);
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

export const revokeGTMConsent = (): void => {
  setGTMConsent(false);
  // Note: GTM script remains loaded but no new events will be tracked
  // A full page reload would be needed to completely remove GTM
  console.log('GTM consent revoked. Reload the page for full effect.');
};

// Declare dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
  }
}
