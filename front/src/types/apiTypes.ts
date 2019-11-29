export enum Role {
  ADMIN = "Admin",
  USER = "User"
}

export interface UserInfo {
  id: number;
  login: string;
  password: string;
  token: string;
  refreshToken: string;
  role: Role;
}

export type SuccessAuthResponse = Omit<UserInfo, "password">;
