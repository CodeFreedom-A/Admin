import { createVNode, render, VNode, VNodeTypes, AppContext } from "vue";

import { getId } from "#/index";

interface Options {
    options?: Recordable;
    ctx?: AppContext | null;
    container?: Element;
}

/**
 * script 渲染 dom
 */
export default class CreateVNode {
    readonly id: string = getId.next().value!;
    private vm: VNode;
    private component: VNodeTypes;
    private container: Element;

    constructor(component: VNodeTypes, params?: Options) {
        const { options, ctx, container } = {
            ctx: null,
            container: document.body,
            ...params
        };

        this.component = component;

        this.container = container;

        this.vm = createVNode(component, <Partial<PropsOptions>>{
            ...options,
            id: this.id,
            onClose: this.close,
            onChangeState: this.stateChange,
            onDestroy: this.destroy
        });

        // 挂载上下文
        this.vm.appContext = ctx;
    }

    // ComponentPublicInstance
    stateChange = (bool?: boolean) => (<Exposed>this.vm.component?.exposed).changeVisible(bool);

    reCreateVNode(options: Recordable, component?: VNodeTypes): Promise<any> {
        component && (this.component = component);

        this.vm = createVNode(component || this.component, <Partial<PropsOptions>>{
            ...options,
            id: this.id,
            close: this.close
        });

        return this.render(this.vm);
    }

    render = (vm: VNode | null = null): Promise<any> =>
        new Promise<any>(resolve => {
            !vm && (vm = this.vm);

            // bug: 🐛 第一次 获取宽度 高度  存在问题 加时间 也存在问题
            vm.props!.onVnodeMounted = () => setTimeout(() => resolve("onVnodeMounted"));

            vm.props!.onVnodeUpdated = () => setTimeout(() => resolve("onVnodeUpdated"));

            vm.props!.onVnodeBeforeUnmount = () => setTimeout(() => resolve("onVnodeBeforeUnmount"));

            // 此方法 如果当前组件注册过 再次重新render 就会 update 不会重新生成
            let container = document.createElement("div");
            render(vm, container);
            this.container.appendChild(container.firstElementChild!);
        });

    // 关闭 - 暂定
    close = () => this.render();

    // 销毁
    destroy = () => !!this.render() && this.container.removeChild(document.querySelector(`#${this.id}`)!);
}
