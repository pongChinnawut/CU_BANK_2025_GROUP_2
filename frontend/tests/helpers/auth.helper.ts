import authData from "../storage/auth.json";
import { IUser } from "./database/interfaces/user.interface";

export class AuthHelper {
  constructor(private origin = "http://localhost:3000") {}

  get token(): string {
    const userObj = this.getLocalStorageObject("user");
    return userObj?.token;
  }

  get user(): IUser {
    const userObj = this.getLocalStorageObject("user");
    return userObj?.user;
  }

  getLocalStorageObject(key: string) {
    const originData = authData.origins.find((o: any) => o.origin === this.origin);
    const item = originData?.localStorage.find((i: any) => i.name === key);
    return item ? JSON.parse(item.value) : null;
  }
}
