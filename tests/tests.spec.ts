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

});