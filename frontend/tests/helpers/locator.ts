const navLink = {
  loginNavLink: '//*[@id="root"]/div/nav/div/a[1]',
  registerNavLink: '//*[@id="root"]/div/nav/div/a[2]',
  accountNavLink: '//*[@id="root"]/div/nav/div/a[1]',
};

const accountForm = {
  accountFormAccountId: '//*[@id="root"]/div/div/div/div[5]/div[2]//*[@id="accountId"]',
  accountFormAmount: '//*[@id="root"]/div/div/div/div[5]/div[2]//*[@id="amount"]',
  accountFormComfirmButton: '//*[@id="root"]/div/div/div/div[5]/div[2]/form/button',
  accountFormErrorMessage: '//*[@id="root"]/div/div/div/div[5]/div[2]/form/div[3]/label',
};

const loginForm = {
  loginButton: '//*[@id="root"]/div/div/div/form/button',
  textLoginInMiddlePage: '//*[@id="root"]/div/div/div/h2',
  errorMsgLogin: '//*[@id="root"]/div/div/div/form/label[2]/div/label',
};

const registerForm = {
  accountId: "#accountId",
  password: "#password",
  firstName: "#firstName",
  lastName: "#lastName",
  registerButton: '//*[@id="root"]/div/div/div/form/button',
  loginButton: '//*[@id="root"]/div/div/div/form/button',
  errorMsgRegister: '//*[@id="root"]/div/div/div/form/div/label',
};

const billForm = {
  billFormAmount: '//*[@id="root"]/div/div/div/div[6]/div[2]/form//*[@id="amount"]',
  billFormWaterCharge: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/div[1]/input[1]',
  billFormElectricCharge: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/div[1]/input[2]',
  billFormPhoneCharge: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/div[1]/input[3]',
  billFormSubmitButton: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/button',
};

export const locators = {
  ...navLink,
  ...registerForm,
  ...loginForm,
  ...accountForm,
  ...billForm,
};
