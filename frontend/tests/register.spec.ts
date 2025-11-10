import { test, expect } from "@playwright/test";

test.describe("หน้าล็อกอิน", () => {
  test.beforeEach(async ({ page }) => {
    // เปิดหน้าเว็บก่อนรันแต่ละเทสต์
    await page.goto("http://localhost:3000");
  });

  test("ล็อกอินสำเร็จด้วยข้อมูลที่ถูกต้อง", async ({ page }) => {
    await page.click('//*[@id="root"]/div/nav/div/a[2]');

    await page.fill("#accountId", "2222222222");
    await page.fill("#password", "1234");
    await page.fill("#firstName", "grouptwo_name");
    await page.fill("#lastName", "grouptwo_lastname");

    page.once("dialog", async (dialog) => {//Registration successful!
      expect(dialog.message()).toContain("xxx"); // ตรวจข้อความใน alert
      await dialog.dismiss(); // กด OK
    
    });

    await page.click('//*[@id="root"]/div/div/div/form/button');

    // page.once("dialog", async (dialog) => {//Registration successful!
    //   expect(dialog.message()).toContain("xxx"); // ตรวจข้อความใน alert
    //   await dialog.dismiss(); // กด OK
    // });
  });
});
