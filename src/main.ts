import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { registerPlugins } from "@/plugins";
import { Field } from "vee-validate";
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.component("Field", Field);
registerPlugins(app);
app.use(router);
app.mount("#app");
