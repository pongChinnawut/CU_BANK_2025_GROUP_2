import { type FullConfig } from "@playwright/test";
import {
  connectDatabase,
  deleteUserByAccountId,
  disconnectDatabase,
} from "./tests/helpers/database/action.helper";

export default async function globalTeardown(_: FullConfig) {
  await connectDatabase();
  await deleteUserByAccountId(process.env.TEST_ACCOUNT_ID!);
  await disconnectDatabase();
}
