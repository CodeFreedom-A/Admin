<!--
 * @Author: sunheng
 * @Date: 2022-11-17 14:57:21
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-03 15:24:00
 * @Description: 请填写简介
-->
<template>
    <div class="Container">
        <router-view />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
    .Container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
