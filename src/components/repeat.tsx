import * as React from "react";

type RenderFunction<T> = (props: { key: number } & T) => React.ReactElement;
type RepeatProps<T> = { times: number; children: RenderFunction<T> } & T;

export const Repeat = <T extends object>(props: RepeatProps<T>) => {
  if (props.times < 0) {
    console.warn(`Repeat: times prop must non-negative`);
    return null;
  }

  const renderChild = (_: unknown, key: number) => props.children({ key, ...props });

  return (
    <>
      {Array(props.times)
        .fill(null)
        .map(renderChild)}
    </>
  );
};
