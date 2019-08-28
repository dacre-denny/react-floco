import * as React from "react";
import { PropsWithChildren } from "react";
import { Else } from "./else";
import { isFunction } from "../helpers";

type BooleanFunction = () => boolean;
type Condition = BooleanFunction | boolean;
type IfProps = { condition: Condition };

const conditionMet = (condition: Condition): boolean => (isFunction(condition) ? (condition as BooleanFunction)() : condition) === true;

const isTypeElse = (element: React.ReactNode): boolean => !!element && (element as React.ReactElement).type === Else;

const isTypeNotElse = (element: React.ReactNode): boolean => !!element && (element as React.ReactElement).type !== Else;

/**
 * If component provides conditional rendering of inner content when condition prop:
 * - is an expression that evaluates to true
 * - is a function that returns true when invoked
 *
 * If this component has Else child components, the content of these children will be
 * rendered if the condition prop is not satisfied.
 *
 * @param props
 */
export const If: React.SFC<PropsWithChildren<IfProps>> = props => {
  const { children, condition } = props;

  if (condition === null || condition === undefined) {
    console.warn(`If: condition prop must be boolean or function`);
    return null;
  }

  if (Array.isArray(children)) {
    if (conditionMet(condition)) {
      return <>{children.filter(isTypeNotElse)}</>;
    } else {
      return <>{children.filter(isTypeElse)}</>;
    }
  }

  if (children) {
    if (conditionMet(condition) && isTypeNotElse(children)) {
      return <>{children}</>;
    }
    if (isTypeElse(children)) {
      return <>{children}</>;
    }
  }

  return null;
};
