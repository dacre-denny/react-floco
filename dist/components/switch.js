"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MatchCase = function (element, value) { return element.type === exports.Case && element.props.for === value; };
var MatchDefault = function (element) { return element.type === exports.Default; };
exports.Switch = function (props) {
    if (props.children) {
        var children = (Array.isArray(props.children) ? props.children : [props.children]);
        if (children.some(function (child) { return child.type !== exports.Default && child.type !== exports.Case; })) {
            console.warn("Switch: unexpected child type. Switch only supports child components that are Case or Default");
        }
        var cases = children.filter(function (child) { return MatchCase(child, props.value); });
        if (cases.length > 0) {
            return React.createElement(React.Fragment, null, cases);
        }
        return React.createElement(React.Fragment, null, children.filter(MatchDefault));
    }
    return null;
};
exports.Case = function (props) {
    return React.createElement(React.Fragment, null, props.children);
};
exports.Default = function (props) {
    return React.createElement(React.Fragment, null, props.children);
};
