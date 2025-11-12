import { expect, Page } from "@playwright/test";
import { locators } from "./locator";

export class BillHelper {
  constructor(private page: Page) {}

  async fillAmount(data: any) {
    await this.page.fill(locators.billFormAmount, data.amount);
  }

  async submitForm() {
    await this.page.click(locators.billFormSubmitButton);
  }

  async expectTooltipErrorMessage(expected: string) {
    const errorMsg = this.page.locator(locators.billFormWaterCharge);
    await expect(errorMsg).toHaveJSProperty("validationMessage", expected);
  }

  async expectDisplayAccountNavLink() {
    const accountNavLink = this.page.locator(locators.accountNavLink);
    await expect(accountNavLink).toBeVisible();
  }
}
