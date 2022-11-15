import { DirectiveBinding, FunctionDirective, VNode } from "vue";

declare type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (el: T, binding: BindingDirective<V>, vnode: VNode<any, T>, prevVNode: Prev) => void;

declare interface ObjectDirective<T = any, V = any> {
    created?: DirectiveHook<T, null, V>;
    beforeMount?: DirectiveHook<T, null, V>;
    mounted?: DirectiveHook<T, null, V>;
    beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>;
    updated?: DirectiveHook<T, VNode<any, T>, V>;
    beforeUnmount?: DirectiveHook<T, null, V>;
    unmounted?: DirectiveHook<T, null, V>;
    getSSRProps?: (binding: DirectiveBinding, vnode: VNode) => Record<string, unknown> | undefined;
    deep?: boolean;
}

declare type DirectiveObject<T = any, V = any, R = any> = ObjectDirective<T, V> & R;
declare type BindingDirective<V = any, R = any> = DirectiveBinding<V> & { dir: DirectiveObject<any, V, R> };

declare type Directive<T = any, V = any> = ObjectDirective<T, V> | FunctionDirective<T, V>;

interface DirectiveType {
    name: string;
    directive: Directive;
}
