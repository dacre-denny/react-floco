import Components from "./components";
import { SwitchProps } from "./components/switch";
import React = require("react");
declare type Ty = (props: React.PropsWithChildren<SwitchProps>) => React.ReactElement | null;
export declare const Switch: Ty;
export declare const Case: React.FunctionComponent<{
    for: import("./helpers").SwitchValue;
}>;
export declare const Default: React.FunctionComponent<{}>;
export declare const If: React.FunctionComponent<React.PropsWithChildren<{
    condition: boolean | (() => boolean);
}>>;
export declare const Else: React.FunctionComponent<{}>;
export declare const Repeat: <T extends object>(props: {
    times: number;
    children: (props: {
        key: number;
    } & T) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
} & T) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
export default Components;
