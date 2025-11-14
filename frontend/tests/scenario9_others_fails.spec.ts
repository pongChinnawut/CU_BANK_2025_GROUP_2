import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario9_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { WithdrawHelper } from "./helpers/withdraw.helper";
import {
  connectDatabase,
  disconnectDatabase,
  insertNewUserAccountIfNotExist,
  updateBalanceByAccountId,
} from "./helpers/database/action.helper";
import { AuthHelper } from "./helpers/auth.helper";
import { TransferHelper } from "./helpers/transfer.helper";
import { locators } from "./helpers/locator";

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

  // Withdrawal 💸
  test("TC25: Withdrawal with non-numeric amount", async ({ page }) => {
    const data = testcase.TC25.data;
    const step = testcase.TC25.step;
    const expectation = testcase.TC25.expectation;

    const helper = new WithdrawHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillWithdrawAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitWithdraw();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.enter_a_number);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
  });
  test("TC26: Withdrawal with decimal amount", async ({ page }) => {
    const data = testcase.TC26.data;
    const step = testcase.TC26.step;
    const expectation = testcase.TC26.expectation;

    const helper = new WithdrawHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillWithdrawAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitWithdraw();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessageTooltip(expectation.errorMsg.enter_valid_number);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
  });
  test("TC27: Withdrawal with negative or 0 amount", async ({ page }) => {
    const data = testcase.TC27.data;
    const step = testcase.TC27.step;
    const expectation = testcase.TC27.expectation;

    const helper = new WithdrawHelper(page);
    await test.step(`${step.step1_fill_in_deposit} is ${data.amount}`, async () => {
      await helper.fillWithdrawAmount(data);
    });
    await test.step(step.step2_click_confirm_button_to_submit, async () => {
      await helper.submitWithdraw();
    });

    // Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.enter_valid_number);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayAccountPage();
    });
  });

  //   Transfer 💴
  test("TC35: Transfer with non-numeric amount", async ({ page }) => {
    const data = testcase.TC35.data;
    const step = testcase.TC35.step;
    const expectation = testcase.TC35.expectation;
    // Prepare data before
    const authHelper = new AuthHelper();
    await updateBalanceByAccountId(authHelper.user.accountId, 700);
    await test.step(`Prepare data accountId is ${data.targetUser.accountId}`, async () => {
      insertNewUserAccountIfNotExist(
        data.targetUser.accountId,
        data.targetUser.password,
        data.targetUser.firstName,
        data.targetUser.lastName,
        `${data.targetUser.firstName} ${data.targetUser.lastName}`,
        0
      );
    });

    const helper = new TransferHelper(page);
    const beforeTransactions = await helper.getTransactions();
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
    // TODO: test expect balance
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.enter_a_number);
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectTransactionsToBeEqual(beforeTransactions);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });
  test("TC36: Transfer with decimal amount", async ({ page }) => {
    const data = testcase.TC36.data;
    const step = testcase.TC36.step;
    const expectation = testcase.TC36.expectation;

    // Prepare data before
    const authHelper = new AuthHelper();
    await updateBalanceByAccountId(authHelper.user.accountId, 700);
    await test.step(`Prepare data accountId is ${data.targetUser.accountId}`, async () => {
      insertNewUserAccountIfNotExist(
        data.targetUser.accountId,
        data.targetUser.password,
        data.targetUser.firstName,
        data.targetUser.lastName,
        `${data.targetUser.firstName} ${data.targetUser.lastName}`,
        0
      );
    });

    const helper = new TransferHelper(page);
    const beforeTransactions = await helper.getTransactions();
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
    // TODO: test expect balance
    await test.step(expectation.step.expect1, async () => {
      await helper.expectTooltipErrorMessage(
        locators.accountFormAmount,
        expectation.errorMsg.enter_a_number
      );
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectTransactionsToBeEqual(beforeTransactions);
    });
  });
  test("TC37: Transfer with negative or 0 amount", async ({ page }) => {
    const data = testcase.TC37.data;
    const step = testcase.TC37.step;
    const expectation = testcase.TC37.expectation;

    // Prepare data before
    const authHelper = new AuthHelper();
    await updateBalanceByAccountId(authHelper.user.accountId, 700);
    await test.step(`Prepare data accountId is ${data.targetUser.accountId}`, async () => {
      insertNewUserAccountIfNotExist(
        data.targetUser.accountId,
        data.targetUser.password,
        data.targetUser.firstName,
        data.targetUser.lastName,
        `${data.targetUser.firstName} ${data.targetUser.lastName}`,
        0
      );
    });

    const helper = new TransferHelper(page);
    const beforeTransactions = await helper.getTransactions();
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
    // TODO: test expect balance
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.enter_a_number);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectTransactionsToBeEqual(beforeTransactions);
    });
  });
  test("TC38: Transfer with insufficient balance", async ({ page }) => {
    const data = testcase.TC38.data;
    const step = testcase.TC38.step;
    const expectation = testcase.TC38.expectation;

    // Prepare data before
    const authHelper = new AuthHelper();
    await updateBalanceByAccountId(authHelper.user.accountId, 700);
    await test.step(`Prepare data accountId is ${data.targetUser.accountId}`, async () => {
      insertNewUserAccountIfNotExist(
        data.targetUser.accountId,
        data.targetUser.password,
        data.targetUser.firstName,
        data.targetUser.lastName,
        `${data.targetUser.firstName} ${data.targetUser.lastName}`,
        0
      );
    });

    const helper = new TransferHelper(page);
    const beforeTransactions = await helper.getTransactions();
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
    // TODO: test expect balance
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.enter_a_number);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectTransactionsToBeEqual(beforeTransactions);
    });
  });
});
