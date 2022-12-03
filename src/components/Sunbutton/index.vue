<!--
 * @Author: sunheng
 * @Date: 2022-12-03 11:40:16
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-03 12:15:39
 * @Description: 请填写简介
-->

<script setup lang="ts"></script>
<template>
    <div class="sun_button">
        <div> 点击进入 </div>
    </div>
</template>
<style lang="scss">
    .sun_button {
        width: 133px;
        height: 38px;
        background: red;
        text-align: center;
        line-height: 38px;
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 16px;
        color: #fff;
        border-radius: 30px;
        background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        background-size: 200%;
        z-index: 1;
        transform: translate(-50%, -50%);
        cursor: pointer;
        user-select: none;
    }
    .sun_button:hover {
        animation: sun 8s infinite;
    }
    .sun_button:hover::before {
        animation: sun 8s infinite;
    }
    .sun_button::after {
        content: "";
        position: absolute;
        left: -2px;
        top: -2px;
        bottom: -2px;
        right: -2px;
        background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        background-size: 200%;
        filter: blur(20px);
        border-radius: 30px;
        z-index: -1;
    }
    @keyframes sun {
        100% {
            background-position: -400%, 0;
        }
    }
</style>
