import { Module } from "vuex";
import { AuthState } from "@/types";
import { RootState } from "@/store";
import { fakeApi } from "@/helpers";
import { router, TODO_LIST_PAGE_URL } from "@/router";

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,

  state: {
    login: "",
    role: null
  },

  actions: {
    async manualLogin({ commit }, { login, password }) {
      try {
        const { role } = await fakeApi.authorization(login, password);
        commit("setUser", { login, role });
        router.push(TODO_LIST_PAGE_URL);
      } catch (error) {
        // eslint-disable-next-line
        console.error("Неверный логин или пароль");
      }
    }
  },

  mutations: {
    setUser(state, { login, role }) {
      state.login = login;
      state.role = role;
    }
  }
};
