/// <reference types="react" />
declare const _default: {
    Switch: import("react").FunctionComponent<import("./switch").SwitchProps>;
    Case: import("react").FunctionComponent<import("./switch").CaseProps>;
    Default: import("react").FunctionComponent<{}>;
    If: <T extends object>(props: import("../helpers").Props & {
        condition: boolean | (() => boolean);
    }) => JSX.Element | null;
    Else: <T extends object>(props: import("../helpers").Props) => JSX.Element;
    Repeat: (props: import("../helpers").Props & {
        times: number;
    }) => JSX.Element | null;
};
export default _default;
