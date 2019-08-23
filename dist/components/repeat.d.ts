import * as React from "react";
declare type RenderFunction<T> = (props: {
    key: number;
} & T) => React.ReactElement;
declare type RepeatProps<T> = {
    times: number;
    children: RenderFunction<T>;
} & T;
export declare const Repeat: <T extends object>(props: RepeatProps<T>) => JSX.Element | null;
export {};
