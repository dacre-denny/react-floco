import * as React from "react";
import { Default } from "./default";
import { Case, CaseProps } from "./case";
import { SwitchValue, isFunction } from "../helpers";
import { Loading } from "./loading";

type ValueOrPromise<T> = () => T | Promise<T>;
type SwitchProps = { value: SwitchValue | ValueOrPromise<SwitchValue> };
type SwitchData = { state: State; value?: SwitchValue };

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

enum State {
  Ready = 1,
  Loading = 2,
  Error = 3
}

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
export const Switch = (props: React.PropsWithChildren<SwitchProps>): React.ReactElement | null => {
  const valueRef = React.useRef<SwitchValue>();
  const [data, setData] = React.useState<SwitchData>({
    value: undefined,
    state: State.Ready
  });

  const evaluateValue = async (value: SwitchValue) => {
    if (isFunction(value)) {
      const result = (value as Function)();
      if (result instanceof Promise) {
        // Only set loading state for promises
        setData(state => ({ ...state, state: State.Loading }));

        await result;
      }

      return result;
    } else {
      return value;
    }
  };

  const onValueChanged = async () => {
    try {
      // Value prop reference used determine if prop still same after async evaluation
      valueRef.current = props.value;

      const result = await evaluateValue(props.value);

      if (valueRef.current === props.value) {
        // If value prop reference intact, update state from async completion
        setData(state => ({ ...state, value: result, state: State.Ready }));
      }
    } catch {
      if (valueRef.current === props.value) {
        // If value prop reference intact and error occurred, update error state
        setData(state => ({ ...state, state: State.Error }));
      }
    }
  };

  React.useEffect(() => {
    onValueChanged();

    return () => {
      // When value changes, reset state to ready for next async/sync/value prop
      setData(state => ({ ...state, state: State.Ready }));
    };
  }, [props.value]);

  const childrenArray = Array.isArray(props.children) ? props.children : [props.children];

  if (!childrenArray.every(isTypeSupported)) {
    console.warn(`Switch: only Case or Default children are supported`);
  }

  if (data.state === State.Loading) {
    return <>{childrenArray.filter(isType(Loading))}</>;
  }

  const cases = childrenArray.filter(isTypeCaseMatch(data.value));
  if (cases.length) {
    return <>{cases}</>;
  }

  const defaults = childrenArray.filter(isType(Default));
  if (defaults.length) {
    return <>{defaults}</>;
  }

  return null;
};
