import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Login', async ({ page }) => {
    await page.fill('#accountId', '1111111111');
    await page.fill('#password', '1234');

    // กดปุ่มล็อกอิน
    await page.click('//*[@id="root"]/div/div/div/form/button');

    // ตรวจสอบข้อความแจ้งเตือน
    const accountMsg = await page.locator('//*[@id="root"]/div/nav/div/a[1]');
    const logoutMsg = await page.locator('//*[@id="root"]/div/nav/div/a[2]');
    // await expect(logoutMsg).toHaveText('LOG OUT');
    // await expect(accountMsg).toHaveText('Account');
  });

  });