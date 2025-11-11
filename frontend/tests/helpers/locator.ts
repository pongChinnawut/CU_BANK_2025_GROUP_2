const accountForm = {
  accountFormAccountId: '//*[@id="root"]/div/div/div/div[5]/div[2]//*[@id="accountId"]',
  accountFormAmount: '//*[@id="root"]/div/div/div/div[5]/div[2]//*[@id="amount"]',
  accountFormComfirmButton: '//*[@id="root"]/div/div/div/div[5]/div[2]/form/button',
  accountFormErrorMessage: '//*[@id="root"]/div/div/div/div[5]/div[2]/form/div[3]/label',
};

const loginForm = {
  loginButton: '//*[@id="root"]/div/div/div/form/button',
  textLoginInMiddlePage: '//*[@id="root"]/div/div/div/h2',
  errorMsg: '//*[@id="root"]/div/div/div/form/label[2]/div/label'
}

const registerForm = {
  loginNavLink: '//*[@id="root"]/div/nav/div/a[1]',
  registerNavLink: '//*[@id="root"]/div/nav/div/a[2]',
  AccountNavLink: '//*[@id="root"]/div/nav/div/a[1]',
  accountId: "#accountId",
  password: "#password",
  firstName: "#firstName",
  lastName: "#lastName",
  registerButton: '//*[@id="root"]/div/div/div/form/button',
  loginButton: '//*[@id="root"]/div/div/div/form/button',
  errorMsg: '//*[@id="root"]/div/div/div/form/div/label',
}

export const locators = {
  ...registerForm,
  ...loginForm,
  ...accountForm,
};
