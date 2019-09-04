import * as React from "react";
import { Default } from "./default";
import { isFunction, SwitchValue } from "../helpers";
import { Loading } from "./loading";
import { Case, CaseProps } from "./case";

type FunctionOrValue<T> = T | (() => T);
type SwitchProps = { value: FunctionOrValue<Promise<SwitchValue>> | FunctionOrValue<SwitchValue> };
type SwitchState = { loading: boolean; value?: SwitchValue };

const isType = (...types: any) => (node: React.ReactNode): boolean => {
  const element = node as React.ReactElement;

  if (!element) {
    return false;
  }

  for (const type of types) {
    if (type === element.type) {
      return true;
    }
  }

  return false;
};

const isTypeCaseMatch = (value?: SwitchValue) => (node: React.ReactNode): boolean => {
  if (value !== undefined && isType(Case)(node)) {
    if ((node as React.ReactElement<CaseProps>).props.for === value) {
      return true;
    }
  }

  return false;
};

const isTypeSupported = isType(Default, Case, Loading);

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
  asyncValueProp: any;

  constructor(props: SwitchProps) {
    super(props);

    this.state = {
      loading: false,
      value: undefined
    };
  }

  private extractValue(): SwitchValue {
    if (isFunction(this.props.value)) {
      return (this.props.value as Function)();
    } else {
      return this.props.value;
    }
  }

  private processValueProp(): void {
    const value = this.extractValue();

    if (value instanceof Promise) {
      if (this.asyncValueProp && this.asyncValueProp.prop === this.props.value) {
        return;
      }

      this.asyncValueProp = { prop: this.props.value, promise: value };
      console.log("updated this.asyncValueProp: ", this.props.value);

      this.setState({ loading: true });

      (value as Promise<SwitchValue>).then(
        resolvedValue => {
          if (this.asyncValueProp && this.asyncValueProp.promise === value) {
            console.log("update state: ", resolvedValue);
            // If value prop reference intact, update state from async completion
            this.setState({ value: resolvedValue, loading: false });
          }
        },
        () => {
          if (this.asyncValueProp && this.asyncValueProp.promise === value) {
            // If value prop reference intact and error occurred, update error state
            this.setState({ value: undefined, loading: false });
          }
        }
      );
    } else {
      this.setState({ value: value, loading: false });
    }
  }

  componentDidMount(): void {
    this.processValueProp();
  }

  componentDidUpdate(prevProps: SwitchProps): void {
    if (this.props.value !== prevProps.value) {
      this.processValueProp();
    }
  }

  render(): JSX.Element | null {
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
}
