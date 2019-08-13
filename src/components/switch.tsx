import * as React from "react";
import { Props, ValueProp, findChild } from "../helpers";

interface CaseProps {
  for: ValueProp;
}

interface SwitchProps {
  value: ValueProp;
}

const MatchCase = (element: React.ReactElement<CaseProps>, value: any): boolean => element.type === Case && element.props.for === value;

const MatchDefault = (element: React.ReactElement): boolean => element.type === Default;

export const Switch: React.SFC<SwitchProps> = props => {
  let defaultChild: React.ReactNode = null;

  if (props.children) {
    const children = (Array.isArray(props.children) ? props.children : [props.children]) as React.ReactElement[];

    for (const child of children) {
      if (MatchCase(child, props.value)) {
        return <>{child}</>;
      } else if (MatchDefault(child)) {
        if (!defaultChild) {
          defaultChild = <>{child.props.children}</>;
        } else {
          console.warn("Multiple Default child encountered in Switch. Only one Default should exist per Switch");
        }
      } else {
        console.warn("Invalid child encountered in Switch. Only Case or Default should be used as children for Switch");
      }
    }
  }

  return <>{defaultChild}</>;
};

export const Case: React.SFC<CaseProps> = props => {
  return <>{props.children}</>;
};

export const Default: React.SFC = props => {
  return <>{props.children}</>;
};
