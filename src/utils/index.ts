/**
 * @desc 防抖 触发多次只会执行一次
 * @param {*} fn
 * @param {*} delay
 * @returns cb 防抖函数 clear 清理函数
 */
export const debounce = (fn, options?: DebounceOptions): { cb: (...args) => void; clear: (callBeforeDisappearing?: Boolean) => void } | void => {
    if (typeof fn !== "function") {
        new Error("debounce, arguments[0] fn is not a function");
        return;
    }

    const { delay, IsDefaultThisArgs, immediate, unDebounceFn } = {
        delay: 600,
        IsDefaultThisArgs: true,
        immediate: false,
        ...options
    };

    let timeId: any = null;

    const self = this;

    immediate && fn();

    // 在 延迟的时间内触发过几次
    let index = 0,
        // 回调函数
        queuedCallback,
        // unDebounceFn ReturnValue
        returnValue;

    return {
        cb(...args) {
            clearTimeout(timeId);
            index++;
            returnValue = unDebounceFn?.();
            queuedCallback = () => {
                args.push({
                    executeCount: index,
                    unDebounceFnReturnValue: returnValue
                });

                fn.apply(IsDefaultThisArgs ? self : this, args);
                index = 0;
            };
            timeId = setTimeout(queuedCallback, delay);
        },
        clear: (callBeforeDisappearing = false) => {
            clearTimeout(timeId);
            callBeforeDisappearing && queuedCallback?.();
            return Promise.resolve();
        }
    };
};

/**
 * 监听某个元素 缩放的
 * @param el
 * @param cb
 * @param time
 * @returns
 */
export function resizeObserver(el: Element | null, cb = () => {}, time = 720): Function {
    if (!el) throw new Error("need a Element DOM");
    const resizeObserver = new ResizeObserver(debounce(cb, { delay: time })!.cb!);

    resizeObserver?.observe(el);

    return () => resizeObserver.unobserve(el);
}

/**
 * 保留位数
 * @param num
 * @param digits
 * @returns
 */
export function roundFun(num, digits) {
    return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
}

/**
 * 生成id
 */
export function* GeneratorID(len = 6) {
    // let hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while (true) {
        yield `${Date.now().toString(36)}_${roundFun(Math.random() * 999999999, len)}`;
    }
}

/**
 * --
 */
export const getId = GeneratorID();

/**
 * 根据变量 计算 数值
 * @param varName
 * @param sign
 * @returns
 */
export function resolveRootVar(varName: string[], sign = "+") {
    const getValue = value => getComputedStyle(document.documentElement).getPropertyValue(value);
    const computed = new Function("x", "y", `return x ${sign} y`);
    let result = 0;

    for (let index = 0; index < varName.length; index++) result = computed(result, parseFloat(getValue(varName[index])));

    return result;
}
