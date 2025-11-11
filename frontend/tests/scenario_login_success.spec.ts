import { test } from "@playwright/test";
import { LoginHelper } from "./helpers/login.helper";
import defineConfig from "../playwright.config";
import { testcase } from "./raw_test_data.json/scenario5_raw_data.json";

test.describe(`Navigate to the ${defineConfig.use?.baseURL} to Testing`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defineConfig.use?.baseURL}`);
  });

  test("TC11: Login with all valid inputs", async ({ page, context }) => {
    const helper = new LoginHelper(page);
    const data = testcase.TC11.data;
    const step = testcase.TC11.step;
    const expectation = testcase.TC11.expectation;

    await test.step(`${step.step1_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step2_fill_in_password}: ${data.accountId}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step3_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(`${expectation.step.expect1}`, async () => {
      await helper.expectRedirectToAccountPage();
    });
    await test.step(`${expectation.step.expect2}`, async () => {
      await helper.expectDisplayAccountPage();
    });
    await context.storageState({ path: "./tests/storage/auth.json" });
  });
});
