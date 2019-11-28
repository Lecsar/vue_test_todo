<template>
  <main class="login-wrapper">
    <h1>Login Form</h1>

    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Login">
        <a-input
          placeholder="Login"
          v-decorator="[
            'login',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your login!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="Password">
        <a-input
          placeholder="Password"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-button html-type="submit">Login</a-button>
    </a-form>
  </main>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { Component, Prop, Vue } from "vue-property-decorator";
import { TODO_LIST_PAGE_URL } from "@/router";
import { MANUAL_LOGIN } from "../const";

const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  beforeCreate: function() {
    this.form = this.$form.createForm(this, { name: "register" });
  },

  methods: {
    ...mapActions({ login: MANUAL_LOGIN }),

    handleSubmit: function(e) {
      e.preventDefault();

      const redirectUrl = decodeURI(
        this.$router.history.current.query.redirectFrom || TODO_LIST_PAGE_URL
      );

      this.form.validateFields((err, fields) => {
        if (!err) {
          this.login({ ...fields, redirectUrl });
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 200px;
}

.loginBtn {
  margin: 5px 0;
}
</style>
