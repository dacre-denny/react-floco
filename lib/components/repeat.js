"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var helpers_1 = require("../helpers");
exports.Repeat = function (props) {
    var times = Math.max(0, props.times);
    if (Number.isNaN(times)) {
        return null;
    }
    else {
        return (React.createElement(React.Fragment, null, Array(times)
            .fill(null)
            .map(function (_, key) {
            return React.createElement("div", { key: key },
                " ",
                helpers_1.isFunction(props.children) ? props.children(key) : props.children,
                " ");
        })));
    }
};
