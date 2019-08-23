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
exports.Repeat = function (props) {
    if (props.times < 0) {
        console.warn("Repeat: times prop must non-negative");
        return null;
    }
    var renderChild = function (_, key) { return props.children(__assign({ key: key }, props)); };
    return (React.createElement(React.Fragment, null, Array(props.times)
        .fill(null)
        .map(renderChild)));
};
