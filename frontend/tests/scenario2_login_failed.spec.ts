import { test } from "@playwright/test";
import { RegistrationHelper } from "./helpers/registration.helper";
import { testcase } from "./raw_test_data.json/scenario2_raw_data.json";
import defineConfig from "../playwright.config";
import {
  connectDatabase,
  disconnectDatabase,
  deleteUserByAccountId,
} from "./helpers/database/action.helper";
import { LoginHelper } from "./helpers/login.helper";

test.describe(`Navigate to the ${defineConfig.use?.baseURL} to Testing`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defineConfig.use?.baseURL}`);
  });

  test.beforeAll(async () => {
    await connectDatabase();
  });

  test.afterAll(async () => {
    disconnectDatabase();
  });

  test("TC1: Register with all valid inputs", async ({ page }) => {
    const data = testcase.TC1.data;
    const step = testcase.TC1.step;
    const expectation = testcase.TC1.expectation;

    // Prepare data
    deleteUserByAccountId(data.accountId);

    // Testing
    const helper = new RegistrationHelper(page);

    await test.step(step.step1_click_register_button_on_top_bar, async () => {
      await helper.openRegister();
    });

    await test.step(`${step.step2_fill_in_account_id} is ${data.accountId}`, async () => {
      await helper.fillRegistrationAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password} is ${data.password}`, async () => {
      await helper.fillRegistrationPassword(data);
    });
    await test.step(`${step.step4_fill_in_first_name} is ${data.firstName}`, async () => {
      await helper.fillRegistrationFirstName(data);
    });
    await test.step(`${step.step5_fill_in_last_name} is ${data.lastName}`, async () => {
      await helper.fillRegistrationLastName(data);
    });

    await test.step(step.step6_click_register_button_to_submit, async () => {
      await helper.submitRegister();
    });

    // Expect
    await test.step(`${expectation.step.expect1}`, async () => {
      await helper.expectRedirectToLoginPage();
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayTextLogin();
    });
  });

  test("TC12: Login with non-numeric account number", async ({ page }) => {
    const data = testcase.TC12.data;
    const step = testcase.TC12.step;
    const expectation = testcase.TC12.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.accountIdShouldContainNumbersOnly);
    });
  });

  test("TC13: Login with account number less than 10 digits", async ({ page }) => {
    const data = testcase.TC13.data;
    const step = testcase.TC13.step;
    const expectation = testcase.TC13.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.accountIdMustBeExactly10Digits);
    });
  });

  test("TC14: Login with account number more than 10 digits", async ({ page }) => {
    const data = testcase.TC14.data;
    const step = testcase.TC14.step;
    const expectation = testcase.TC14.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.accountIdMustBeExactly10Digits);
    });
  });

  test("TC15: Login with non-existent account", async ({ page }) => {
    const data = testcase.TC15.data;
    const step = testcase.TC15.step;
    const expectation = testcase.TC15.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.userAccountNotFound);
    });
  });

  test("TC16: Login with non-numeric password", async ({ page }) => {
    const data = testcase.TC16.data;
    const step = testcase.TC16.step;
    const expectation = testcase.TC16.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.passwordShouldContainNumbersOnly);
    });
  });

  test("TC17: Login with password less than 4 digits", async ({ page }) => {
    const data = testcase.TC17.data;
    const step = testcase.TC17.step;
    const expectation = testcase.TC17.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.passwordMustBeExactly4Digits);
    });
  });

  test("TC18: Login with password more than 4 digits", async ({ page }) => {
    const data = testcase.TC18.data;
    const step = testcase.TC18.step;
    const expectation = testcase.TC18.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.passwordMustBeExactly4Digits);
    });
  });

  test("TC19: Login with wrong password", async ({ page }) => {
    const data = testcase.TC19.data;
    const step = testcase.TC19.step;
    const expectation = testcase.TC19.expectation;

    const helper = new LoginHelper(page);

    await test.step(step.step1_click_login_button_on_top_bar, async () => {
      await helper.openLogin();
    });

    await test.step(`${step.step2_fill_in_account_id}: ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step3_fill_in_password}: ${data.password}`, async () => {
      await helper.fillPassword(data);
    });
    await test.step(`${step.step4_click_login_button_to_submit}`, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.incorrectPassword);
    });
  });
});
