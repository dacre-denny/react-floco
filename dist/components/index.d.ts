/// <reference types="react" />
declare const _default: {
    Switch: (props: import("react").PropsWithChildren<import("./switch").SwitchProps>) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>;
    Case: import("react").FunctionComponent<{
        for: import("../helpers").SwitchValue;
    }>;
    Default: import("react").FunctionComponent<{}>;
    If: import("react").FunctionComponent<import("react").PropsWithChildren<{
        condition: boolean | (() => boolean);
    }>>;
    Else: import("react").FunctionComponent<{}>;
    Repeat: <T extends object>(props: {
        times: number;
        children: (props: {
            key: number;
        } & T) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>;
    } & T) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>;
};
export default _default;
