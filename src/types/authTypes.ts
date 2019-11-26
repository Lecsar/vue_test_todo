import { Role } from ".";

export interface AuthState {
  login: string;
  role: Role | null;
}
