"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var helpers_1 = require("../helpers");
exports.If = function (props) {
    if (helpers_1.isFunction(props.condition) === true || props.condition === true) {
        return React.createElement(React.Fragment, null, props.children);
    }
    else {
        return null;
    }
};
