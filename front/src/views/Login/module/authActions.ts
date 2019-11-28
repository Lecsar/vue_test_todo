import { ActionTree, MutationTree } from "vuex";
import { router } from "@/router";
import { AuthState } from "@/types";
import { RootState, SET_IS_GLOBAL_LOADING } from "@/store";
import {
  api,
  setTokenInLocalStorage,
  getTokenFromLocalStorage
} from "@/helpers";
import {
  MUTATE_SET_USER,
  MUTATE_SET_DIRTY_AUTH,
  MANUAL_LOGIN,
  AUTO_LOGIN
} from "../const";

export const authActions: ActionTree<AuthState, RootState> = {
  async [MANUAL_LOGIN]({ commit }, { login, password, redirectUrl }) {
    try {
      const { data } = await api.authorization(login, password);
      const { role, token } = data;
      commit(MUTATE_SET_USER, { login, role });

      router.push(redirectUrl);
      setTokenInLocalStorage(token);
    } catch (error) {
      // eslint-disable-next-line
      console.error("Неверный логин или пароль");
    }
  },

  async [AUTO_LOGIN]({ commit }) {
    commit(SET_IS_GLOBAL_LOADING, true, { root: true });

    try {
      const token = getTokenFromLocalStorage();
      const { data } = await api.autoAuthorization(token);
      const { role, login } = data;

      commit(MUTATE_SET_USER, { login, role });

      return true;
    } catch (error) {
      // eslint-disable-next-line
      console.error("Невалидный токен");

      return false;
    } finally {
      commit(MUTATE_SET_DIRTY_AUTH);
      commit(SET_IS_GLOBAL_LOADING, false, { root: true });
    }
  }
};
