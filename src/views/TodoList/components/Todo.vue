<template>
  <div class="todo-wrapper">
    <a-input
      class="editingInput"
      ref="editingInput"
      v-if="isEditedTodo"
      :defaultValue="text"
      @blur="throwOffTodoId"
      @keydown.esc="throwOffTodoId"
      @keydown.enter="$event => editTodoText($event.target.value)"
    />
    <div class="todo" v-else>
      <a-checkbox
        class="checkbox"
        :checked="checked"
        @change="toggleTodo(id)"
      />
      <h3 class="text" @dblclick="setEditedTodoId(id)">{{ text }}</h3>
      <a-button class="clearBtn" @click="deleteTodo(id)">&#10008;</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Todo extends Vue {
  @Prop() private id!: number;
  @Prop() private text!: string;
  @Prop() private checked!: boolean;
  @Prop() private isEditedTodo!: boolean;

  updated() {
    if (this.isEditedTodo) {
      (this.$refs.editingInput as any).focus();
    }
  }

  toggleTodo(todoId: number) {
    this.$emit("toggleTodo", todoId);
  }

  editTodoText(text: string) {
    const trimmedText = text.trim();

    if (trimmedText) {
      this.$emit("editTodoText", { todoId: this.id, text: trimmedText });
    } else {
      this.deleteTodo(this.id);
    }

    this.throwOffTodoId();
  }

  setEditedTodoId(todoId: number | null) {
    this.$emit("setEditedTodoId", todoId);
  }

  throwOffTodoId() {
    if (this.isEditedTodo) {
      this.setEditedTodoId(null);
    }
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

.todo {
  width: 100%;
  display: flex;
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

.editingInput {
  margin: 0 10px;
}
</style>
