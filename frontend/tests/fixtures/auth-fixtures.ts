import { test as base, Page } from "@playwright/test";
import { DepositHelper } from "../helpers/deposit.helper";

type AuthFixtures = {
  page: Page;
  deposit: Page;
  depositAmount: string;
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
  depositAmount: ["1500", { option: true }],
  deposit: async ({ page, depositAmount }, use) => {
    await page.goto("/account");
    const depositHelper = new DepositHelper(page);
    await depositHelper.fillDepositAmount({ amount: depositAmount });
    await depositHelper.submitTransaction();

    await use(page);
  },
});
export const expect = test.expect;
