import { ActionTree } from "vuex";
import { TodoState, UpdateTodoInfo } from "@/types";
import { RootState } from "@/store";
import { MUTATE_UPDATE_TODO, EDIT_TODO_TEXT, TOGGLE_TODO } from "../const";

export const todoActions: ActionTree<TodoState, RootState> = {
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
