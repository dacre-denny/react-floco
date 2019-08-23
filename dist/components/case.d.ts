/// <reference types="react" />
import { Props, ValueProp } from "../helpers";
declare type CaseProps<T> = Props & {
    value: T;
};
export declare const Case: <T extends ValueProp>(props: CaseProps<T>) => JSX.Element;
export {};
