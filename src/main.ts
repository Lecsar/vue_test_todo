import Vue from "vue";
import { Checkbox, Input, Button, Form } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import { router } from "./router";
import { store } from "./store";

Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Checkbox.name, Checkbox);

Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
