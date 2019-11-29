import { Module } from "vuex";
import { AuthState } from "@/types";
import { RootState } from "@/store";
import { getTokenFromLocalStorage } from "@/helpers";
import { authActions } from "./authActions";
import { MUTATE_SET_USER, MUTATE_SET_DIRTY_AUTH } from "../const";

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,

  state: {
    login: "",
    role: null,
    isDirtyAuth: false,
    token: getTokenFromLocalStorage()
  },

  actions: authActions,

  mutations: {
    [MUTATE_SET_USER](state, { login, role, token }) {
      state.login = login;
      state.role = role;
      state.token = token;
    },

    [MUTATE_SET_DIRTY_AUTH](state) {
      state.isDirtyAuth = true;
    }
  }
};
