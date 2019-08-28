import Components from "./components";
import { SwitchProps } from "./components/switch";
import React = require("react");

type Ty = (props: React.PropsWithChildren<SwitchProps>) => React.ReactElement | null;

export const Switch: Ty = Components.Switch;
export const Case = Components.Case;
export const Default = Components.Default;
export const If = Components.If;
export const Else = Components.Else;
export const Repeat = Components.Repeat;

export default Components;
