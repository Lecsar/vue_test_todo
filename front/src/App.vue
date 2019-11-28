<template>
  <div id="app">
    <BaseGlobalLoading :isLoading="isGlobalLoading">
      <router-view />
    </BaseGlobalLoading>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseGlobalLoading from "@/components/BaseGlobalLoading.vue";

export default {
  name: "App",

  components: {
    BaseGlobalLoading
  },

  computed: mapState({
    isGlobalLoading: s => s.isGlobalLoading
  })
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
