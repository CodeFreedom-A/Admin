import CreateVNode from "#/CreateVNode";
import { DirectiveType, BindingDirective } from "../type";
import Tooltip from "./Tooltip.vue";

type BindingType = BindingDirective<any, {}>;

const SaveData = new Map<string, { vnode: CreateVNode; mouseenter: () => void; mouseleave: () => void }>();

export default <DirectiveType>{
    name: "tooltip",
    directive: {
        mounted(el: HTMLElement, binding: BindingType, vnode) {
            if (SaveData.get(el.dataset._id || "")) return;

            el.style.position = "relative";
            el.style.cursor = "pointer";

            const tooltipIns = new CreateVNode(Tooltip, {
                container: el,
                ctx: vnode.appContext,
                options: {
                    ...binding.value,
                    container: el
                }
            });

            tooltipIns.render();

            let timeoutId: any = null;

            SaveData.set((el.dataset._id = tooltipIns.id), {
                vnode: tooltipIns,
                mouseenter: () => {
                    if (!timeoutId) return tooltipIns.stateChange();
                    clearTimeout(timeoutId);
                    timeoutId = null;
                },
                mouseleave: () =>
                    (timeoutId = setTimeout(() => {
                        tooltipIns.stateChange();
                        timeoutId = null;
                    }, 360))
            });

            el.addEventListener("mouseenter", SaveData.get(tooltipIns.id)!.mouseenter, false);
            el.addEventListener("mouseleave", SaveData.get(tooltipIns.id)!.mouseleave, false);
        },
        beforeUnmount: (el: HTMLElement) => {
            if (!el.dataset._id || !SaveData.get(el.dataset._id)) return;
            el.removeEventListener("mouseenter", SaveData.get(el.dataset._id)!.mouseenter, false);
            el.removeEventListener("mouseleave", SaveData.get(el.dataset._id)!.mouseleave, false);
            SaveData.get(el.dataset._id)!.vnode.destroy();
            SaveData.delete(el.dataset._id);
        }
    }
};
