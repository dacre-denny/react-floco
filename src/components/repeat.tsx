import * as React from "react";
import { TypedFunction, isFunction } from "../helpers";

type RepeatProps<T> = {
  times: number;
  children?: TypedFunction<{ key: number } & T, React.ReactElement>;
} & T;

const isNumber = (value: unknown): boolean => {
  return Number.isNaN(Number.parseInt(`${value}`)) === false;
};

/**
 * Repeats rendering of inner content by number specified on times prop.
 *
 * @param props
 */
export class Repeat<T extends object> extends React.Component<RepeatProps<T>> {
  public constructor(props: RepeatProps<T>) {
    super(props);
    this.renderIteration = this.renderIteration.bind(this);
  }

  public componentDidMount(): void {
    this.onProcessProps(this.props);
  }

  public componentDidUpdate(): void {
    this.onProcessProps(this.props);
  }

  public render(): JSX.Element | null {
    if (!isFunction(this.props.children)) {
      return null;
    }

    if (!isNumber(this.props.times)) {
      return null;
    }

    if (this.props.times < 0) {
      return null;
    }

    return <>{Array.from({ length: this.props.times }, this.renderIteration)}</>;
  }

  private renderIteration(_: unknown, key: number): JSX.Element | null {
    return this.props.children({ key, ...this.props });
  }

  private onProcessProps(props: RepeatProps<T>): void {
    if (!isNumber(props.times)) {
      console.warn(`Repeat: times prop must be valid number`);
    } else if (props.times < 0) {
      console.warn(`Repeat: times prop must non-negative`);
    }

    if (!isFunction(props.children)) {
      console.warn(`Repeat: children prop must be valid function`);
    }
  }
}
