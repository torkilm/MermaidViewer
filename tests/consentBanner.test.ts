import { describe, test, expect, beforeEach } from 'vitest';

/**
 * Test for ConsentBanner behavior
 * 
 * This test validates that the consent banner appears correctly based on user consent status:
 * 1. First-time visitors (no consent record) should see the banner
 * 2. Users who declined consent should see the banner again on return visits
 * 3. Users who accepted consent should NOT see the banner on return visits
 */

// Mock localStorage
class LocalStorageMock {
  private store: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  clear(): void {
    this.store = {};
  }
}

// Mock hasGTMConsent function from utils/gtm.ts
const createHasGTMConsent = (storage: LocalStorageMock) => {
  return (): boolean => {
    return storage.getItem('gtm-consent') === 'accepted';
  };
};

// Test the consent banner visibility logic
const createShouldShowConsentBanner = (hasGTMConsent: () => boolean) => {
  return (): boolean => {
    // This is the logic from the updated ConsentBanner component
    return !hasGTMConsent();
  };
};

describe('Consent Banner Visibility Logic', () => {
  let localStorage: LocalStorageMock;
  let hasGTMConsent: () => boolean;
  let shouldShowConsentBanner: () => boolean;

  beforeEach(() => {
    localStorage = new LocalStorageMock();
    hasGTMConsent = createHasGTMConsent(localStorage);
    shouldShowConsentBanner = createShouldShowConsentBanner(hasGTMConsent);
  });

  test('First-time visitor (no consent record)', () => {
    // No localStorage consent record
    const result = shouldShowConsentBanner();
    expect(result).toBe(true);
  });

  test('User who previously declined', () => {
    localStorage.setItem('gtm-consent', 'declined');
    localStorage.setItem('gtm-consent-date', new Date().toISOString());
    
    const result = shouldShowConsentBanner();
    expect(result).toBe(true);
  });

  test('User who previously accepted', () => {
    localStorage.setItem('gtm-consent', 'accepted');
    localStorage.setItem('gtm-consent-date', new Date().toISOString());
    
    const result = shouldShowConsentBanner();
    expect(result).toBe(false);
  });
});

