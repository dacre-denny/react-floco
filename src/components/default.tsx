import * as React from "react";

/**
 * Encloses content that is rendered in a Switch block when no Case matches the current Switch value.
 *
 * @param props
 */
export class Default extends React.Component {
  render(): JSX.Element | null {
    return <>{this.props.children}</>;
  }
}
