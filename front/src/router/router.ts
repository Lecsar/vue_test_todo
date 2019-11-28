import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { store } from "@/store";
import { AuthState } from "@/types";
import { AUTO_LOGIN } from "Login/const";

Vue.use(VueRouter);

export const TODO_LIST_PAGE_URL = "/";
export const LOGIN_PAGE_URL = "/login";

const routes: RouteConfig[] = [
  {
    path: TODO_LIST_PAGE_URL,
    name: "todolist",
    component: () =>
      import(
        /* webpackChunkName: "todolist" */ "TodoList/containers/TodoList.vue"
      )
  },
  {
    path: LOGIN_PAGE_URL,
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "Login/containers/Login.vue"),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  }
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const getNeedAutoAuth = ((store: any) => () => {
  const { isDirtyAuth, login, role } = store.state.auth as AuthState;
  const isAuthUser = Boolean(login && role);

  return {
    isAuthUser,
    needAuth: !isDirtyAuth
  };
})(store);

router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some(({ meta }) => meta.public);
  // const onlyWhenLoggedOut = to.matched.some(
  //   ({ meta }) => meta.onlyWhenLoggedOut
  // );

  // if (onlyWhenLoggedOut) {
  //   return next(TODO_LIST_PAGE_URL);
  // }

  if (!isPublic) {
    const { isAuthUser, needAuth } = getNeedAutoAuth();

    if (isAuthUser) {
      // перейти на соответствующую страницу
      return next();
    } else if (needAuth) {
      // попробовать авторизоваться
      const hasPermission = await store.dispatch(`auth/${AUTO_LOGIN}`);

      if (hasPermission) {
        return next();
      }
    }

    // выкинуть на логин
    return next({
      path: LOGIN_PAGE_URL,
      query: { redirectFrom: encodeURI(to.fullPath) }
    });
  }

  next();
});
