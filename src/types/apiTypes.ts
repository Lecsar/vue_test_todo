export enum Role {
  ADMIN = "Admin",
  USER = "User"
}

export interface UserInfo {
  id: number;
  login: string;
  password: string;
  token: string;
  role: Role;
}

export type SuccessAuthResponse = Omit<UserInfo, "password">;
