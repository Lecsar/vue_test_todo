import Vue from "vue";
import Vuex from "vuex";
import { todoListStore } from "TodoList/module";
import { authStore } from "Login/module";

Vue.use(Vuex);

export interface RootState {
  isGlobalLoading: boolean;
}

export const store = new Vuex.Store<RootState>({
  state: {
    isGlobalLoading: false
  },

  mutations: {
    setIsGlobalLoading(state, isLoading: boolean) {
      state.isGlobalLoading = isLoading;
    }
  },

  modules: {
    todoList: todoListStore,
    auth: authStore
  }
});
