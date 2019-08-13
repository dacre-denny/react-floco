import * as React from "react";
import { Props, ValueProp } from "../helpers";

type CaseProps<T> = Props & { value: T };

export const Case = <T extends ValueProp>(props: CaseProps<T>) => {
  return <>{props.children}</>;
};
