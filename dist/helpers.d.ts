/// <reference types="react" />
export declare type ValueProp = object | string | number;
export interface Props {
    children?: React.ReactNode | React.ReactNode[];
}
export declare const isFunction: (value: any) => boolean;
export declare const findChild: <T extends any>(props: Props, matcher: (node: import("react").ReactElement<T, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>) => boolean) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)> | null;
