import { Page } from "@playwright/test";
import { locators } from "./locator";
import { test, expect } from "../fixtures/auth-fixtures";
export class LoginHelper {
  constructor(private page: Page) {}

  async fillAccountId(data: any) {
    await this.page.fill(locators.accountId, data.accountId);
  }

  async fillPassword(data: any) {
    await this.page.fill(locators.password, data.password);
  }

  async submitLogin() {
    await this.page.click(locators.loginButton);
  }

  async expectRedirectToAccountPage() {
    await expect(this.page).toHaveURL(/account/);
  }

  async expectDisplayAccountPage() {
    const registerNavLink = this.page.locator(locators.AccountNavLink);
    await expect(registerNavLink).toBeVisible();
  }
}
