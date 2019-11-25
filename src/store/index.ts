import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

export enum ActiveFilterName {
  ALL = "All",
  CHECKED = "Checked",
  UNCHECKED = "Unchecked"
}

interface State {
  todos: Todo[];
  activeFilter: ActiveFilterName;
}

let lastId = 0;

export default new Vuex.Store<State>({
  state: {
    todos: [],
    activeFilter: ActiveFilterName.ALL
  },
  mutations: {
    addTodo(state, text: string) {
      state.todos.unshift({
        id: lastId,
        text,
        checked: false
      });

      lastId++;
    },

    deleteTodo(state, deletedId: number) {
      state.todos = state.todos.filter(({ id }) => deletedId !== id);
    },

    toggleTodo({ todos }, todoId: number) {
      const todoIndex = todos.findIndex(({ id }) => todoId === id);
      const todo = todos[todoIndex];
      todos.splice(todoIndex, 1, { ...todo, checked: !todo.checked });
    },

    toggleCheckedAllTodo(state, checked: boolean) {
      state.todos = state.todos.map(todo => ({ ...todo, checked }));
    },

    setActiveFilter(state, filterName: ActiveFilterName) {
      state.activeFilter = filterName;
    }
  },
  actions: {
    addTodo(context, newTodoName: string) {
      context.commit("addTodo", newTodoName);
    },

    deleteTodo(context, deletedId: number) {
      context.commit("deleteTodo", deletedId);
    },

    toggleTodo(context, todoId: number) {
      context.commit("toggleTodo", todoId);
    },

    toggleCheckedAllTodo(context, checked: boolean) {
      context.commit("toggleCheckedAllTodo", checked);
    },

    setActiveFilter(context, filterName: ActiveFilterName) {
      context.commit("setActiveFilter", filterName);
    }
  },
  modules: {}
});
