import { LoginHelper } from "./helpers/login.helper";
import { testcase } from "./raw_test_data.json/scenario6_raw_data.json";
import defineConfig from "../playwright.config";
import { test } from "./fixtures/auth-fixtures";
import { BillHelper } from "./helpers/bill.helper";
import { AuthHelper } from "./helpers/auth.helper";
import { getText } from "./utils/text";

test.describe(`Navigate to the ${defineConfig.use?.baseURL}/account to Testing`, () => {
  test("TC11: Login with all valid inputs", async ({ page }) => {
    const helper = new LoginHelper(page);

    await test.step("Display account page", async () => {
      await helper.expectDisplayAccountPage();
    });
  });

  test("TC42: Transfer with non-numeric target account", async ({ page }) => {
    const data = testcase.TC42.data;
    const step = testcase.TC42.step;
    const expectation = testcase.TC42.expectation;

    const helper = new BillHelper(page);
    const authHelper = new AuthHelper();

    await test.step(`${step.step2_fill_in_amount} is ${authHelper.user.balance}`, async () => {
      await helper.fillAmount(data);
    });
    await test.step(step.step3_submit_form, async () => {
      await helper.submitForm();
    });

    // Expect
    await test.step(getText(expectation.step.expect1, { amount: data.amount }), async () => {
      await helper.expectTooltipErrorMessage(expectation.errorMsg.plase_select_options);
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayAccountNavLink();
    });
  });
});
