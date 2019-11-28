import { ActionTree } from "vuex";
import { TodoState, UpdateTodoInfo } from "@/types";
import { RootState, SET_IS_GLOBAL_LOADING } from "@/store";
import { api } from "@/helpers";
import {
  MUTATE_UPDATE_TODO,
  EDIT_TODO_TEXT,
  TOGGLE_TODO,
  GET_TODOS,
  MUTATE_SET_TODOS
} from "../const";

export const todoActions: ActionTree<TodoState, RootState> = {
  async [GET_TODOS](context) {
    context.commit(SET_IS_GLOBAL_LOADING, true, { root: true });

    try {
      const { data } = await api.getTodos();
      context.commit(MUTATE_SET_TODOS, data);
    } catch (error) {
      //eslint-disable-next-line
      console.error("Ошибка при получениие тудушек");
    } finally {
      context.commit(SET_IS_GLOBAL_LOADING, false, { root: true });
    }
  },

  [EDIT_TODO_TEXT](context, { todoId, text }) {
    context.commit(MUTATE_UPDATE_TODO, {
      todoId,
      setNewTodo: todo => ({ ...todo, text })
    } as UpdateTodoInfo);
  },

  [TOGGLE_TODO](context, todoId: number) {
    context.commit(MUTATE_UPDATE_TODO, {
      todoId,
      setNewTodo: todo => ({ ...todo, checked: !todo.checked })
    } as UpdateTodoInfo);
  }
};
