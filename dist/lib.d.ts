/// <reference types="react" />
declare const _default: {
    Switch: import("react").FunctionComponent<import("./components/switch").SwitchProps>;
    Case: import("react").FunctionComponent<import("./components/switch").CaseProps>;
    Default: import("react").FunctionComponent<{}>;
    If: <T extends object>(props: import("./helpers").Props & {
        condition: boolean | ((args?: T | undefined) => boolean);
    }) => JSX.Element | null;
    Repeat: (props: import("./helpers").Props & {
        times: number;
    }) => JSX.Element | null;
};
export default _default;
