export type TypedFunction<A, R> = (arg: A) => R;

export type FunctionOrValue<T> = T | (() => T);

export type TypedValue = object | string | number | boolean | null;

export const isFunction = (value: unknown): boolean => {
  return typeof value === "function";
};

export const isNumber = (value: unknown): boolean => {
  return Number.isNaN(Number.parseInt(`${value}`)) === false;
};

export const extractValue = <T extends TypedValue>(value: FunctionOrValue<T>): TypedValue => {
  return isFunction(value) ? (value as Function)() : value;
};

export const isType = (...types: any) => (node: React.ReactNode): boolean => {
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
