import { UserInfo, SuccessAuthResponse } from "@/types";
import { USERS } from "@/data";

const createToken = () => String(Math.floor(Math.random() * 100000));

class FakeApi {
  private users: UserInfo[];

  constructor(users: UserInfo[]) {
    this.users = users;
  }

  authorization(login: string, password: string): Promise<SuccessAuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const findedUser = this.users.find(
          u => u.login === login && u.password === password
        );

        if (findedUser) {
          const token = createToken();
          findedUser.token = token;
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
