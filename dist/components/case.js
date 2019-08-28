"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * Encloses content that is rendered in a Switch block when no Case matches the current Switch value.
 *
 * @param props
 */
exports.Case = function (props) {
    return React.createElement(React.Fragment, null, props.children);
};
exports.isTypeCaseMatch = function (value) { return function (element) {
    return !!element && element.type === exports.Case && element.props.for === value;
}; };
