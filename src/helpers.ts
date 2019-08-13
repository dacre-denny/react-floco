export type ValueProp = object | string | number;

export interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export const isFunction = (value: any) => typeof value === "function";

export const findChild = <T extends any>(props: Props, matcher: (node: React.ReactElement<T>) => boolean): React.ReactElement | null => {
  if (Array.isArray(props.children)) {
    return (props.children as React.ReactElement<T>[]).find(matcher) as React.ReactElement;
  } else if (matcher(props.children as React.ReactElement<T>)) {
    return props.children as React.ReactElement;
  } else {
    return null;
  }
};
