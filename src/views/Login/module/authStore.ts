import { Module } from "vuex";
import { AuthState } from "@/types";
import { RootState } from "@/store";
import {
  fakeApi,
  setTokenInLocalStorage,
  getTokenFromLocalStorage
} from "@/helpers";
import { router, TODO_LIST_PAGE_URL } from "@/router";

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,

  state: {
    login: "",
    role: null,
    isDirtyAuth: false
  },

  actions: {
    async manualLogin({ commit }, { login, password }) {
      try {
        const { role, token } = await fakeApi.authorization({
          login,
          password
        });
        commit("setUser", { login, role });

        router.push(TODO_LIST_PAGE_URL);
        setTokenInLocalStorage(token);
      } catch (error) {
        // eslint-disable-next-line
        console.error("Неверный логин или пароль");
      }
    },

    async autoLogin({ commit }) {
      commit("setIsGlobalLoading", true, { root: true });

      try {
        const token = getTokenFromLocalStorage();
        const { role, login } = await fakeApi.authorization({
          token
        });

        commit("setUser", { login, role });

        return true;
      } catch (error) {
        // eslint-disable-next-line
        console.error("Невалидный токен");

        return false;
      } finally {
        commit("setDirtyAuth");
        commit("setIsGlobalLoading", false, { root: true });
      }
    }
  },

  mutations: {
    setUser(state, { login, role }) {
      state.login = login;
      state.role = role;
    },

    setDirtyAuth(state) {
      state.isDirtyAuth = true;
    }
  }
};
