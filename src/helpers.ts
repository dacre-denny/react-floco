export type SwitchValue = object | string | number | boolean | null;

export const isFunction = (value: unknown): boolean => typeof value === "function";

export const isNumber = (value: unknown): boolean => Number.isNaN(Number.parseInt(`${value}`)) === false;
