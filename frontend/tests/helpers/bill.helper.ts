import { expect, Page } from "@playwright/test";
import { locators } from "./locator";

export class BillHelper {
  constructor(private page: Page) {}

  async selectBill(label: string) {
    await this.page.locator(`input[value="${label}"]`).check();
  }

  async fillAmount(data: any) {
    await this.page.fill(locators.billFormAmount, data.amount);
  }

  async submitForm() {
    await this.page.click(locators.billFormSubmitButton);
  }

  async expectTooltipErrorMessage(locator: string, expected: string) {
    const errorMsg = this.page.locator(locator);
    await expect(errorMsg).toHaveJSProperty("validationMessage", expected);
  }

  async expectDisplayAccountNavLink() {
    const accountNavLink = this.page.locator(locators.accountNavLink);
    await expect(accountNavLink).toBeVisible();
  }

  async expectDisplayBalance(balance: number) {
    const userBalance = this.page.locator(locators.userBalance);
    await expect(userBalance).toBeVisible();
    await expect(userBalance).toContainText(`${balance}`);
  }

  async expectDisplayNoTransactions() {
    const transactions = this.page.locator(locators.transactions);
    await expect(transactions).not.toBeVisible();
  }

  async expectDisplayErrorMessage(error: string) {
    const billFormErrorMessage = this.page.locator(locators.billFormErrorMessage);
    await expect(billFormErrorMessage).toContainText(error);
  }
}
