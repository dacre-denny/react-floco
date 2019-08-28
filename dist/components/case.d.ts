import * as React from "react";
import { SwitchValue } from "../helpers";
declare type CaseProps = {
    for: SwitchValue;
};
/**
 * Encloses content that is rendered in a Switch block when no Case matches the current Switch value.
 *
 * @param props
 */
export declare const Case: React.SFC<CaseProps>;
export declare const isTypeCaseMatch: (value: SwitchValue) => (element: React.ReactNode) => boolean;
export {};
