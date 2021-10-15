export type TypedFunction<A, R> = (arg: A) => R;

export type FunctionOrValue<T> = T | (() => T);

export type TypedValue = object | string | number | boolean | null;

/**
 * Returns true if type of value is function
 *
 * @param value
 */
export const isFunction = (value: unknown): boolean => {
  return typeof value === "function";
};

/**
 * Extracts the value of the supplied value by invoking the value if it is a function. If not
 * a function, the value is returned
 *
 * @param value
 */
export const extractValue = <T extends TypedValue>(value: FunctionOrValue<T>): TypedValue => {
  return isFunction(value) ? (value as (() => T))() : value;
};

/**
 * Returns true if specified objects match type of specified node. Returns false in all other
 * cases
 *
 * @param types
 */
export const isType = (...types: React.JSXElementConstructor<unknown>[]): TypedFunction<React.ReactNode, boolean> => {
  return (node: React.ReactNode): boolean => {
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
};
