import * as React from "react";
import { Props, ValueProp } from "../helpers";
declare type CaseProps = {
    for: ValueProp;
};
declare type SwitchProps = Props & {
    value: ValueProp;
};
export declare const Switch: (props: SwitchProps) => JSX.Element | null;
export declare const Case: React.SFC<CaseProps>;
export declare const Default: React.SFC;
export {};
