/// <reference types="react" />
import Components from "./components";
export declare const Switch: import("react").FunctionComponent<import("./components/switch").SwitchProps>;
export declare const Case: import("react").FunctionComponent<import("./components/switch").CaseProps>;
export declare const Default: import("react").FunctionComponent<{}>;
export declare const If: <T extends object>(props: import("./helpers").Props & {
    condition: boolean | (() => boolean);
}) => JSX.Element | null;
export declare const Else: <T extends object>(props: import("./helpers").Props) => JSX.Element;
export declare const Repeat: (props: import("./helpers").Props & {
    times: number;
}) => JSX.Element | null;
export default Components;
