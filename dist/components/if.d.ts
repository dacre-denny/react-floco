/// <reference types="react" />
import { Props } from "../helpers";
declare type Condition<T> = (() => boolean) | boolean;
declare type IfProps<T> = Props & {
    condition: Condition<T>;
};
export declare const If: <T extends object>(props: IfProps<T>) => JSX.Element | null;
export declare const Else: <T extends object>(props: Props) => JSX.Element;
export {};
