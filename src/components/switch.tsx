import * as React from "react";
import { Props, ValueProp } from "../helpers";

type CaseProps = { for: ValueProp };
type SwitchProps = Props & { value: ValueProp };

const MatchCase = (element: React.ReactElement<CaseProps>, value: any): boolean => element.type === Case && element.props.for === value;

const MatchDefault = (element: React.ReactElement): boolean => element.type === Default;

export const Switch = (props: SwitchProps) => {
  if (props.children) {
    const children = (Array.isArray(props.children) ? props.children : [props.children]) as React.ReactElement[];

    if (children.some(child => child.type !== Default && child.type !== Case)) {
      console.warn(`Switch: unexpected child type. Switch only supports child components that are Case or Default`);
    }

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
