import * as React from "react";
import { Props, isFunction } from "../helpers";

type RepeatProps = Props & { times: number };
type RenderFunction = (arg: number) => React.ReactElement;

export const Repeat = (props: RepeatProps) => {
  if (props.children) {
    const times = Math.max(0, props.times);

    if (!Number.isNaN(times)) {
      return (
        <>
          {Array(times)
            .fill(null)
            .map((_, key) => (
              <div key={key}>{isFunction(props.children) ? (props.children as RenderFunction)(key) : props.children}</div>
            ))}
        </>
      );
    }
  }

  return null;
};
