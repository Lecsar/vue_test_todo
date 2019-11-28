import { Role } from "../types";

export interface AuthState {
  isDirtyAuth: boolean;
  login: string;
  role: Role | null;
}
