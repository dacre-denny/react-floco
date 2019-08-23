/// <reference types="react" />
import Components from "./components";
export declare const Switch: (props: import("./helpers").Props & {
    value: import("./helpers").ValueProp;
}) => JSX.Element | null;
export declare const Case: import("react").FunctionComponent<{
    for: import("./helpers").ValueProp;
}>;
export declare const Default: import("react").FunctionComponent<{}>;
export declare const If: <T extends object>(props: import("./helpers").Props & {
    condition: boolean | (() => boolean);
}) => JSX.Element | null;
export declare const Else: <T extends object>(props: import("./helpers").Props) => JSX.Element;
export declare const Repeat: <T extends object>(props: {
    times: number;
    children: (props: {
        key: number;
    } & T) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
} & T) => JSX.Element | null;
export default Components;
