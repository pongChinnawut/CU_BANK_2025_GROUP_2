import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario6_raw_data.json";
import defineConfig from "../playwright.config";
import { expect, test } from "./fixtures/auth-fixtures";
import { BillHelper } from "./helpers/bill.helper";
import { AuthHelper } from "./helpers/auth.helper";
import { getText } from "./utils/text";
import {
  clearUserTransactionsByAccountId,
  connectDatabase,
  disconnectDatabase,
} from "./helpers/database/action.helper";
import { locators } from "./helpers/locator";

test.describe(`Navigate to the ${defineConfig.use?.baseURL}/account to Testing`, () => {
  test.beforeAll(async () => {
    connectDatabase();
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

  test("TC42: Pay bill with no radio button selection", async ({ page }) => {
    const data = testcase.TC42.data;
    const step = testcase.TC42.step;
    const expectation = testcase.TC42.expectation;
    const helper = new BillHelper(page);
    const authHelper = new AuthHelper();

    await clearUserTransactionsByAccountId(authHelper.user.accountId);

    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_submit_form, async () => {
      await helper.submitForm();
    });

    // Expect
    await test.step(
      getText(expectation.step.expect1, { balance: authHelper.user.balance }),
      async () => {
        await helper.expectDisplayBalance(authHelper.user.balance);
      }
    );
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayNoTransactions();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectTooltipErrorMessage(
        locators.billFormWaterCharge,
        expectation.errorMsg.plase_select_options
      );
    });
  });

  test("TC43: Pay water bill with non-numeric amount", async ({ page }) => {
    const data = testcase.TC43.data;
    const step = testcase.TC43.step;
    const expectation = testcase.TC43.expectation;
    const helper = new BillHelper(page);
    const authHelper = new AuthHelper();

    await clearUserTransactionsByAccountId(authHelper.user.accountId);

    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_submit_form, async () => {
      await helper.submitForm();
    });

    // Expect
    await test.step(
      getText(expectation.step.expect1, { balance: authHelper.user.balance }),
      async () => {
        await helper.expectDisplayBalance(authHelper.user.balance);
      }
    );
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayNoTransactions();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectTooltipErrorMessage(
        locators.billFormAmount,
        expectation.errorMsg.enter_number
      );
    });
  });

  test("TC44: Pay water bill with decimal amount", async ({ page }) => {
    const data = testcase.TC44.data;
    const step = testcase.TC44.step;
    const expectation = testcase.TC44.expectation;
    const helper = new BillHelper(page);
    const authHelper = new AuthHelper();

    await clearUserTransactionsByAccountId(authHelper.user.accountId);

    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_submit_form, async () => {
      await helper.submitForm();
    });

    // Expect
    await test.step(
      getText(expectation.step.expect1, { balance: authHelper.user.balance }),
      async () => {
        await helper.expectDisplayBalance(authHelper.user.balance);
      }
    );
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayNoTransactions();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectTooltipErrorMessage(
        locators.billFormAmount,
        expectation.errorMsg.enter_number
      );
    });
  });

  test("TC45: Pay water bill with negative or 0 amount", async ({ page }) => {
    const data = testcase.TC45.data;
    const step = testcase.TC45.step;
    const expectation = testcase.TC45.expectation;
    const helper = new BillHelper(page);
    const authHelper = new AuthHelper();

    await clearUserTransactionsByAccountId(authHelper.user.accountId);

    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_submit_form, async () => {
      await helper.submitForm();
    });

    // Expect
    await test.step(
      getText(expectation.step.expect1, { balance: authHelper.user.balance }),
      async () => {
        await helper.expectDisplayBalance(authHelper.user.balance);
      }
    );
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayNoTransactions();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayErrorMessage(expectation.errorMsg.enter_number);
    });
  });

  test("TC46: Pay water bill with insufficient balance", async ({ page }) => {
    const data = testcase.TC46.data;
    const step = testcase.TC46.step;
    const expectation = testcase.TC46.expectation;
    const helper = new BillHelper(page);
    const authHelper = new AuthHelper();

    await clearUserTransactionsByAccountId(authHelper.user.accountId);

    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_submit_form, async () => {
      await helper.submitForm();
      await page.waitForLoadState("networkidle");
    });

    // Expect
    await test.step(
      getText(expectation.step.expect1, { balance: authHelper.user.balance }),
      async () => {
        await helper.expectDisplayBalance(authHelper.user.balance);
      }
    );
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayNoTransactions();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayErrorMessage(expectation.errorMsg.not_enough);
    });
  });
});
