import * as React from "react";
import { Props } from "../helpers";

type CaseProps<T> = Props & { value: T };

export const Case = <T extends object>(props: CaseProps<T>) => {
  return <>{props.children}</>;
};
