import { UserInfo, SuccessAuthResponse } from "@/types";
import { USERS } from "@/data";

type AuthData = {
  login?: string;
  password?: string;
  token?: string;
};

class FakeApi {
  private users: UserInfo[];

  constructor(users: UserInfo[]) {
    this.users = users;
  }

  authorization(authData: AuthData): Promise<SuccessAuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let predicate = (user: UserInfo) => false;

        if (authData.token) {
          predicate = (user: UserInfo) => user.token === authData.token;
        } else if (authData.login && authData.password) {
          predicate = ({ login, password }: UserInfo) =>
            login === authData.login && password === authData.password;
        }

        const findedUser = this.users.find(predicate);

        if (findedUser) {
          const { password, ...response } = findedUser;
          resolve(response);
        } else {
          reject();
        }
      }, 1500);
    });
  }
}

export const fakeApi = new FakeApi(USERS);
