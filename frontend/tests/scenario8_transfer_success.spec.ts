import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario8_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { getText } from "./utils/text";
import {
  connectDatabase,
  disconnectDatabase,
  insertNewUserAccountIfNotExist,
  updateBalanceByAccountId,
} from "./helpers/database/action.helper";
import { AuthHelper } from "./helpers/auth.helper";
import { TransferHelper } from "./helpers/transfer.helper";

test.describe(`Navigate to the ${defineConfig.use?.baseURL}/account to Testing`, () => {
  let BALANCE = 1000;
  test.beforeAll(async () => {
    const authHelper = new AuthHelper();
    await connectDatabase();
    await updateBalanceByAccountId(authHelper.user.accountId, BALANCE);
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

  test("TC30: Transfer with non-numeric target account", async ({ page }) => {
    const data = testcase.TC29.data;
    const step = testcase.TC29.step;
    const expectation = testcase.TC29.expectation;

    // Prepare data before
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
    await test.step(`${step.step1_fill_in_account_id} is ${data.targetUser.accountId}`, async () => {
      await helper.fillAccountId(data.targetUser);
    });
    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_click_confirm_button_to_submit, async () => {
      await helper.submitTransaction();
      await page.waitForLoadState("networkidle");
    });

    // Expect
    const newBalance = BALANCE - +data.amount;
    await test.step(
      getText(expectation.step.expect1, {
        balance: newBalance,
      }),
      async () => {
        await helper.expectBalanceChange(newBalance);
      }
    );
    await test.step(
      getText(expectation.step.expect2, {
        target: data.targetUser.accountId,
        amount: data.amount,
        balance: newBalance,
      }),
      async () => {
        await helper.expectDisplayTransaction(+data.targetUser.accountId, +data.amount, newBalance);
      }
    );
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });
});
