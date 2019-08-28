import * as React from "react";
import { Default, isTypeDefault } from "./default";
import { Case, isTypeCaseMatch } from "./case";
import { SwitchValue } from "../helpers";

export type SwitchProps = { value: SwitchValue };

const isTypeSupported = (element: React.ReactNode): boolean => !!element && ((element as React.ReactElement).type === Default || (element as React.ReactElement).type === Case);

/**
 * Switch component provides conditional rendering of inner content for Case blocks that
 * match on the specified value prop.
 *
 * If a strict match occurs between the Switch value and one or more Case children, then
 * the inner content of those Case components is rendered.
 *
 * If no matching case is found, and Default children are present in the Switch block, the
 * contents of those components is rendered.
 *
 * @param props
 */
export const Switch = (props: React.PropsWithChildren<SwitchProps>): React.ReactElement | null => {
  const { children, value } = props;

  if (Array.isArray(children)) {
    if (!children.some(isTypeSupported)) {
      console.warn(`Switch: only Case or Default children are supported`);
    }

    const matchedCases = children.filter(isTypeCaseMatch(value));
    if (matchedCases.length > 0) {
      return <>{matchedCases}</>;
    }

    const defaults = children.filter(isTypeDefault);
    if (defaults.length > 0) {
      return <>{defaults}</>;
    }
  } else if (children) {
    if (!isTypeSupported(children)) {
      console.warn(`Switch: only Case or Default children are supported`);
    }

    if (isTypeCaseMatch(value)(children) || isTypeDefault(children)) {
      return <>{children}</>;
    }
  }

  return null;
};
