import * as React from "react";
declare type RenderFunction<T> = (props: {
    key: number;
} & T) => React.ReactElement;
declare type RepeatProps<T> = {
    times: number;
    children: RenderFunction<T>;
} & T;
/**
 * Repeats rendering of inner content by number specified on times prop.
 *
 * @param props
 */
export declare const Repeat: <T extends object>(props: RepeatProps<T>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
export {};
