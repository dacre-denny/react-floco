import * as React from "react";

/**
 * Encloses content that is rendered when the condition prop of the parent If
 * component is not satisfied.
 *
 * @param props
 */
export const Else: React.SFC = props => {
  return <>{props.children}</>;
};
