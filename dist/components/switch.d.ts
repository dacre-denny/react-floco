import * as React from "react";
import { ValueProp } from "../helpers";
export interface CaseProps {
    for: ValueProp;
}
export interface SwitchProps {
    value: ValueProp;
}
export declare const Switch: React.SFC<SwitchProps>;
export declare const Case: React.SFC<CaseProps>;
export declare const Default: React.SFC;
