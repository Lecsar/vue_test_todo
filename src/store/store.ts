import Vue from "vue";
import Vuex from "vuex";
import { todoListStore } from "TodoList/module";
import { authStore } from "Login/module";

Vue.use(Vuex);

export interface RootState {}

export const store = new Vuex.Store<RootState>({
  modules: {
    todoList: todoListStore,
    auth: authStore
  }
});
