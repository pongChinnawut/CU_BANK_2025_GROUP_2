import { Page } from "@playwright/test";
import { locators } from "./locator";
import { expect } from "../fixtures/auth-fixtures";
export class DepositHelper {
  constructor(private page: Page) {}

  async openLogin() {
    await this.page.click(locators.loginNavLink);
  }

  async fillDepositAmount(data: any) {
    await this.page.fill(locators.depositAmount, data.amount);
  }

  async fillAccountId(data: any) {
    await this.page.fill(locators.accountId, data.accountId);
  }

  async fillPassword(data: any) {
    await this.page.fill(locators.password, data.password);
  }

  async submitDeposit() {
    await this.page.click(locators.depositSubmitButton);
  }

  async expectRedirectToAccountPage() {
    await expect(this.page).toHaveURL(/account/);
  }

  async expectDisplayAccountPage() {
    const registerNavLink = this.page.locator(locators.accountNavLink);
    await expect(registerNavLink).toBeVisible();
  }

  async expectErrorMessage(expected: string) {
    const errorMsg = this.page.locator(locators.errorMsgLogin);
    await expect(errorMsg).toHaveText(expected);
  }
}
