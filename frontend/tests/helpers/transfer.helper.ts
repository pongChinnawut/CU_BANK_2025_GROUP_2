import { expect, Page } from "@playwright/test";
import { locators } from "./locator";

export class TransferHelper {
  constructor(private page: Page) {}

  async fillAccountId(data: any) {
    await this.page.fill(locators.accountFormAccountId, data.accountId);
  }

  async fillAmount(data: any) {
    await this.page.fill(locators.accountFormAmount, data.amount);
  }

  async submitLogin() {
    await this.page.click(locators.accountFormComfirmButton);
  }

  async expectErrorMessage(expected: string) {
    const errorMsg = this.page.locator(locators.accountFormErrorMessage);
    await expect(errorMsg).toHaveText(expected);
  }

  async expectDisplayAccountNavLink() {
    const accountNavLink = this.page.locator(locators.accountNavLink);
    await expect(accountNavLink).toBeVisible();
  }
}
