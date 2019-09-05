import * as React from "react";
import { isNumber } from "../helpers";
import { isFunction } from "util";

type RenderFunction<T> = (props: { key: number } & T) => React.ReactElement;
type RepeatProps<T> = { times: number; children?: RenderFunction<any> } & T;

/**
 * Repeats rendering of inner content by number specified on times prop.
 *
 * @param props
 */
export class Repeat<T extends object> extends React.Component<RepeatProps<T>> {
  constructor(props: RepeatProps<T>) {
    super(props);
  }

  renderChild = (_: unknown, key: number): JSX.Element | null => {
    return this.props.children({ key, ...this.props });
  };

  onProcessProps(props: RepeatProps<T>) {
    if (!isNumber(props.times)) {
      console.warn(`Repeat: times prop must be valid number`);
    } else if (props.times < 0) {
      console.warn(`Repeat: times prop must non-negative`);
    }

    if (!isFunction(props.children)) {
      console.warn(`Repeat: children prop must be valid function`);
    }
  }

  componentDidMount(): void {
    this.onProcessProps(this.props);
  }

  componentDidUpdate(): void {
    this.onProcessProps(this.props);
  }

  render(): JSX.Element | null {
    if (!isFunction(this.props.children)) {
      return null;
    }

    if (!isNumber(this.props.times)) {
      return null;
    }

    if (this.props.times < 0) {
      return null;
    }

    return <>{Array.from({ length: this.props.times }, this.renderChild)}</>;
  }
}
