/*
 * @Author: sunheng
 * @Date: 2022-12-03 12:17:13
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-03 12:49:41
 * @Description: 请填写简介
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Showroom = () => import("../pages/Showroom/index.vue");
const Main = () => import("../pages/main.vue");
const routes: Array<RouteRecordRaw> = [
    { path: "/", name: "main", component: Main },
    { path: "/showroom", name: "Showroom", component: Showroom }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
