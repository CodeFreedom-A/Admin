<template>
    <Transition>
        <div v-show="visible" class="Tooltip" ref="tooltipRef" :style="cssVar">
            <slot> {{ text || "" }} </slot>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
    import { computed, nextTick, ref, watch } from "vue";
    const props = withDefaults(
        defineProps<{
            text: string;
            container: HTMLElement;
            position?: "bottom" | "left" | "top" | "right";
        }>(),
        {
            position: "bottom"
        }
    );

    const visible = ref(false);
    const tooltipRef = ref<HTMLElement>();

    const cssVar = computed(() => {
        let baseNum = ["bottom", "right"].includes(props.position) ? -1 : 1,
            type = ["bottom", "top"].includes(props.position) ? "Y" : "X";

        return {
            "--active-transform": `translate${type}(0px)`,
            "--form-to-transform": `translate${type}(${baseNum * 27}px)`
        };
    });

    watch(visible, bool => {
        if (!bool) return;

        function setPosition(type: typeof props.position, isAdjust = false) {
            if (!tooltipRef.value) return;
            const { width: containerWidth, height: containerHeight, left, top } = props.container.getBoundingClientRect();
            const { width, height } = tooltipRef.value.getBoundingClientRect();

            let value = 0;

            switch (props.position) {
                case "bottom":
                    type = "left";
                    value = (containerWidth - width) / 2;
                    if (top + height + containerHeight > document.body.clientHeight && !isAdjust) return setPosition("top", true);
                    break;
                case "left":
                    value = -width - 3;
                    if (value < 0 && !isAdjust) return setPosition("right", true);
                    tooltipRef.value.style.top = `${(containerHeight - height) / 2}px`;
                    break;
                case "top":
                    type = "left";
                    value = (containerWidth - width) / 2;
                    if (value < 0 && !isAdjust) return setPosition("bottom", true);
                    tooltipRef.value.style.top = `${-height - 3}px`;
                    break;
                case "right":
                    value = -width - 3;

                    if (left - value + width > document.body.clientWidth && !isAdjust) return setPosition("left", true);
                    tooltipRef.value.style.top = `${(containerHeight - height) / 2}px`;
                    break;
            }

            tooltipRef.value.style[type] = `${value}px`;
        }
        nextTick(() => setPosition(props.position));
    });

    defineExpose({
        changeVisible: (bool?: boolean) => (visible.value = bool === undefined ? !visible.value : bool)
    });
</script>

<style lang="scss" scoped>
    .Tooltip {
        position: absolute;
        height: 24px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 4px rgba(51, 101, 179, 0.2);
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3365b3;
        padding: 3px 9px;
        border-radius: 4px;
        bottom: -27px;
        line-height: 17px;
        white-space: nowrap;
        cursor: auto;
        z-index: 999999;
        user-select: none;
        pointer-events: none;
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.24s ease-in-out;
        transform: var(--active-transform);
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
        transform: var(--form-to-transform);
    }
</style>
