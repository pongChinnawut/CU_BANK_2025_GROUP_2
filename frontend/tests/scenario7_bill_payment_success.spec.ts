import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario7_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { BillHelper } from "./helpers/bill.helper";
import { getText } from "./utils/text";
import { connectDatabase, disconnectDatabase } from "./helpers/database/action.helper";

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

  //   💧water bill💧
  test("TC39: Pay water bill with valid amount", async ({ page }) => {
    const data = testcase.TC39.data;
    const step = testcase.TC39.step;
    const expectation = testcase.TC39.expectation;
    const helper = new BillHelper(page);
    const balance = await helper.getBalance();
    const beforeTransactionCount = await helper.getTransactions();

    await test.step(getText(step.step1_select_one_option, { bill: data.bill_type }), async () => {
      await helper.selectBill(data.bill_type);
    });
    await test.step(`${step.step2_fill_in_amount} is ${data.amount}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_submit_form, async () => {
      await helper.submitTransaction();
      await page.waitForLoadState("networkidle");
    });

    // // Expect
    const total = +balance - data.amount;
    await test.step(
      getText(expectation.step.expect1, {
        total: total,
        balance: balance,
        bill: data.amount,
      }),
      async () => {
        await helper.expectBalanceChange(total);
      }
    );
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplayTransactions();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });
});
