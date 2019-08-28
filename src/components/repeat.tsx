import * as React from "react";
import { isNumber } from "../helpers";

type RenderFunction<T> = (props: { key: number } & T) => React.ReactElement;
type RepeatProps<T> = { times: number; children: RenderFunction<T> } & T;

/**
 * Repeats rendering of inner content by number specified on times prop.
 *
 * @param props
 */
export const Repeat = <T extends object>(props: RepeatProps<T>): React.ReactElement | null => {
  const { times, children } = props;

  if (!isNumber(times)) {
    console.warn(`Repeat: times prop must be valid number`);
    return null;
  }

  if (times < 0) {
    console.warn(`Repeat: times prop must non-negative`);
    return null;
  }

  return <>{Array.from({ length: times }, (_: unknown, key: number) => children({ key, ...props }))}</>;
};
