<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <AddInput
      :hasTodos="hasTodos"
      :checkedAll="checkedAll"
      @addTodo="addTodo"
      @toggleCheckedAllTodo="toggleCheckedAllTodo"
    />
    <Todo
      v-for="todo in todos"
      :key="todo.id"
      :id="todo.id"
      :text="todo.text"
      :checked="todo.checked"
      :isEditedTodo="todo.id === editedTodoId"
      @toggleTodo="toggleTodo"
      @deleteTodo="deleteTodo"
      @setEditedTodoId="setEditedTodoId"
      @editTodoText="editTodoText"
    />
    <Filters
      v-if="hasTodos"
      :activeFilter="activeFilter"
      @setFilter="setActiveFilter"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import AddInput from "../components/AddInput";
import Todo from "../components/Todo";
import Filters from "../components/Filters";
import { ActiveFilterName } from "@/types";
import {
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_CHECKED_ALL_TODO,
  DELETE_TODO,
  SET_ACTIVE_FILTER,
  SET_EDITED_TODO_ID,
  EDIT_TODO_TEXT
} from "../const";

const { mapState, mapActions } = createNamespacedHelpers("todoList");

export default {
  name: "todolist",

  components: {
    AddInput,
    Todo,
    Filters
  },

  computed: mapState({
    todos: ({ todos, activeFilter }) =>
      todos.filter(({ checked }) => {
        switch (activeFilter) {
          case ActiveFilterName.CHECKED:
            return checked;
          case ActiveFilterName.UNCHECKED:
            return !checked;
          default:
            return true;
        }
      }),
    activeFilter: ({ activeFilter }) => activeFilter,
    editedTodoId: ({ editedTodoId }) => editedTodoId,
    hasTodos: ({ todos }) => !!todos.length,
    checkedAll: ({ todos }) => todos.every(({ checked }) => checked)
  }),

  methods: {
    ...mapActions({
      addTodo: ADD_TODO,
      toggleTodo: TOGGLE_TODO,
      toggleCheckedAllTodo: TOGGLE_CHECKED_ALL_TODO,
      deleteTodo: DELETE_TODO,
      setActiveFilter: SET_ACTIVE_FILTER,
      setEditedTodoId: SET_EDITED_TODO_ID,
      editTodoText: EDIT_TODO_TEXT
    })
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 500px;
}
</style>
