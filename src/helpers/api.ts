import axios, { AxiosInstance } from "axios";
import { SuccessAuthResponse } from "@/types";

const client = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json"
  }
});

type AuthData = {
  login?: string;
  password?: string;
  token?: string;
};

class Api {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  authorization(authData: AuthData) {
    return this.client.post<SuccessAuthResponse>(
      "auth",
      JSON.stringify(authData),
      {}
    );
  }
}

export const api = new Api(client);
