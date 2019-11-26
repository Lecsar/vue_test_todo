<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
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
      @:setFilter="setActiveFilter"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddInput from "@/components/AddInput.vue";
import Todo from "@/components/Todo";
import Filters from "@/components/Filters";
import { ActiveFilterName } from "@/store";

export default {
  name: "home",
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
    ...mapActions([
      "addTodo",
      "toggleTodo",
      "toggleCheckedAllTodo",
      "deleteTodo",
      "setActiveFilter",
      "setEditedTodoId",
      "editTodoText"
    ])
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 500px;
}
</style>
