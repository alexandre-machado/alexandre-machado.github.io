import { test, expect } from '@playwright/test';

test('Page Screenshot', async ({ page }) => {
  await page.goto('https://alexandre.machado.cc/');
  
  await expect(page).toHaveTitle(/Alexandre Machado/);
  await page.screenshot({ path: `print.png` });
});