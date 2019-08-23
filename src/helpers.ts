export type SwitchValue = object | string | number;

export const isFunction = (value: unknown): boolean => typeof value === "function";
