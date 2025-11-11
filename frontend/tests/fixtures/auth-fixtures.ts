import { test as base, Page } from "@playwright/test";

type AuthFixtures = {
  page: Page;
};

export const test = base.extend<AuthFixtures>({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "./tests/storage/auth.json",
    });
    const page = await context.newPage();
    await page.goto("/account");
    await use(page);
    await context.close();
  },
});
export const expect = test.expect;
