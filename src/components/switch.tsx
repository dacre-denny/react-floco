import * as React from "react";
import { extractValue, FunctionOrValue, isType, TypedValue, TypedFunction } from "../helpers";
import { Case, CaseProps } from "./case";
import { Default } from "./default";
import { Loading } from "./loading";

interface SwitchProps {
  value: FunctionOrValue<Promise<TypedValue>> | FunctionOrValue<TypedValue>;
}
interface SwitchState {
  loading: boolean;
  value?: TypedValue;
}

const isTypeCase = isType(Case);
const isTypeSupported = isType(Default, Case, Loading);

/**
 * Helper function returns true if value matches the for prop of supplied Case node. In
 * all other cases false is returned.
 *
 * @param value
 */
const isTypeCaseMatch = (value?: TypedValue) => (node: React.ReactNode): boolean => {
  if (value !== undefined && isTypeCase(node)) {
    const element = node as React.ReactElement<CaseProps>;

    return element.props.for === value;
  }

  return false;
};

/**
 * Switch component provides conditional rendering of inner content for Case blocks that
 * match on the specified value prop.
 *
 * If a strict match occurs between the Switch value and one or more Case children, then
 * the inner content of those Case components is rendered.
 *
 * If no matching case is found, and Default children are present in the Switch block, the
 * contents of those components is rendered.
 *
 * @param props
 */
export class Switch extends React.Component<SwitchProps, SwitchState> {
  private pendingPromise?: Promise<TypedValue>;

  public constructor(props: SwitchProps) {
    super(props);

    this.pendingPromise = undefined;
    this.state = {
      loading: false,
      value: undefined
    };
  }

  public componentDidMount(): void {
    this.onValueChange();
  }

  public componentDidUpdate(prevProps: SwitchProps): void {
    if (this.props.value !== prevProps.value) {
      this.onValueChange();
    }
  }

  public render(): JSX.Element | null {
    if (!this.props.children) {
      return null;
    }

    const childrenArray = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    if (!childrenArray.every(isTypeSupported)) {
      console.warn(`Switch: only Case or Default children are supported`);
    }

    if (this.state.loading) {
      return <>{childrenArray.filter(isType(Loading))}</>;
    }

    const cases = childrenArray.filter(isTypeCaseMatch(this.state.value));
    if (cases.length) {
      return <>{cases}</>;
    }

    const defaults = childrenArray.filter(isType(Default));
    if (defaults.length) {
      return <>{defaults}</>;
    }

    return null;
  }

  private onValueResolved(promise: Promise<TypedValue>): TypedFunction<Promise<TypedValue>, unknown> {
    return (value: TypedValue): void => {
      if (this.pendingPromise === promise) {
        // If value prop reference intact, update state from async completion
        this.setState({ value, loading: false });
      }
    };
  }

  private onValueRejected(promise: Promise<TypedValue>): TypedFunction<Promise<TypedValue>, unknown> {
    return (): void => {
      if (this.pendingPromise === promise) {
        // If value prop reference intact and error occurred, update error state
        this.setState({ value: undefined, loading: false });
      }
    };
  }

  private onValueChange(): void {
    if (this.props.value === undefined) {
      console.warn(`Switch: value prop must not be undefined`);
    }

    const value = extractValue(this.props.value);

    if (value instanceof Promise) {
      const promise = value as Promise<TypedValue>;

      // Update pending promise as current promise instance
      this.pendingPromise = promise;
      this.setState({ loading: true });

      promise.then(this.onValueResolved(promise), this.onValueRejected(promise));
    } else {
      // If value is non-promise, clear the pending promise flag blocking and previously
      // pending promise from updating state
      this.pendingPromise = undefined;
      this.setState({ value, loading: false });
    }
  }
}
