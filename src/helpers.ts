export type FunctionOrValue<T> = T | (() => T);

export type SwitchValue = object | string | number | boolean | null;

export const isFunction = (value: unknown): boolean => typeof value === "function";

export const isNumber = (value: unknown): boolean => Number.isNaN(Number.parseInt(`${value}`)) === false;

export const extractValue = <T extends any>(value: FunctionOrValue<T>): SwitchValue => {
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
