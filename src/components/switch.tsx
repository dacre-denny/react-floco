import * as React from "react";
import { extractValue, FunctionOrValue, isType, SwitchValue } from "../helpers";
import { Case, CaseProps } from "./case";
import { Default } from "./default";
import { Loading } from "./loading";

type SwitchProps = { value: FunctionOrValue<Promise<SwitchValue>> | FunctionOrValue<SwitchValue> };
type SwitchState = { loading: boolean; value?: SwitchValue };

const isTypeCase = isType(Case);
const isTypeSupported = isType(Default, Case, Loading);

const isTypeCaseMatch = (value?: SwitchValue) => (node: React.ReactNode): boolean => {
  if (value !== undefined && isTypeCase(node)) {
    if ((node as React.ReactElement<CaseProps>).props.for === value) {
      return true;
    }
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
  pendingPromise?: Promise<SwitchValue>;

  constructor(props: SwitchProps) {
    super(props);

    this.pendingPromise = undefined;
    this.state = {
      loading: false,
      value: undefined
    };
  }

  private onValueChange(): void {
    const value = extractValue(this.props.value);

    if (value instanceof Promise) {
      const promise = value as Promise<SwitchValue>;

      this.pendingPromise = promise;
      this.setState({ loading: true });

      promise.then(
        resolvedValue => {
          if (this.pendingPromise === promise) {
            // If value prop reference intact, update state from async completion
            this.setState({ value: resolvedValue, loading: false });
          }
        },
        () => {
          if (this.pendingPromise === promise) {
            // If value prop reference intact and error occurred, update error state
            this.setState({ value: undefined, loading: false });
          }
        }
      );
    } else {
      this.pendingPromise = undefined;
      this.setState({ value: value, loading: false });
    }
  }

  componentDidMount(): void {
    this.onValueChange();
  }

  componentDidUpdate(prevProps: SwitchProps): void {
    if (this.props.value !== prevProps.value) {
      this.onValueChange();
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
