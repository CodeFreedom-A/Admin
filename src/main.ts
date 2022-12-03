/*
 * @Author: sunheng
 * @Date: 2022-11-17 14:57:21
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-03 12:41:45
 * @Description: 请填写简介
 */
import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

import "@arco-design/web-vue/dist/arco.css";

import RegisterDirectives from "@/directives";
// router
import router from "./router/index";

const appIns = createApp(App);

appIns.use(createPinia());
appIns.use(router);

RegisterDirectives(appIns);

setTimeout(() => appIns.mount("#app"), 2700);
