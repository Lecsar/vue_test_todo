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
  editedTodoId: number | null;
}

interface UpdateTodoInfo {
  todoId: number;
  setNewTodo: (findedTodo: Todo) => Todo;
}

let lastId = 0;

export default new Vuex.Store<State>({
  state: {
    todos: [],
    activeFilter: ActiveFilterName.ALL,
    editedTodoId: null
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

    updateTodo({ todos }, { todoId, setNewTodo }: UpdateTodoInfo) {
      const todoIndex = todos.findIndex(({ id }) => todoId === id);
      const todo = todos[todoIndex];
      todos.splice(todoIndex, 1, setNewTodo(todo));
    },

    toggleCheckedAllTodo(state, checked: boolean) {
      state.todos = state.todos.map(todo => ({ ...todo, checked }));
    },

    setActiveFilter(state, filterName: ActiveFilterName) {
      state.activeFilter = filterName;
    },

    setEditedTodoId(state, editedTodoId: number | null) {
      state.editedTodoId = editedTodoId;
    }
  },

  actions: {
    addTodo(context, newTodoName: string) {
      context.commit("addTodo", newTodoName);
    },

    deleteTodo(context, deletedId: number) {
      context.commit("deleteTodo", deletedId);
    },

    editTodoText(context, { todoId, text }) {
      context.commit("updateTodo", {
        todoId,
        setNewTodo: todo => ({ ...todo, text })
      } as UpdateTodoInfo);
    },

    toggleTodo(context, todoId: number) {
      context.commit("updateTodo", {
        todoId,
        setNewTodo: todo => ({ ...todo, checked: !todo.checked })
      } as UpdateTodoInfo);
    },

    toggleCheckedAllTodo(context, checked: boolean) {
      context.commit("toggleCheckedAllTodo", checked);
    },

    setActiveFilter(context, filterName: ActiveFilterName) {
      context.commit("setActiveFilter", filterName);
    },

    setEditedTodoId(context, editedTodoId: number | null) {
      context.commit("setEditedTodoId", editedTodoId);
    }
  },

  modules: {}
});
