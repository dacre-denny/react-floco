import * as React from "react";
import { PropsWithChildren } from "react";
import { Else } from "./else";
import { Loading } from "./loading";
import { isFunction } from "../helpers";

type BooleanFunction = () => boolean | Promise<boolean>;
type Condition = BooleanFunction | boolean;
type IfProps = { condition: Condition };

const isTypeLoading = (element: React.ReactNode): boolean => !!element && (element as React.ReactElement).type === Loading;

const isTypeElse = (element: React.ReactNode): boolean => !!element && (element as React.ReactElement).type === Else;

const isTypeNotElseNotLoading = (element: React.ReactNode): boolean => !!element && (element as React.ReactElement).type !== Else && (element as React.ReactElement).type !== Loading;

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

  const [cond, setCondition] = React.useState<boolean>();

  React.useEffect(() => {
    if (isFunction(props.condition)) {
      const r = (props.condition as BooleanFunction)();
      if (r instanceof Promise) {
        (r as Promise<boolean>).then(
          c => {
            setCondition(c);
          },
          () => {
            setCondition(false);
          }
        );
      } else if (typeof r === "boolean") {
        setCondition(r);
      }
    } else if (typeof props.condition === "boolean") {
      setCondition(props.condition);
    }
  }, [props.condition]);

  if (Array.isArray(children)) {
    if (cond === true) {
      console.log("zzzzzzzzzzzz", children.filter(isTypeNotElseNotLoading));
      return <>{children.filter(isTypeNotElseNotLoading)}</>;
    } else if (cond === false) {
      return <>{children.filter(isTypeElse)}</>;
    } else {
      console.log("xxx1xxxxxxxxx", children.filter(isTypeLoading));
      return <>{children.filter(isTypeLoading)}</>;
    }
  }

  if (children) {
    if (cond === true && isTypeNotElseNotLoading(children)) {
      return <>{children}</>;
    } else if (cond === false && isTypeElse(children)) {
      return <>{children}</>;
    } else if (isTypeLoading(children)) {
      return <>{children}</>;
    }
  }

  return null;
};
