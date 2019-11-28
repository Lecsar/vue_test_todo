import { Module } from "vuex";
import { TodoState, ActiveFilterName } from "@/types";
import { RootState } from "@/store";

import { todoMutations } from "./todoMutations";
import { todoActions } from "./todoActions";

export const todoListStore: Module<TodoState, RootState> = {
  namespaced: true,

  state: {
    todos: [],
    activeFilter: ActiveFilterName.ALL,
    editedTodoId: null
  },

  mutations: todoMutations,
  actions: todoActions
};
