<template>
  <div class="search-wrapper">
    <div class="search-block">
      <a-checkbox
        class="checkbox"
        v-if="hasTodos"
        :checked="checkedAll"
        @change="toggleCheckedAll"
      />
      <a-input
        class="input"
        :value="value"
        @change="$event => setValue($event.target.value)"
        @pressEnter="addTodo"
      />
      <a-button class="clearBtn" @click="clearInput">&#10008;</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AddInput extends Vue {
  @Prop() private checkedAll!: boolean;
  @Prop() private hasTodos!: boolean;
  private value: string;

  constructor() {
    super();
    this.value = "";
  }

  setValue(newValue: string) {
    this.value = newValue;
  }

  clearInput() {
    this.value = "";
  }

  addTodo() {
    this.$emit("addTodo", this.value);
    this.clearInput();
  }

  toggleCheckedAll() {
    this.$emit("toggleCheckedAllTodo", !this.checkedAll);
  }
}
</script>

<style scoped lang="less">
.search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-block {
  position: relative;
}

.checkbox {
  top: calc(50% - 10px);
  left: 10px;
  position: absolute;
  z-index: 2;
}

.input {
  width: 500px;
  height: 50px;
  padding: 15px 50px 15px 30px;
  font-size: 30px;
}

.clearBtn {
  position: absolute;
  right: 5px;
  top: calc(50% - 16px);
}
</style>
