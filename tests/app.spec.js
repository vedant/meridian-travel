import { test, expect } from '@playwright/test';

test('Meridian iOS PWA renders London itinerary, plays museum audio tour, shows featured dishes & TripAdvisor links, and switches destinations', async ({
  page,
}) => {
  await page.goto('/');

  // 1. Verify iOS Home Screen PWA meta tags & manifest
  const appleCapable = await page
    .locator('meta[name="apple-mobile-web-app-capable"]')
    .getAttribute('content');
  expect(appleCapable).toBe('yes');
  const manifestHref = await page
    .locator('link[rel="manifest"]')
    .getAttribute('href');
  expect(manifestHref).toBe('/manifest.webmanifest');

  // 2. Verify London Anniversary Trip loads by default for Dad & Nutan
  await expect(page.locator('h1')).toContainText('London Anniversary');
  await expect(page.locator('.hero-traveler-badge')).toContainText('Dad & Nutan');

  // 3. Navigate to Day 2 (Thu Nov 19) -> Tower of London Audio Tour
  await page.getByRole('button', { name: /Thu Nov 19/i }).click();
  await expect(page.getByText('Tower of London').first()).toBeVisible();

  // Open Audio Tour modal from Day 2 Tower of London card
  const towerAudioBtn = page
    .locator('.stop-card', { hasText: 'Tower of London' })
    .locator('.card-action-pill.audio');
  await towerAudioBtn.click();

  await expect(page.locator('.museum-modal-sheet')).toBeVisible();
  await expect(page.locator('.museum-modal-sheet')).toContainText('Koh-i-Noor');
  await expect(page.locator('.museum-modal-sheet')).toContainText(
    'Read-Along Audio Script'
  );
  await page.locator('.museum-modal-header .icon-close-btn').click();

  // 4. Verify Sticky Mini-Player stays visible on iOS viewport
  await expect(page.locator('.sticky-mini-player')).toBeVisible();

  // 5. Check Saturday Nov 21 Track Switcher (Harrods Option for Nutan)
  await page.getByRole('button', { name: /Sat Nov 21/i }).click();
  await page.getByRole('button', { name: /Option B:/i }).click();
  await expect(page.getByText(/Harrods in Knightsbridge/i)).toBeVisible();

  // 6. Open Dining Tab & verify Internet-Featured Dishes + TripAdvisor links
  await page
    .locator('.bottom-tab-bar')
    .getByRole('button', { name: 'Dining' })
    .click();
  await expect(page.getByText(/Benares/i).first()).toBeVisible();
  const taLink = page.locator('a[href*="tripadvisor"]').first();
  await expect(taLink).toBeVisible();

  // 7. Open Map & Shops Tab & verify 7-Stop Langham Shopping Walk
  await page
    .locator('.bottom-tab-bar')
    .getByRole('button', { name: 'Map & Shops' })
    .click();
  await expect(
    page.getByText('Best 7-Stop Shopping Walk from The Langham')
  ).toBeVisible();

  // 8. Switch to Rome & Florence Showcase in Destinations Tab to prove multi-city generality
  await page
    .locator('.bottom-tab-bar')
    .getByRole('button', { name: 'Destinations' })
    .click();
  await page
    .locator('.trip-choice-card', {
      hasText: 'Eternal Renaissance: Rome & Florence',
    })
    .click();
  await expect(page.locator('h1')).toContainText('Eternal Renaissance');
});
