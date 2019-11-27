import { Role } from ".";

export interface AuthState {
  isDirtyAuth: boolean;
  login: string;
  role: Role | null;
}
