"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MatchCase = function (element, value) { return element.type === exports.Case && element.props.for === value; };
var MatchDefault = function (element) { return element.type === exports.Default; };
exports.Switch = function (props) {
    var defaultChild = null;
    if (props.children) {
        var children = (Array.isArray(props.children) ? props.children : [props.children]);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (MatchCase(child, props.value)) {
                return React.createElement(React.Fragment, null, child);
            }
            else if (MatchDefault(child)) {
                if (!defaultChild) {
                    defaultChild = React.createElement(React.Fragment, null, child.props.children);
                }
                else {
                    console.warn("Multiple Default child encountered in Switch. Only one Default should exist per Switch");
                }
            }
            else {
                console.warn("Invalid child encountered in Switch. Only Case or Default should be used as children for Switch");
            }
        }
    }
    return React.createElement(React.Fragment, null, defaultChild);
};
exports.Case = function (props) {
    return React.createElement(React.Fragment, null, props.children);
};
exports.Default = function (props) {
    return React.createElement(React.Fragment, null, props.children);
};
