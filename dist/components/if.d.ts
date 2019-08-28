import * as React from "react";
import { PropsWithChildren } from "react";
declare type BooleanFunction = () => boolean;
declare type Condition = BooleanFunction | boolean;
declare type IfProps = {
    condition: Condition;
};
/**
 * If component provides conditional rendering of inner content when condition prop:
 * - is an expression that evaluates to true
 * - is a function that returns true when invoked
 *
 * If this component has Else child components, the content of these children will be
 * rendered if the condition prop is not satisfied.
 *
 * @param props
 */
export declare const If: React.SFC<PropsWithChildren<IfProps>>;
export {};
