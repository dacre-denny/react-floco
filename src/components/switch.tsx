import * as React from "react";
import { Default, isTypeDefault } from "./default";
import { Case, isTypeCaseMatch } from "./case";
import { SwitchValue, isFunction } from "../helpers";
import { Loading } from "./loading";

type ValueOrPromise<T> = () => T | Promise<T>;
type SwitchProps = { value: SwitchValue | ValueOrPromise<SwitchValue> };

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

const isTypeSupported = isType(Default, Case, Loading);

const isInvalid = (value: SwitchValue) => value === null || value === undefined;

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
  const { children, value } = props;

  const [switchValue, setValue] = React.useState<SwitchValue>();
  const present = React.useRef<any>();

  React.useEffect(() => {
    present.current = value;
    if (isFunction(props.value)) {
      const result = (props.value as ValueOrPromise<SwitchValue>)();
      if (result instanceof Promise) {
        setValue(undefined);
        (result as Promise<SwitchValue>).then(
          (c: SwitchValue) => {
            if (present.current === value) {
              setValue(c);
            }
          },
          () => {
            if (present.current === value) {
              setValue(false);
            }
          }
        );
      } else {
        setValue(value);
      }
    } else {
      setValue(value);
    }

    return () => {
      present.current = null;
    };
  }, [value]);

  if (Array.isArray(children)) {
    if (!children.every(isTypeSupported)) {
      console.warn(`Switch: only Case or Default children are supported`);
    }

    if (switchValue === undefined) {
      return <>{children.filter(isType(Loading))}</>;
    }

    const cases = children.filter(isTypeCaseMatch(switchValue!));
    if (cases.length) {
      return <>{cases}</>;
    }

    const defaults = children.filter(child => isTypeDefault(child) || isInvalid(value));
    if (defaults.length) {
      return <>{defaults}</>;
    }
  } else if (children) {
    if (!isTypeSupported(children)) {
      console.warn(`Switch: only Case or Default children are supported`);
    }

    if (isTypeCaseMatch(switchValue!)(children)) {
      return <>{children}</>;
    }

    if (isTypeDefault(children) || isInvalid(value)) {
      return <>{children}</>;
    }
  }

  return null;
};
