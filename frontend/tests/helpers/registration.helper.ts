import { Page, expect } from "@playwright/test";
import { locators } from "./locator";

export class RegistrationHelper {
  constructor(private page: Page) {}

  async openRegister() {
    await this.page.click(locators.registerButton);
  }

  async fillRegistrationAccountId(data: any) {
    await this.page.fill(locators.accountId, data.accountId);
  }

    async fillRegistrationPassword(data: any) {
    await this.page.fill(locators.password, data.password);
  }

    async fillRegistrationFirstName(data: any) {
    await this.page.fill(locators.firstName, data.firstName);
  }

    async fillRegistrationLastName(data: any) {
    await this.page.fill(locators.lastName, data.lastName);
  }

  async submit() {
    await this.page.click(locators.submitButton);
  }

  async expectErrorMessage(expected: string) {
    const errorMsg = this.page.locator(locators.errorMsg);
    await expect(errorMsg).toHaveText(expected);
  }
}
