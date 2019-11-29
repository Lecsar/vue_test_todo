import axios, { AxiosInstance } from "axios";
import { SuccessAuthResponse, Todo } from "@/types";
import { store } from "@/store";

const client = axios.create({
  baseURL: "http://localhost:3000/"
});

const requestInterceptor = () => {};

const responseInterceptor = () => {};

client.interceptors.request.use(
  config => {
    /* eslint-disable */
    const { token } = (store.state as any).auth;

    config.headers = {
      ...config.headers,
      Authorization: token
    };

    return config;
  },
  error => {
    console.error(error);
    Promise.reject(error);
  }
);

client.interceptors.response.use(config => {
  const { status } = config;

  if (status === 403) {
    return config;
  }

  return config;
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
