<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <AddInput
      v-bind:hasTodos="hasTodos"
      v-bind:checkedAll="checkedAll"
      v-on:addTodo="addTodo"
      v-on:toggleCheckedAllTodo="toggleCheckedAllTodo"
    />
    <Todo
      v-for="todo in todos"
      v-bind:key="todo.id"
      v-bind:id="todo.id"
      v-bind:text="todo.text"
      v-bind:checked="todo.checked"
      v-on:toggleTodo="toggleTodo"
      v-on:deleteTodo="deleteTodo"
    />
    <Filters
      v-if="hasTodos"
      v-bind:activeFilter="activeFilter"
      v-on:setFilter="setActiveFilter"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddInput from "@/components/AddInput.vue";
import Todo from "@/components/Todo";
import Filters from "@/components/Filters";
import { ActiveFilterName } from "../store";

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
    hasTodos: ({ todos }) => !!todos.length,
    checkedAll: ({ todos }) => todos.every(({ checked }) => checked)
  }),
  methods: {
    ...mapActions([
      "addTodo",
      "toggleTodo",
      "toggleCheckedAllTodo",
      "deleteTodo",
      "setActiveFilter"
    ])
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 500px;
}
</style>
