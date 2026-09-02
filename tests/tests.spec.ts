import { test, expect } from '@playwright/test';

[
  { testEnvironment: 'E2E', baseUrl: 'https://alexandre.machado.cc' },
  { testEnvironment: 'Local', baseUrl: './' },
].forEach(({ testEnvironment, baseUrl }) => {
  test(`${testEnvironment}: Page Screenshot`, async ({ page, browser }) => {
    await page.goto(baseUrl);

    await expect(page).toHaveTitle(/Alexandre Machado/);
    await page.screenshot({ path: `test-results/${browser.browserType().name()}/print.png` });
  });

  test(`${testEnvironment}: detect JS errors`, async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`Erro de JS detectado: ${msg.text()}`);
      }
    });

    await page.goto(baseUrl);
  });

  const fetchBase = testEnvironment === 'E2E' ? baseUrl : 'http://127.0.0.1:3000';

  test(`${testEnvironment}: serves robots.txt`, async ({ request }) => {
    const res = await request.get(`${fetchBase}/robots.txt`);
    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toContain('Sitemap: https://alexandre.machado.cc/sitemap.xml');
  });

  test(`${testEnvironment}: serves sitemap.xml`, async ({ request }) => {
    const res = await request.get(`${fetchBase}/sitemap.xml`);
    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toContain('<loc>https://alexandre.machado.cc/</loc>');
    expect(body).toContain('<loc>https://alexandre.machado.cc/audio-blackbox/</loc>');
    expect((body.match(/<url>/g) || []).length).toBe(2);
  });

  test(`${testEnvironment}: serves llms.txt`, async ({ request }) => {
    const res = await request.get(`${fetchBase}/llms.txt`);
    expect(res.status()).toBe(200);

    const body = await res.text();
    expect(body).toContain('Audio Blackbox');
    expect(body).toContain('mARC');
  });

});