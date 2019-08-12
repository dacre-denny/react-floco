/// <reference types="react" />
declare module "components/default" {
    export const Default: (props: any) => JSX.Element;
}
declare module "helpers" {
    export interface Props {
        children?: React.ReactNode | React.ReactNode[];
    }
    export const isFunction: (value: any) => boolean;
    export const findChild: <T extends any>(props: Props, matcher: (node: import("react").ReactElement<T, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>) => boolean) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)> | null;
}
declare module "components/case" {
    import { Props } from "helpers";
    type CaseProps<T> = Props & {
        value: T;
    };
    export const Case: <T extends object>(props: CaseProps<T>) => JSX.Element;
}
declare module "components/switch" {
    import { Props } from "helpers";
    type SwitchProps<T> = Props & {
        value: T;
    };
    export const Switch: <T extends any>(props: SwitchProps<T>) => JSX.Element | null;
}
declare module "components/if" {
    import { Props } from "helpers";
    type Condition<T> = ((args?: T) => boolean) | boolean;
    type IfProps<T> = Props & {
        condition: Condition<T>;
    };
    export const If: <T extends object>(props: IfProps<T>) => JSX.Element | null;
}
declare module "components/repeat" {
    import { Props } from "helpers";
    type RepeatProps = Props & {
        times: number;
    };
    export const Repeat: (props: RepeatProps) => JSX.Element | null;
}
declare module "index" { }
