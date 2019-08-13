import * as React from "react";
import { Default } from "./default";
import { Case } from "./case";
import { Props, ValueProp, findChild } from "../helpers";

type SwitchProps<T> = Props & { value: T };

export const Switch = <T extends ValueProp>(props: SwitchProps<T>) => {
  const caseChild = findChild<SwitchProps<T>>(props, child => child.type === Case && child.props.value === props.value);
  if (caseChild) {
    return <>{caseChild}</>;
  }

  const defaultChild = findChild(props, child => child.type === Default);
  if (defaultChild) {
    return <>{defaultChild.props.children}</>;
  }

  return null;
};
