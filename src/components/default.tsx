import * as React from "react";

/**
 * Encloses content that is rendered in a Switch block when no Case matches the current Switch value.
 *
 * @param props
 */
export const Default: React.SFC = props => {
  return <>{props.children}</>;
};

export const isTypeDefault = (element: React.ReactNode): boolean => !!element && (element as React.ReactElement).type === Default;
