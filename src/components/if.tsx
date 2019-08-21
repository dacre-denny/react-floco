import * as React from "react";
import { Props, isFunction } from "../helpers";

type Condition<T> = (() => boolean) | boolean;
type IfProps<T> = Props & { condition: Condition<T> };
type ElseProps = Props;

const MatchElse = (element: React.ReactElement<ElseProps>): boolean => element.type === Else;

export const If = <T extends object>(props: IfProps<T>) => {
  if (props.children) {
    const children = (Array.isArray(props.children) ? props.children : [props.children]) as React.ReactElement[];

    if ((isFunction(props.condition) && (props.condition as () => boolean)()) || props.condition === true) {
      return <>{children.filter(child => !MatchElse(child))}</>;
    } else {
      return <>{children.filter(MatchElse)}</>;
    }
  }

  return null;
};

export const Else = <T extends object>(props: ElseProps) => {
  return <>{props.children}</>;
};
