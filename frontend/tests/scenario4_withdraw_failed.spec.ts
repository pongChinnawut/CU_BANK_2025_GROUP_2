import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario4_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { WithdrawHelper } from "./helpers/withdraw.helper";
import { DepositHelper } from "./helpers/deposit.helper";
import {
  connectDatabase,
  disconnectDatabase,
  updateBalanceByAccountId,
} from "./helpers/database/action.helper";
import { AuthHelper } from "./helpers/auth.helper";

test.describe(`Navigate to the ${defineConfig.use?.baseURL}/account to Testing`, () => {
  test.beforeAll(async () => {
    await connectDatabase();
    const authHelper = new AuthHelper();
    await updateBalanceByAccountId(authHelper.user.accountId, 1000);
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

  test("TC20: Deposit with valid amount", async ({ page }) => {
    const data = testcase.TC20.data;
    const step = testcase.TC20.step;
    const expectation = testcase.TC20.expectation;

    const helper = new DepositHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillDepositAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitDeposit();
    });

    // Expect
    // Todo check history deposit
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
  });

  test("TC28: Withdrawal with insufficient balance", async ({ page }) => {
    const data = testcase.TC28.data;
    const step = testcase.TC28.step;
    const expectation = testcase.TC28.expectation;

    const authHelper = new AuthHelper();
    await updateBalanceByAccountId(authHelper.user.accountId, 1000);

    const helper = new WithdrawHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillWithdrawAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitWithdraw();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.balance_is_not_enough);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
  });
});
