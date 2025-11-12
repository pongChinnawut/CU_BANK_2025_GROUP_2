import { test } from "@playwright/test";
import { LoginHelper } from "./helpers/login.helper";
import defineConfig from "../playwright.config";
import { testcase } from "./raw_test_data.json/scenario5_raw_data.json";
import {
  connectDatabase,
  disconnectDatabase,
  insertNewUserAccountIfNotExist,
  deleteUserByAccountId,
  clearUserTransactionsByAccountId
} from "./helpers/database/action.helper";
import bcrypt from "bcryptjs";

test.describe(`Navigate to the ${defineConfig.use?.baseURL} to Testing`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defineConfig.use?.baseURL}`);
  });
    test.beforeAll(async () => {
      connectDatabase();
    });
  
    test.afterAll(async () => {
      disconnectDatabase();
    });

  test("Common: Do success Login", async ({ page, context }) => {
    
    const helper = new LoginHelper(page);
    const data = testcase.TC11.data;
    const step = testcase.TC11.step;
    const expectation = testcase.TC11.expectation;

    // prepare data for login common
    var passwordHash = '';
     const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(data.password, salt);

    insertNewUserAccountIfNotExist(data.accountId,
        passwordHash,
        data.firstName,
        data.lastName,
        0);

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
