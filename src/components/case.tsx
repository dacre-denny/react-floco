import * as React from "react";
import { SwitchValue } from "../helpers";

export type CaseProps = { for: SwitchValue };

/**
 * Encloses content that is rendered in a Switch block when no Case matches the current Switch value.
 *
 * @param props
 */
export const Case: React.SFC<CaseProps> = props => {
  return <>{props.children}</>;
};
