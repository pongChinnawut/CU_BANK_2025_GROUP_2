import { Page } from "@playwright/test";
import { locators } from "./locator";
import { expect } from "../fixtures/auth-fixtures";
export class WithdrawHelper {
  constructor(private page: Page) {}

  async openLogin() {
    await this.page.click(locators.loginNavLink);
  }

  async fillWithdrawAmount(data: any) {
    const withdrawAmountInput = this.page.locator("#amount").nth(1);
    await withdrawAmountInput.fill(data.amount);
  }

  async expectErrorMessage(expected: string) {
    const errorMsg = this.page.locator(locators.withdrawErrorText);
    await expect(errorMsg).toHaveText(expected);
  }

  async expectErrorMessageTooltip(expected: string) {
    const amountInput = this.page.locator("#amount").nth(1);
    const message = await amountInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    await expect(message).toContain(expected);
  }

  async fillAccountId(data: any) {
    await this.page.fill(locators.accountId, data.accountId);
  }

  async fillPassword(data: any) {
    await this.page.fill(locators.password, data.password);
  }

  async submitWithdraw() {
    await this.page.click(locators.withdrawSubmitButton);
  }

  async expectRedirectToAccountPage() {
    await expect(this.page).toHaveURL(/account/);
  }

  async expectDisplayAccountPage() {
    const registerNavLink = this.page.locator(locators.accountNavLink);
    await expect(registerNavLink).toBeVisible();
  }

  async submitTransaction() {
    await Promise.allSettled([
      this.page.waitForResponse(res => res.url().includes("/transactions") && res.ok(), {
        timeout: 3000,
      }),
      await this.submitWithdraw(),
    ]);
  }
}
