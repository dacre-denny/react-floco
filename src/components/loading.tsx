import * as React from "react";

/**
 * Encloses content that is rendered while an asynchronous function is being resolved.
 *
 * @param props
 */
export const Loading: React.SFC = props => {
  return <>{props.children}</>;
};
