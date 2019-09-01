import * as React from "react";
import { Default, isTypeDefault } from "./default";
import { Case, isTypeCaseMatch } from "./case";
import { SwitchValue, isFunction } from "../helpers";

type ValueOrPromise<T> = () => T | Promise<T>;
type SwitchProps = { value: SwitchValue | ValueOrPromise<SwitchValue> };

const isType = (node: React.ReactNode, ...types: any): boolean => {
  const element = node as React.ReactElement;

  for (const type of types) {
    if (type === element.type) {
      return true;
    }
  }

  return false;
};

const isTypeSupported = (element: React.ReactNode): boolean => !!element && ((element as React.ReactElement).type === Default || (element as React.ReactElement).type === Case);

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
  const present = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (isFunction(props.value)) {
      const value = (props.value as ValueOrPromise<SwitchValue>)();
      if (value instanceof Promise) {
        (value as Promise<SwitchValue>).then(
          c => {
            if (present.current) {
              setValue(c);
            }
          },
          () => {
            if (present.current) {
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
      present.current = false;
    };
  }, [value]);

  if (Array.isArray(children)) {
    if (!children.every(isTypeSupported)) {
      console.warn(`Switch: only Case or Default children are supported`);
    }

    const cases = children.filter(isTypeCaseMatch(switchValue!));
    if (cases.length) {
      return <>{cases}</>;
    }

    const defaults = children.filter(isTypeDefault);
    if (defaults.length > 0) {
      return <>{defaults}</>;
    }
  }

  if (children) {
    if (!isTypeSupported(children)) {
      console.warn(`Switch: only Case or Default children are supported`);
    }

    if (isTypeCaseMatch(switchValue!)(children)) {
      return <>{children}</>;
    }

    if (isTypeDefault(children)) {
      return <>{children}</>;
    }
  }

  return null;
};
