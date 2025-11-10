import { test } from "@playwright/test";
import { RegistrationHelper } from "./helpers/registration.helper";
import { testcase } from "./raw_test_data.json/scenario1_raw_data.json";
import defineConfig from "../playwright.config";
import { connectDB, disconnectDB, mongoUrl } from "./helpers/mongoose.helper";
import { User } from "./helpers/models/user.model";

test.describe(`Navigate to the ${defineConfig.use?.baseURL} to Testing`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${defineConfig.use?.baseURL}`);
  });

  test.beforeAll(async () => {
    await connectDB(mongoUrl);
  });

  test.afterAll(async () => {
    await disconnectDB();
  });

  test("TC2: Register with non-numeric account number", async ({ page }) => {
    const data = testcase.TC2.data;
    const step = testcase.TC2.step;
    const expectation = testcase.TC2.expectation;

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.accountIdShouldContainNumbersOnly
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  test("TC3: Register with account number less than 10 digits", async ({
    page,
  }) => {
    const data = testcase.TC3.data;
    const step = testcase.TC3.step;
    const expectation = testcase.TC3.expectation;

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.accountIdMustBeExactly10DigitsLong
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  test("TC4: Register with account number more than 10 digits", async ({
    page,
  }) => {
    const data = testcase.TC4.data;
    const step = testcase.TC4.step;
    const expectation = testcase.TC4.expectation;

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.accountIdMustBeExactly10DigitsLong
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  async function forceRegisterNewAccount(
    accountId: string,
    password: string,
    firstName: string,
    lastName: string,
    balance: number
  ) {
    const foundAccountId = await User.findOne({ accountId: accountId });
    if (foundAccountId == null) {
      await User.create({
        firstName: firstName,
        password: password,
        lastName: lastName,
        accountId: accountId,
        balance: balance,
      });
    }
  }

  test("TC5: Register with duplicate account number", async ({ page }) => {
    const data = testcase.TC5.data;
    const step = testcase.TC5.step;
    const expectation = testcase.TC5.expectation;

    // Prepare data before
    forceRegisterNewAccount(
      data.accountId,
      data.password,
      data.firstName,
      data.lastName,
      0
    );

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(expectation.errorMsg.accountIdIsExist);
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });

    // Tear down this case
    await User.deleteMany({ accountId: data.accountId });
  });

  test("TC6: Register with non-numeric password", async ({ page }) => {
    const data = testcase.TC6.data;
    const step = testcase.TC6.step;
    const expectation = testcase.TC6.expectation;

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.passwordShouldContainNumnersOnly
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  test("TC7: Register with password less than 4 digits", async ({ page }) => {
    const data = testcase.TC7.data;
    const step = testcase.TC7.step;
    const expectation = testcase.TC7.expectation;

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.passwordMustBeExactly4DigitsLong
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  test("TC8: Register with password more than 4 digits", async ({ page }) => {
    const data = testcase.TC8.data;
    const step = testcase.TC8.step;
    const expectation = testcase.TC8.expectation;

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.passwordMustBeExactly4DigitsLong
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  test("TC9: Register with firstname causing total more than 30 chars", async ({
    page,
  }) => {
    const data = testcase.TC9.data;
    const step = testcase.TC9.step;
    const expectation = testcase.TC9.expectation;

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
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.firstAndLastNameMustNotExceed30Char
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  test("TC10: Register with lastname causing total more than 30 chars", async ({
    page,
  }) => {
    const data = testcase.TC10.data;
    const step = testcase.TC10.step;
    const expectation = testcase.TC10.expectation;

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

    //Expect
    await test.step(expectation.step.expect1, async () => {
      await helper.expectErrorMessage(
        expectation.errorMsg.firstAndLastNameMustNotExceed30Char
      );
    });
    await test.step(expectation.step.expect2, async () => {
      await helper.expectDisplaySubmitRegister();
    });
    await test.step(expectation.step.expect3, async () => {
      await helper.expectDisplayLoginNavLisk();
    });
    await test.step(expectation.step.expect4, async () => {
      await helper.expectDisplayRegisterNavLisk();
    });
  });

  // end
});
