<template>
  <div class="filter-wrapper">
    <span
      :class="{
        filter: true,
        'filter--active': activeFilter === 'All'
      }"
      @click="setFilter('All')"
      >All</span
    >
    <span
      :class="{
        filter: true,
        'filter--active': activeFilter === 'Checked'
      }"
      @click="setFilter('Checked')"
      >Checked</span
    >
    <span
      :class="{
        filter: true,
        'filter--active': activeFilter === 'Unchecked'
      }"
      @click="setFilter('Unchecked')"
      >Unchecked</span
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Filters extends Vue {
  @Prop() activeFilter!: string;

  setFilter(filterName: string) {
    this.$emit("setFilter", filterName);
  }
}
</script>

<style lang="less" scoped>
.filter-wrapper {
  display: flex;
}

.filter {
  font-size: 20px;
  margin: 0px 10px;
  padding: 5px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid white;

  &--active,
  &:hover {
    border-color: #f9a825;
  }
}
</style>
