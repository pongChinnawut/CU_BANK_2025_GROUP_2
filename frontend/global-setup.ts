import { type FullConfig } from "@playwright/test";
import {
  connectDatabase,
  deleteUserByAccountId,
  disconnectDatabase,
  insertNewUserAccountIfNotExist,
} from "./tests/helpers/database/action.helper";
import bcrypt from "bcryptjs";

async function globalSetup(config: FullConfig) {
  const testAccount = {
    firstName: process.env.TEST_FIRST_NAME!,
    lastName: process.env.TEST_LAST_NAME!,
    password: process.env.TEST_PASSWORD!,
    accountId: process.env.TEST_ACCOUNT_ID!,
    balance: 0,
  };

  await connectDatabase();

  // clear old test users
  await deleteUserByAccountId(testAccount.accountId);

  const salt = await bcrypt.genSalt(10);
  const testAccountPasswordHash = await bcrypt.hash(testAccount.password, salt);

  await insertNewUserAccountIfNotExist(
    testAccount.accountId,
    testAccountPasswordHash,
    testAccount.firstName,
    testAccount.lastName,
    `${testAccount.firstName} ${testAccount.lastName}`,
    testAccount.balance
  );

  await disconnectDatabase();
}

export default globalSetup;
