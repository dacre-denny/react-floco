export type SwitchValue = object | string | number | boolean;

export const isFunction = (value: unknown): boolean => typeof value === "function";
