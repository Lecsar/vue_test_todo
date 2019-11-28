import { Module } from "vuex";
import { AuthState } from "@/types";
import { RootState } from "@/store";
import { authActions } from "./authActions";
import { MUTATE_SET_USER, MUTATE_SET_DIRTY_AUTH } from "../const";

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,

  state: {
    login: "",
    role: null,
    isDirtyAuth: false
  },

  actions: authActions,

  mutations: {
    [MUTATE_SET_USER](state, { login, role }) {
      state.login = login;
      state.role = role;
    },

    [MUTATE_SET_DIRTY_AUTH](state) {
      state.isDirtyAuth = true;
    }
  }
};
