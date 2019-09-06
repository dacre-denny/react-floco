import * as React from "react";

/**
 * Encloses content that is rendered while an asynchronous function is being resolved.
 *
 * @param props
 */
export class Loading extends React.Component {
  public render(): JSX.Element | null {
    return <>{this.props.children}</>;
  }
}
