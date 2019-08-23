/// <reference types="react" />
declare const _default: {
    Switch: (props: import("../helpers").Props & {
        value: import("../helpers").ValueProp;
    }) => JSX.Element | null;
    Case: import("react").FunctionComponent<{
        for: import("../helpers").ValueProp;
    }>;
    Default: import("react").FunctionComponent<{}>;
    If: <T extends object>(props: import("../helpers").Props & {
        condition: boolean | (() => boolean);
    }) => JSX.Element | null;
    Else: <T extends object>(props: import("../helpers").Props) => JSX.Element;
    Repeat: <T extends object>(props: {
        times: number;
        children: (props: {
            key: number;
        } & T) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    } & T) => JSX.Element | null;
};
export default _default;
