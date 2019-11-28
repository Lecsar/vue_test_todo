import { ActionTree } from "vuex";
import { TodoState, ActiveFilterName, UpdateTodoInfo } from "@/types";
import { RootState } from "@/store";
import {
  MUTATE_ADD_TODO,
  MUTATE_DELETE_TODO,
  MUTATE_UPDATE_TODO,
  MUTATE_TOGGLE_CHECK_ALL_TODO,
  MUTATE_SET_ACTIVE_FILTER,
  MUTATE_SET_EDITED_TODO_ID,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO_TEXT,
  TOGGLE_TODO,
  TOGGLE_CHECKED_ALL_TODO,
  SET_ACTIVE_FILTER,
  SET_EDITED_TODO_ID
} from "../const";

export const todoActions: ActionTree<TodoState, RootState> = {
  [ADD_TODO](context, newTodoName: string) {
    context.commit(MUTATE_ADD_TODO, newTodoName);
  },

  [DELETE_TODO](context, deletedId: number) {
    context.commit(MUTATE_DELETE_TODO, deletedId);
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
  },

  [TOGGLE_CHECKED_ALL_TODO](context, checked: boolean) {
    context.commit(MUTATE_TOGGLE_CHECK_ALL_TODO, checked);
  },

  [SET_ACTIVE_FILTER](context, filterName: ActiveFilterName) {
    context.commit(MUTATE_SET_ACTIVE_FILTER, filterName);
  },

  [SET_EDITED_TODO_ID](context, editedTodoId: number | null) {
    context.commit(MUTATE_SET_EDITED_TODO_ID, editedTodoId);
  }
};
