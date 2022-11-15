<template>
    <Transition appear name="nested" mode="out-in" :duration="360">
        <div class="Draggable" ref="DraggableContainer" v-show="isShow">
            <div class="draggable-header" ref="DraggableHeader">
                <p class="title" ref="Draggable"> {{ title }}</p>
                <div class="header-slot"> <slot name="header" /> </div>
                <div class="operation" @mousedown.stop="">
                    <i @click.stop="emit('close')"><IconClose size="12" /></i>
                </div>
            </div>
            <div class="draggable-body" :style="{ padding }">
                <slot />
            </div>
            <div class="footer" v-if="!!$slots.footer">
                <slot name="footer" />
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
    import { onMounted, ref, watch } from "vue";

    import { Drag } from "./Drag";

    import { IconClose } from "@arco-design/web-vue/es/icon";
    import { resolveRootVar } from "@/utils";

    // 组件 refs
    const DraggableContainer = ref<HTMLElement>();
    const DraggableHeader = ref<HTMLElement>();

    // TODO:优化      兼容 Dialog 吧 关闭显示操作拿出去了

    // 存在默认值的 props
    const props = withDefaults(
        defineProps<{
            left?: string;
            top?: string;
            right?: string;
            bottom?: string;
            title: string;
            isShow: boolean;
            padding?: string;
        }>(),
        {
            padding: "6px"
        }
    );

    const emit = defineEmits<{
        (e: "close"): void;
    }>();

    const defaultTop = `${resolveRootVar(["--header-height", "--main-toolbar-height"]) + 6}px`;

    const dispose = watch(
        () => props.top,
        value => {
            DraggableContainer.value!.style.top = value || defaultTop;
            dispose();
        }
    );

    defineExpose({
        el: DraggableContainer
    });

    onMounted(() => {
        Drag(DraggableContainer.value!, {
            dragElement: DraggableHeader.value!,
            initPosition: {
                left: props.left,
                top: props.top || defaultTop,
                right: props.right,
                bottom: props.bottom
            }
        });
    });
</script>
<style lang="scss" scoped>
    .Draggable {
        position: absolute;
        z-index: 1000;
        overflow: hidden;
        min-width: 240px;
        width: fit-content;
        // box-shadow: 0 1.5px 6px var(--color-mask-bg);
        box-shadow: 0px 0px 6px rgba(29, 58, 102, 0.08);
        border-radius: 1.5px;
        overflow: hidden;
        background-color: #fff;
        height: fit-content;
        .draggable-header {
            cursor: move;
            position: relative;
            z-index: 9;
            height: 42px;
            // border-bottom: 1px dotted #e9e9ea;
            display: flex;
            align-items: center;
            padding: 0 9px;
            user-select: none;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 600;
            line-height: 20px;
            color: #222222;
            // background-color: #fff;
            background-color: rgba(51, 101, 179, 0.39);
            .title {
                margin: 0;
            }
            .operation {
                display: flex;
                align-items: center;
                > i {
                    position: relative;
                    &::before {
                        content: "";
                        position: absolute;
                        width: 18px;
                        height: 18px;
                        border-radius: var(--border-radius-circle);
                        transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
                        z-index: -1;
                        transform: translate(-50%, -50%);
                        top: 50%;
                        left: 50%;
                    }
                    &:hover::before {
                        background-color: var(--color-fill-2);
                    }
                }
            }
            i {
                cursor: pointer;
            }
            .header-slot {
                flex: 1;
                width: auto;
                height: 100%;
                position: relative;
                margin: 0 15px;
            }
        }
        .draggable-body {
            position: relative;
            z-index: 6;
            min-height: 180px;
            > div {
                width: 100%;
                height: 100%;
            }
        }

        .footer {
            position: relative;
            height: 45px;
            border-top: 1px dotted #e9e9ea;
            display: flex;
            align-items: center;
            padding: 0 9px;
            user-select: none;
            background-color: #fff;
        }
    }

    /* 动画 */
    .nested-enter-active,
    .nested-leave-active {
        transition: all 0.24s ease-in-out;
    }
    /* delay leave of parent element */
    .nested-leave-active {
        transition-delay: 0.12s;
    }

    .nested-enter-from,
    .nested-leave-to {
        transform: translateY(-24%);
        opacity: 0;
    }
    /* we can also transition nested elements using nested selectors */
    .nested-enter-active .draggable-body,
    .nested-leave-active .draggable-body {
        transition: all 0.24s linear;
    }
    /* delay enter of nested element */
    .nested-enter-active .draggable-body {
        transition-delay: 0.12s;
    }

    .nested-enter-from .draggable-body,
    .nested-leave-to .draggable-body {
        transform: translateX(-36%);
        opacity: 0.0001;
    }
</style>
