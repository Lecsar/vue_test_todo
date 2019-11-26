import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from "TodoList/containers/TodoList.vue";

Vue.use(VueRouter);

export const TODO_LIST_PAGE_URL = "/";
export const LOGIN_PAGE_URL = "/login";

const routes = [
  {
    path: TODO_LIST_PAGE_URL,
    name: "todolist",
    component: TodoList
  }
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
