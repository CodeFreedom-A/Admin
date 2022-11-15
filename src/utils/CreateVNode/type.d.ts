interface PropsOptions {
    [x: string]: any;
    id: string;
    close: () => void;
}

interface Exposed {
    [x: string]: any;
    changeVisible: (bool?: boolean) => void;
}
