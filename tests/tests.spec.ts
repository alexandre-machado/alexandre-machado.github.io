import { test, expect } from '@playwright/test';

test('Page Screenshot', async ({ page, browser  }) => {
  await page.goto('https://alexandre.machado.cc/');
  
  await expect(page).toHaveTitle(/Alexandre Machado/);
  await page.screenshot({ path: `test-results/${browser.browserType().name()}/print.png` });
});