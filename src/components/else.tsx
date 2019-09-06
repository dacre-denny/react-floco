import * as React from "react";

/**
 * Encloses content that is rendered when the condition prop of the parent If
 * component is not satisfied.
 *
 * @param props
 */
export class Else extends React.Component {
    render(): JSX.Element | null {
        return <>{this.props.children}</>;
    }
}
