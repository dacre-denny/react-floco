import * as React from "react";
import { ValueProp } from "../helpers";

export interface CaseProps {
  for: ValueProp;
}

export interface SwitchProps {
  value: ValueProp;
}

const MatchCase = (element: React.ReactElement<CaseProps>, value: any): boolean => element.type === Case && element.props.for === value;

const MatchDefault = (element: React.ReactElement): boolean => element.type === Default;

export const Switch: React.SFC<SwitchProps> = props => {
  if (props.children) {
    const children = (Array.isArray(props.children) ? props.children : [props.children]) as React.ReactElement[];
    const cases = children.filter(child => MatchCase(child, props.value));

    if (cases.length > 0) {
      return <>{cases}</>;
    }

    return <>{children.filter(MatchDefault)}</>;
  }

  return null;
};

export const Case: React.SFC<CaseProps> = props => {
  return <>{props.children}</>;
};

export const Default: React.SFC = props => {
  return <>{props.children}</>;
};
