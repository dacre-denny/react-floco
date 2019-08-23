import * as React from "react";
import { isFunction } from "../helpers";

type RenderFunction<T> = (props: { key: number } & T) => React.ReactElement;
type RepeatProps<T> = { times: number; children: RenderFunction<T> } & T;

export const Repeat = <T extends object>(props: RepeatProps<T>) => {
  if (isFunction(props.children)) {
    const times = Math.max(0, props.times);
    const render = props.children as RenderFunction<T>;

    if (!Number.isNaN(times)) {
      return (
        <>
          {Array(times)
            .fill(null)
            .map((_, key) => render({ key, ...props }))}
        </>
      );
    }
  }

  return null;
};
