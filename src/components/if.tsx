import * as React from "react";
import { extractValue, FunctionOrValue, isType, TypedValue, TypedFunction } from "../helpers";
import { Else } from "./else";
import { Loading } from "./loading";

type IfProps = { condition: FunctionOrValue<Promise<TypedValue>> | FunctionOrValue<TypedValue> };
type IfState = { loading: boolean; condition?: TypedValue };

const isTypeLoading = isType(Loading);
const isTypeElse = isType(Else);
const isTypeNotElseNotLoading = (element: React.ReactNode): boolean => !isType(Else, Loading)(element);

/**
 * If component provides conditional rendering of inner content when condition prop:
 * - is an expression that evaluates to true
 * - is a function that returns true when invoked
 *
 * If this component has Else child components, the content of these children will be
 * rendered if the condition prop is not satisfied.
 *
 * @param props
 */
export class If extends React.Component<IfProps, IfState> {
  private pendingPromise?: Promise<TypedValue>;

  constructor(props: IfProps) {
    super(props);

    this.pendingPromise = undefined;
    this.state = {
      condition: undefined,
      loading: false
    };
  }

  private onConditionResolved(promise: Promise<TypedValue>): TypedFunction<Promise<TypedValue>, unknown> {
    return (condition: TypedValue): void => {
      if (this.pendingPromise === promise) {
        // If value prop reference intact, update state from async completion
        this.setState({ condition, loading: false });
      }
    };
  }

  private onConditionRejected(promise: Promise<TypedValue>): TypedFunction<Promise<TypedValue>, unknown> {
    return (): void => {
      if (this.pendingPromise === promise) {
        // If value prop reference intact and error occurred, update error state
        this.setState({ condition: undefined, loading: false });
      }
    };
  }

  private onConditionChange(): void {
    if (this.props.condition === undefined) {
      console.warn(`If: condition prop must not be undefined`);
    }

    const condition = extractValue(this.props.condition);

    if (condition instanceof Promise) {
      const promise = condition as Promise<TypedValue>;

      // Update pending promise as current promise instance
      this.pendingPromise = promise;
      this.setState({ loading: true });

      promise.then(this.onConditionResolved(promise), this.onConditionRejected(promise));
    } else {
      // If value is non-promise, clear the pending promise flag blocking and previously
      // pending promise from updating state
      this.pendingPromise = undefined;
      this.setState({ condition, loading: false });
    }
  }

  public componentDidMount(): void {
    this.onConditionChange();
  }

  public componentDidUpdate(prevProps: IfProps): void {
    if (this.props.condition !== prevProps.condition) {
      this.onConditionChange();
    }
  }

  public render(): JSX.Element | null {
    const childrenArray = Array.isArray(this.props.children) ? this.props.children : [this.props.children];

    if (this.state.loading) {
      return <>{childrenArray.filter(isTypeLoading)}</>;
    } else if (this.state.condition) {
      return <>{childrenArray.filter(isTypeNotElseNotLoading)}</>;
    } else {
      return <>{childrenArray.filter(isTypeElse)}</>;
    }
  }
}
