<!--
 * @Author: sunheng
 * @Date: 2022-12-03 15:17:51
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-03 15:36:56
 * @Description: 请填写简介
-->
<script setup lang="ts">
    import { World, Model, PointLight, OrbitCamera, Find } from "lingo3d-vue";
    import { ref } from "vue";
    // 定义数组
    let careFace = ref({});
    let carplace = ["前脸", "前轮毂", "后轮毂", "车身", "挡风玻璃", "引擎盖"];
    let colors = ["red", "blue", "green", "gray", "orange", "purple"];
    const handleClick = e => {
        console.log(e);

        if (carplace.includes(e.target.nativeObject3d.name)) careFace.value = e.target.outerObject3d;
    };
    const selectColor = index => {
        // console.log(index);
        careFace.value.material.color.set(colors[index]);
    };
</script>

<template>
    <div class="home-content">
        <div class="home-content-title">
            <h1>汽车展示与选配</h1>
        </div>
        <h2>点击车的鼻孔更换颜色</h2>
        <div class="select">
            <div class="select-item" v-for="(item, index) in colors" :key="index" @click="selectColor(index)">
                <div class="select-item-color" :style="{ backgroundColor: item }" />
            </div>
        </div>
    </div>
    <World>
        <!-- <LingoEditor /> -->
        <Model :x="-3.53" :y="38.26" :z="-11.82" :width="167.09" :depth="364.86" src="bmw.glb">
            <template v-for="item in carplace" :key="item">
                <Find :name="item" :id="item" :outline="false" @click="handleClick" />
            </template>
            <!-- <Find name="前脸" id="前脸" :outline="false" @click="handleClick" /> -->
        </Model>
        <PointLight :metalness-factor="1" :x="-17.23" :y="602.83" :z="247.48" :intensity="3" />
        <PointLight :x="-680.4" :y="682.36" :z="5.31" />
        <PointLight :x="720.96" :y="383.95" :z="304.55" />
        <PointLight :x="-63.94" :y="131.1" :z="-339.7" />
        <OrbitCamera :fov="90" :enableZoom="true" enableDamping autoRotate :minPolarAngle="100" active />

        <Setup />
    </World>
</template>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    .home-content {
        position: fixed;
        top: 0;
        right: 20px;
        z-index: 9999;
        color: #fff;
    }

    .select-item-color {
        width: 50px;
        height: 50px;
        border: 1px solid #ccc;
        margin: 10px;
        display: inline-block;
        cursor: pointer;
        border-radius: 10px;
    }
    .select {
        display: flex;
    }
</style>
