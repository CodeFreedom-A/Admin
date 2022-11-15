// 小于某个值 用这个
const isMinThat = (value, min = 0) => (value < min ? min : value);

// 大于某个值 用这个
const isMaxThat = (value, max) => (value > max ? max : value);

let lastContainer: HTMLElement;

interface DragOptionsInterface {
    dragElement: HTMLElement;
    initPosition?: {
        left?: string;
        bottom?: string;
        right?: string;
        top?: string;
    };
}

export function Drag(container: HTMLElement, { dragElement, initPosition }: DragOptionsInterface) {
    let couldDrag = false,
        downX = 0,
        downY = 0,
        computedMaxValue = true;

    let { height: maxHeight, width: maxWidth } = document.body.getBoundingClientRect();

    if (initPosition) {
        container.style.left = initPosition.left!;
        container.style.top = initPosition.top!;
        container.style.right = initPosition.right!;
        container.style.bottom = initPosition.bottom!;
    }

    container.addEventListener("mousedown", el => {
        el.stopPropagation();

        if (computedMaxValue) {
            const { height: containerHeight, width: containerWidth } = container.getBoundingClientRect();

            maxHeight -= containerHeight;
            maxWidth -= containerWidth;

            computedMaxValue = false;
        }
        if (!dragElement.contains(el.target as Node)) return;

        // 处理层级
        lastContainer && (lastContainer.style.zIndex = "999");
        container.style.zIndex = "1000";
        lastContainer = container;

        const elPath = (el as MouseEvent & { path: HTMLElement[] }).path;

        const { x, y } = elPath.find(el => el.classList.contains("draggable-header"))!.getBoundingClientRect();

        downX = el.clientX - x;
        downY = el.clientY - y;

        couldDrag = true;
    });
    window.addEventListener("mousemove", e => {
        e.stopPropagation();
        if (!couldDrag) return;

        const top = e.y - downY,
            left = e.x - downX;

        container.style.top = `${isMaxThat(isMinThat(top), maxHeight)}px`;
        container.style.left = `${isMaxThat(isMinThat(left), maxWidth)}px`;
    });

    window.addEventListener("mouseup", e => {
        e.preventDefault();
        e.stopPropagation();
        couldDrag = false;
    });
    window.addEventListener("blur", e => {
        e.preventDefault();
        couldDrag = false;
    });
}
