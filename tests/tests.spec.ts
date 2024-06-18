import { test, expect } from '@playwright/test';

test('Page Screenshot', async ({ page, browser  }) => {
  await page.goto('https://alexandre.machado.cc');
  
  await expect(page).toHaveTitle(/Alexandre Machado/);
  await page.screenshot({ path: `test-results/${browser.browserType().name()}/print.png` });
});

test('detect JS errors', async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`Erro de JS detectado: ${msg.text()}`);
    }
  });

  await page.goto('https://alexandre.machado.cc');
});