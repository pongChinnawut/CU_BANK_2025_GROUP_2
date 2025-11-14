const navLink = {
  loginNavLink: '//*[@id="root"]/div/nav/div/a[1]',
  registerNavLink: '//*[@id="root"]/div/nav/div/a[2]',
  accountNavLink: '//*[@id="root"]/div/nav/div/a[1]',
};

const userDetails = {
  userBalance: '//*[@id="root"]/div/div/div/div[2]/article/h1[3]',
};

const accountForm = {
  accountFormAccountId: '//*[@id="root"]/div/div/div/div[5]/div[2]//*[@id="accountId"]',
  accountFormAmount: '//*[@id="root"]/div/div/div/div[5]/div[2]//*[@id="amount"]',
  accountFormComfirmButton: '//*[@id="root"]/div/div/div/div[5]/div[2]/form/button',
  accountFormErrorMessage: '//*[@id="root"]/div/div/div/div[5]/div[2]/form/div[3]/label',
  balanceAmount: '//*[@id="root"]/div/div/div/div[2]/article/h1[3]',
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

const depositForm = {
  depositAmount: '//*[@id="amount"]',
  depositSubmitButton: '//*[@id="root"]/div/div/div/div[3]/div[2]/form/button',
  depositErrorText: '//*[@id="root"]/div/div/div/div[3]/div[2]/form/div/label',
};

const withdrawForm = {
  withdrawAmount: '//*[@id="amount"]',
  withdrawSubmitButton: '//*[@id="root"]/div/div/div/div[4]/div[2]/form/button',
  withdrawErrorText: '//*[@id="root"]/div/div/div/div[4]/div[2]/form/div/label',
};

const billForm = {
  billFormAmount: '//*[@id="root"]/div/div/div/div[6]/div[2]/form//*[@id="amount"]',
  billFormWaterCharge: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/div[1]/input[1]',
  billFormElectricCharge: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/div[1]/input[2]',
  billFormPhoneCharge: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/div[1]/input[3]',
  billFormSubmitButton: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/button',
  billFormErrorMessage: '//*[@id="root"]/div/div/div/div[6]/div[2]/form/div[3]/label',
};

const transactionsHistory = {
  transactions: '//*[@id="root"]/div/div/div/div[7]/div',
};

const recentTransactionHistory = {
  recentTransaction: `${transactionsHistory.transactions}[last()]`,
};

export const locators = {
  ...navLink,
  ...userDetails,
  ...registerForm,
  ...loginForm,
  ...accountForm,
  ...billForm,
  ...transactionsHistory,
  ...depositForm,
  ...recentTransactionHistory,
  ...withdrawForm,
};
