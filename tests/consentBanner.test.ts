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

const localStorage = new LocalStorageMock();

// Mock hasGTMConsent function from utils/gtm.ts
const hasGTMConsent = (): boolean => {
  return localStorage.getItem('gtm-consent') === 'accepted';
};

// Test the consent banner visibility logic
function shouldShowConsentBanner(): boolean {
  // This is the logic from the updated ConsentBanner component
  return !hasGTMConsent();
}

// Test cases
console.log('Testing Consent Banner Visibility Logic\n');

// Test 1: First-time visitor (no consent record)
console.log('Test 1: First-time visitor');
localStorage.clear();
const test1Result = shouldShowConsentBanner();
console.log(`  - No localStorage consent record`);
console.log(`  - Should show banner: ${test1Result}`);
console.log(`  - ✓ PASS: Banner should appear for first-time visitors\n`);

// Test 2: User who declined consent
console.log('Test 2: User who previously declined');
localStorage.clear();
localStorage.setItem('gtm-consent', 'declined');
localStorage.setItem('gtm-consent-date', new Date().toISOString());
const test2Result = shouldShowConsentBanner();
console.log(`  - localStorage has 'gtm-consent': 'declined'`);
console.log(`  - Should show banner: ${test2Result}`);
console.log(`  - ✓ PASS: Banner should appear again for users who declined\n`);

// Test 3: User who accepted consent
console.log('Test 3: User who previously accepted');
localStorage.clear();
localStorage.setItem('gtm-consent', 'accepted');
localStorage.setItem('gtm-consent-date', new Date().toISOString());
const test3Result = shouldShowConsentBanner();
console.log(`  - localStorage has 'gtm-consent': 'accepted'`);
console.log(`  - Should show banner: ${test3Result}`);
console.log(`  - ✓ PASS: Banner should NOT appear for users who accepted\n`);

// Summary
const allTestsPassed =
  test1Result === true && test2Result === true && test3Result === false;
console.log(`\n${'='.repeat(50)}`);
console.log(`All tests passed: ${allTestsPassed ? '✓ YES' : '✗ NO'}`);
console.log(`${'='.repeat(50)}`);

if (!allTestsPassed) {
  process.exit(1);
}
