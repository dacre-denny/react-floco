"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * Repeats rendering of inner content by number specified on times prop.
 *
 * @param props
 */
exports.Repeat = function (props) {
    var times = props.times, children = props.children;
    if (times < 0) {
        console.warn("Repeat: times prop must non-negative");
        return null;
    }
    return React.createElement(React.Fragment, null, Array.from({ length: times }, function (_, key) { return children(__assign({ key: key }, props)); }));
};
