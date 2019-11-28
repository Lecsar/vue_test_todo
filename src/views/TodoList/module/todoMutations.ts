import { MutationTree } from "vuex";
import { TodoState, UpdateTodoInfo, ActiveFilterName } from "@/types";
import {
  MUTATE_ADD_TODO,
  MUTATE_DELETE_TODO,
  MUTATE_UPDATE_TODO,
  MUTATE_TOGGLE_CHECK_ALL_TODO,
  MUTATE_SET_ACTIVE_FILTER,
  MUTATE_SET_EDITED_TODO_ID
} from "../const";

let lastId = 0;

export const todoMutations: MutationTree<TodoState> = {
  [MUTATE_ADD_TODO](state, text: string) {
    state.todos.unshift({
      id: lastId,
      text,
      checked: false
    });

    lastId++;
  },

  [MUTATE_DELETE_TODO](state, deletedId: number) {
    state.todos = state.todos.filter(({ id }) => deletedId !== id);
  },

  [MUTATE_UPDATE_TODO]({ todos }, { todoId, setNewTodo }: UpdateTodoInfo) {
    const todoIndex = todos.findIndex(({ id }) => todoId === id);
    const todo = todos[todoIndex];
    todos.splice(todoIndex, 1, setNewTodo(todo));
  },

  [MUTATE_TOGGLE_CHECK_ALL_TODO](state, checked: boolean) {
    state.todos = state.todos.map(todo => ({ ...todo, checked }));
  },

  [MUTATE_SET_ACTIVE_FILTER](state, filterName: ActiveFilterName) {
    state.activeFilter = filterName;
  },

  [MUTATE_SET_EDITED_TODO_ID](state, editedTodoId: number | null) {
    state.editedTodoId = editedTodoId;
  }
};
