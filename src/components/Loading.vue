<template>
    <div class="GlobalLoading">
        <svg xmlns="http://www.w3.org/2000/svg" :width="getWidth" :height="height" viewBox="0 0 30 27">
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="0.2" flood-color="#3365b3" />
                </filter>
            </defs>
            <path d="M22.4,6.5h-6.3L12,13.7L4.8,1.2L7.8,0H0l10.8,18.6c0.8,1.3,2.5,1.7,3.8,0.9 c0.4-0.2,0.7-0.5,0.9-0.9L22.4,6.5z" style="filter: url(#shadow)" fill="transparent" stroke="#3365b3" stroke-dasharray="90" stroke-dashoffset="90" stroke-width="0.2">
                <animate attributeName="stroke-dashoffset" dur="2.7s" repeatCount="indefinite" values="90 ; 45 ; 0 ; 0 ; 0 " keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1" />
                <animate attributeName="fill" dur="2.7s" repeatCount="indefinite" values="transparent ; transparent ; transparent ; transparent ; #3365b3 " keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1" />
            </path>
            <path d="M37.4,3.6h-3.5l-8.7,15.1c-0.8,1.3-2.5,1.7-3.8,0.9c-1.3-0.8-1.7-2.5-0.9-3.8l7.1-12.2h-9.8 l2-3.6h19.6z" fill="transparent" style="filter: url(#shadow)" stroke="#3365b3" stroke-width="0.2" stroke-dashoffset="126" stroke-dasharray="126">
                <animate attributeName="stroke-dashoffset" dur="2.7s" repeatCount="indefinite" values="126 ; 126 ; 126 ; 63 ; 0 " keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1" />
                <animate attributeName="fill" dur="2.7s" repeatCount="indefinite" values="transparent ; transparent ; transparent ; transparent ; #3365b3 " keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1" />
            </path>
        </svg>
        <span :style="{ fontSize }">{{ text }}</span>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from "vue";

    interface Props {
        text?: string;
        height?: string;
        fontSize?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        text: "加载中...",
        height: "15%",
        fontSize: "21px"
    });

    const getWidth = computed(() => `${parseFloat(props.height) * 2}${props.height.replace(/^[0-9\.]+/, "")}`);
</script>
