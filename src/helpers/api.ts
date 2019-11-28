import axios, { AxiosInstance } from "axios";
import { SuccessAuthResponse, Todo } from "@/types";

const client = axios.create({
  baseURL: "http://localhost:3000/"
});

class Api {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  getTodos() {
    return this.client.get<Todo[]>("todos");
  }

  authorization(login: string, password: string) {
    return this.client.post<SuccessAuthResponse>(
      "auth",
      JSON.stringify({ login, password }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  autoAuthorization(token: string) {
    return this.client.post<SuccessAuthResponse>(
      "authAuto",
      JSON.stringify({ token }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

export const api = new Api(client);
