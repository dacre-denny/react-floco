import * as React from "react";
import { Props, isFunction } from "../helpers";

type Condition<T> = ((args?: T) => boolean) | boolean;
type IfProps<T> = Props & { condition: Condition<T> };

export const If = <T extends object>(props: IfProps<T>) => {
  if (isFunction(props.condition) === true || props.condition === true) {
    return <>{props.children}</>;
  } else {
    return null;
  }
};
