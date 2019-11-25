<template>
  <div class="todo-wrapper">
    <a-checkbox
      class="checkbox"
      v-on:change="toggleTodo(id)"
      v-bind:checked="checked"
    />
    <h3 class="text">{{ text }}</h3>
    <a-button class="clearBtn" v-on:click="deleteTodo(id)">&#10008;</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Todo extends Vue {
  @Prop() private id!: number;
  @Prop() private text!: string;
  @Prop() private checked!: boolean;

  toggleTodo(todoId: number) {
    this.$emit("toggleTodo", todoId);
  }

  deleteTodo(todoId: number) {
    this.$emit("deleteTodo", todoId);
  }
}
</script>

<style scoped lang="less">
.todo-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
  padding: 5px 0;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
}

.text {
  margin: 0;
  padding: 0;
  font-size: 20px;
  text-align: left;
  width: 83.5%;
}

.checkbox {
  margin: 5px 10px;
}
</style>
