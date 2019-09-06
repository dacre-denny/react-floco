import * as React from "react";
import { TypedValue } from "../helpers";

export type CaseProps = { for: TypedValue };

/**
 * Encloses content that is rendered in a Switch block when no Case matches the current Switch value.
 *
 * @param props
 */
export class Case extends React.Component<CaseProps> {
    public render(): JSX.Element | null {
        return <>{this.props.children}</>;
    }
}
