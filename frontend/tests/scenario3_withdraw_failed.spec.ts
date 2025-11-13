import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario3_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { DepositHelper } from "./helpers/deposit.helper";

test.describe(`Navigate to the ${defineConfig.use?.baseURL}/account to Testing`, () => {
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
    // await test.step(expectation.step.expect1, async () => {
    //   await helper.expectErrorMessage(expectation.errorMsg.account_id_should_contain_numbers_only);
    // });
    // await test.step(expectation.step.expect3, async () => {
    //   await helper.expectDisplayAccountNavLink();
    // });
  });
});
