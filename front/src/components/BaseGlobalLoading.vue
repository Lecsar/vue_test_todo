<template>
  <div class="wrapper">
    <div v-if="isLoading" class="loading-wrapper">
      <a-spin size="large"></a-spin>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.loading-wrapper {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: white;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
