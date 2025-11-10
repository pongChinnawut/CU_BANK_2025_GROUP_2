import { connectDB, disconnectDB, mongoUrl } from "./mongoose.helper";
import { User } from "./models/user.model";

export async function connectDatabase() {
  return await connectDB(mongoUrl);
}

export async function disconnectDatabase() {
  return await disconnectDB();
}

export async function clearUserTransactionsByAccountId(accountId: string) {
  return await User.updateOne({ accountId }, { $set: { transactions: [] } });
}

export async function findUserByAccountId(accountId: string) {
  return await User.findOne({ accountId: accountId });
}

export async function insertNewUserAccountIfNotExist(
  accountId: string,
  password: string,
  firstName: string,
  lastName: string,
  balance: number
) {
  const foundAccountId = await findUserByAccountId(accountId);
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

export async function deleteUserByAccountId(accountId: string) {
  await User.deleteMany({ accountId: accountId });
}
