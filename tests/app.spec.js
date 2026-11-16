import { test, expect } from '@playwright/test';

test('Meridian iOS PWA: auto-offlines entire itinerary, works when server/internet is unreachable, supports on-the-fly editing, and exposes Google OAuth Drive sync', async ({
  page,
}) => {
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(e.message));

  await page.goto('/');

  // 1. Verify London Anniversary Trip loads & wait for automatic Offline Vault caching to complete!
  await expect(page.locator('h1')).toContainText('London Anniversary');
  await expect(page.locator('.top-pill-btn.offline-ready-pill')).toBeVisible({
    timeout: 25000,
  });

  // Wait for Service Worker to register and take control of the client
  const swActive = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const reg = await navigator.serviceWorker.ready;
    return Boolean(reg.active);
  });
  expect(swActive).toBe(true);

  // Verify CacheStorage actually holds shell + London photos + MP3 audio files!
  const cacheSummary = await page.evaluate(async () => {
    const shell = await caches.open('meridian-shell-v2');
    const media = await caches.open('meridian-media-v2');
    const shellKeys = (await shell.keys()).map((r) => new URL(r.url).pathname);
    const mediaKeys = (await media.keys()).map((r) => new URL(r.url).pathname);
    return {
      shellCount: shellKeys.length,
      mediaCount: mediaKeys.length,
      hasTowerMp3: mediaKeys.includes('/audio/tower-of-london-koh-i-noor.mp3'),
      hasHeroImg: mediaKeys.includes('/images/london_hero.jpg'),
    };
  });
  expect(cacheSummary.shellCount).toBeGreaterThanOrEqual(5);
  expect(cacheSummary.mediaCount).toBeGreaterThanOrEqual(80);
  expect(cacheSummary.hasTowerMp3).toBe(true);
  expect(cacheSummary.hasHeroImg).toBe(true);

  // 2. Simulate internet going down (abort all network requests from browser to network!)
  await page.route('**/*', (route) => route.abort('internetdisconnected'));
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));

  await expect(page.locator('.offline-live-banner')).toContainText(
    'Offline Mode Active'
  );

  // Navigate to Thu Nov 19 while internet is cut & open Tower of London Audio Tour from CacheStorage!
  await page.getByRole('button', { name: /Thu Nov 19/i }).click();
  await expect(page.getByText('Tower of London').first()).toBeVisible();

  await page
    .locator('.stop-card', { hasText: 'Tower of London' })
    .locator('.card-action-pill.audio')
    .click();
  await expect(page.locator('.museum-modal-sheet')).toBeVisible();
  await expect(page.locator('.museum-modal-sheet')).toContainText('Koh-i-Noor');
  await page.locator('.museum-modal-header .icon-close-btn').click();

  // 3. Test On-the-Fly Itinerary Modification EVEN WHILE OFFLINE (Add Stop, Reorder, Remove, Reset)!
  await page.getByRole('button', { name: /Add Stop/i }).click();
  await page
    .getByPlaceholder(/Fortnum & Mason/i)
    .fill('Monmouth Coffee Espresso Stop');
  await page.getByRole('button', { name: /Add Stop Immediately/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Monmouth Coffee Espresso Stop' })
  ).toBeVisible();

  // Toggle Reorder / Remove mode, verify controls, then Reset Default
  await page.getByRole('button', { name: /Reorder \/ Remove/i }).click();
  await expect(page.locator('.inline-stop-edit-bar').first()).toBeVisible();
  await page.getByRole('button', { name: /Done Editing/i }).click();
  await page.getByRole('button', { name: /Reset Default/i }).click();
  await expect(
    page.getByRole('heading', { name: 'Monmouth Coffee Espresso Stop' })
  ).toHaveCount(0);

  // 4. Restore network & verify Google OAuth + Drive Backup modal
  await page.unrouteAll();
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await page.locator('.top-app-bar').getByRole('button', { name: /Sync/i }).click();
  await expect(
    page.getByText('Continue with Google & Enable Drive Backup')
  ).toBeVisible();

  expect(consoleErrors).toEqual([]);
});
