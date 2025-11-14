import { expect, Page } from "@playwright/test";
import { locators } from "./locator";

export class TransferHelper {
  constructor(private page: Page) {}

  async getBalance() {
    const text = (await this.page.locator(locators.userBalance).textContent()) || "";
    return text;
  }

  async getTransactions() {
    const list = await this.page.locator(locators.transactions).count();
    return list;
  }

  async fillAccountId(data: any) {
    await this.page.fill(locators.accountFormAccountId, data.accountId);
  }

  async fillAmount(data: any) {
    await this.page.fill(locators.accountFormAmount, data.amount);
  }

  async submitLogin() {
    await this.page.click(locators.accountFormComfirmButton);
  }

  async submitTransaction() {
    await Promise.allSettled([
      this.page.waitForResponse(res => res.url().includes("/transactions") && res.ok(), {
        timeout: 3000,
      }),
      this.page.click(locators.accountFormComfirmButton),
    ]);
  }

  async expectBalanceChange(expected: number) {
    const received = await this.getBalance();
    await expect(+received).toBe(expected);
  }

  async expectTransactionsToBeEqual(beforeTransactionCount: number) {
    const countAfter = await this.getTransactions();
    await expect(countAfter).toBe(beforeTransactionCount);
  }

  async expectDisplayTransaction(account: number, amount: number, balance: number) {
    const recentTransaction = this.page.locator(locators.recentTransaction).last();
    await expect(recentTransaction).toBeVisible();
    await expect(recentTransaction).toContainText(`target: ${account}`);
    await expect(recentTransaction).toContainText(`amount: ${amount}`);
    await expect(recentTransaction).toContainText(`balance: ${balance}`);
  }

  async expectErrorMessage(expected: string) {
    const errorMsg = this.page.locator(locators.accountFormErrorMessage);
    await expect(errorMsg).toHaveText(expected);
  }

  async expectDisplayAccountNavLink() {
    const accountNavLink = this.page.locator(locators.accountNavLink);
    await expect(accountNavLink).toBeVisible();
  }

  async expectTooltipErrorMessage(locator: string, expected: string) {
    const errorMsg = this.page.locator(locator);
    await expect(errorMsg).toHaveJSProperty("validationMessage", expected);
  }
}
