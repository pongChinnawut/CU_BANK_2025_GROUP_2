import { expect, Page } from "@playwright/test";
import { locators } from "./locator";

export class BillHelper {
  constructor(private page: Page) {}

  async getBalance() {
    const text = (await this.page.locator(locators.userBalance).textContent()) || "";
    return text;
  }

  async getTransactions() {
    const list = await this.page.locator(locators.transactions).count();
    return list;
  }

  async selectBill(label: string) {
    await this.page.locator(`input[value="${label}"]`).check();
  }

  async fillAmount(data: any) {
    await this.page.fill(locators.billFormAmount, `${data.amount}`);
  }

  async submitForm() {
    await this.page.click(locators.billFormSubmitButton);
  }

  async submitTransaction() {
    await Promise.allSettled([
      this.page.waitForResponse(res => res.url().includes("/transactions") && res.ok(), {
        timeout: 3000,
      }),
      this.page.click(locators.billFormSubmitButton),
    ]);
  }

  async expectTooltipErrorMessage(locator: string, expected: string) {
    const errorMsg = this.page.locator(locator);
    await expect(errorMsg).toHaveJSProperty("validationMessage", expected);
  }

  async expectDisplayAccountNavLink() {
    const accountNavLink = this.page.locator(locators.accountNavLink);
    await expect(accountNavLink).toBeVisible();
  }

  async expectBalanceChange(expected: number) {
    const received = await this.getBalance();
    await expect(+received).toBe(expected);
  }

  async expectTransactionsToDisplay(beforeTransactionCount: number) {
    const countAfter = await this.getTransactions();
    await expect(countAfter).toBe(beforeTransactionCount);
  }

  async expectDisplayTransactions() {
    const transactions = this.page.locator(locators.transactions);
    await expect(transactions).toBeVisible();
  }

  async expectDisplayErrorMessage(error: string) {
    const billFormErrorMessage = this.page.locator(locators.billFormErrorMessage);
    await expect(billFormErrorMessage).toContainText(error);
  }
}
