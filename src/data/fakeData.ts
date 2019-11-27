import { UserInfo, Role } from "@/types";

export const USERS: UserInfo[] = [
  {
    id: 1,
    login: "test",
    password: "test",
    role: Role.USER,
    token: "376453526"
  },

  {
    id: 2,
    login: "admin",
    password: "admin",
    role: Role.ADMIN,
    token: "1423738612231083"
  }
];
