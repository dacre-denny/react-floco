"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var helpers_1 = require("../helpers");
var MatchElse = function (element) { return element.type === exports.Else; };
exports.If = function (props) {
    if (props.children) {
        var children = (Array.isArray(props.children) ? props.children : [props.children]);
        if ((helpers_1.isFunction(props.condition) && props.condition()) || props.condition === true) {
            return React.createElement(React.Fragment, null, children.filter(function (child) { return !MatchElse(child); }));
        }
        else {
            return React.createElement(React.Fragment, null, children.filter(MatchElse));
        }
    }
    return null;
};
exports.Else = function (props) {
    return React.createElement(React.Fragment, null, props.children);
};
