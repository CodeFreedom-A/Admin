type valueOf<T> = Record<keyof T, T[keyof T]>;

type Filter<T extends object | undefined, U> = {
    [P in Exclude<keyof T, U>]: T[P];
};

type Recordable<T = any> = Record<string, T>;

type MergeType<T extends Recordable<any>, R extends Recordable<any>> = {
    [P in keyof T | keyof R]: P extends keyof T & keyof R ? (R[P] extends Recordable ? MergeType<T[P], R[P]> : R[P] | T[P]) : P extends keyof T ? T[P] : P extends keyof R ? R[P] : never;
};

type ObjectExclude<T, K extends keyof T = keyof T> = K extends any ? (T[K] extends object ? K : never) : never;

type DeepMergeType<T extends Recordable<any>, R extends Recordable<any>> = { [P in Exclude<keyof T, keyof R>]: T[P] } & {
    [P in Exclude<keyof T & keyof R, ObjectExclude<T, keyof T & keyof R>>]?: T[P];
} & {
    [P in ObjectExclude<T, keyof T & keyof R>]: DeepMergeType<T[P], R[P]>;
};
