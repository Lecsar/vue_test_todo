import Vue from "vue";
import Vuex from "vuex";
import { todoListStore } from "TodoList/module";
import { authStore } from "Login/module";

Vue.use(Vuex);

export interface RootState {
  isGlobalLoading: boolean;
}

export const SET_IS_GLOBAL_LOADING = "SET_IS_GLOBAL_LOADING";

export const store = new Vuex.Store<RootState>({
  state: {
    isGlobalLoading: false
  },

  mutations: {
    [SET_IS_GLOBAL_LOADING](state, isLoading: boolean) {
      state.isGlobalLoading = isLoading;
    }
  },

  modules: {
    todoList: todoListStore,
    auth: authStore
  },

  strict: true
});
