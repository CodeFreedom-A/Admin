import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

import "@arco-design/web-vue/dist/arco.css";

import RegisterDirectives from "@/directives";

const appIns = createApp(App);

appIns.use(createPinia());

RegisterDirectives(appIns);

setTimeout(() => appIns.mount("#app"), 2700);
