import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario5_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { TransferHelper } from "./helpers/transfer.helper";

test.describe(`Navigate to the ${defineConfig.use?.baseURL}/account to Testing`, () => {
  test("TC11: Login with all valid inputs", async ({ page }) => {
    const helper = new LoginHelper(page);

    await test.step("Display account page", async () => {
      await helper.expectDisplayAccountPage();
    });
  });

  test("TC30: Transfer with non-numeric target account", async ({ page }) => {
    const data = testcase.TC30.data;
    const step = testcase.TC30.step;
    const expectation = testcase.TC30.expectation;

    const helper = new TransferHelper(page);
    await test.step(`${step.step1_fill_in_account_id} is ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_click_confirm_button_to_submit, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.account_id_should_contain_numbers_only);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });

  test("TC31: Transfer with target account less than 10 digits", async ({ page }) => {
    const data = testcase.TC31.data;
    const step = testcase.TC31.step;
    const expectation = testcase.TC31.expectation;

    const helper = new TransferHelper(page);
    await test.step(`${step.step1_fill_in_account_id} is ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount({ amount: "300" });
    });
    await test.step(step.step3_click_confirm_button_to_submit, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.account_id_should_be_10_digit);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });

  test("TC32: Transfer with target account more than 10 digits", async ({ page }) => {
    const data = testcase.TC32.data;
    const step = testcase.TC32.step;
    const expectation = testcase.TC32.expectation;

    const helper = new TransferHelper(page);
    await test.step(`${step.step1_fill_in_account_id} is ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_click_confirm_button_to_submit, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.account_id_should_be_10_digit);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });

  test("TC33: Transfer with target account not found", async ({ page }) => {
    const data = testcase.TC33.data;
    const step = testcase.TC33.step;
    const expectation = testcase.TC33.expectation;

    const helper = new TransferHelper(page);
    await test.step(`${step.step1_fill_in_account_id} is ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_click_confirm_button_to_submit, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.account_id_not_exist);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });

  test("TC34: Transfer with same as owner account", async ({ page }) => {
    const data = testcase.TC34.data;
    const step = testcase.TC34.step;
    const expectation = testcase.TC34.expectation;

    const helper = new TransferHelper(page);
    await test.step(`${step.step1_fill_in_account_id} is ${data.accountId}`, async () => {
      await helper.fillAccountId(data);
    });
    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_click_confirm_button_to_submit, async () => {
      await helper.submitLogin();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.account_owner);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });
});
