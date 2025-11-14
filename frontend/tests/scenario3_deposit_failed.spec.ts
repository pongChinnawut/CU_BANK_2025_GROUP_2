import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario3_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { DepositHelper } from "./helpers/deposit.helper";
import {
  connectDatabase,
  disconnectDatabase,
  updateBalanceByAccountId,
} from "./helpers/database/action.helper";
import { AuthHelper } from "./helpers/auth.helper";

test.describe(`Navigate to the ${defineConfig.use?.baseURL}/account to Testing`, () => {
  let balanceAmount = 1500;

  test.beforeAll(async () => {
    await connectDatabase();
    const authHelper = new AuthHelper();
    await updateBalanceByAccountId(authHelper.user.accountId, balanceAmount);
  });

  test.afterAll(async () => {
    disconnectDatabase();
  });

  test("TC11: Login with all valid inputs", async ({ page }) => {
    const helper = new LoginHelper(page);

    await test.step("Display account page", async () => {
      await helper.expectDisplayAccountPage();
    });
  });

  test("TC21: Deposit with non-numeric amount", async ({ page }) => {
    const data = testcase.TC21.data;
    const step = testcase.TC21.step;
    const expectation = testcase.TC21.expectation;

    const helper = new DepositHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillDepositAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitDeposit();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.enter_a_number);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
  });

  test("TC22: Deposit with decimal amount", async ({ page }) => {
    const data = testcase.TC22.data;
    const step = testcase.TC22.step;
    const expectation = testcase.TC22.expectation;

    const helper = new DepositHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillDepositAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitDeposit();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessageTooltip(expectation.errorMsg.enter_a_valid_value_nearst);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayBalance(`${balanceAmount}`);
    });
  });

  test("TC23: Deposit with negative or 0 amount", async ({ page }) => {
    const data = testcase.TC23.data;
    const step = testcase.TC23.step;
    const expectation = testcase.TC23.expectation;

    const helper = new DepositHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillDepositAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitDeposit();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.amount_must_be_greater_than_zero);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayBalance(`${balanceAmount}`);
    });
  });
});
