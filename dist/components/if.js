"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var else_1 = require("./else");
var helpers_1 = require("../helpers");
var conditionMet = function (condition) { return (helpers_1.isFunction(condition) ? condition() : condition) === true; };
var isTypeElse = function (element) { return !!element && element.type === else_1.Else; };
var isTypeNotElse = function (element) { return !!element && element.type !== else_1.Else; };
/**
 * If component provides conditional rendering of inner content when condition prop:
 * - is an expression that evaluates to true
 * - is a function that returns true when invoked
 *
 * If this component has Else child components, the content of these children will be
 * rendered if the condition prop is not satisfied.
 *
 * @param props
 */
exports.If = function (props) {
    var children = props.children, condition = props.condition;
    if (Array.isArray(children)) {
        if (conditionMet(condition)) {
            return React.createElement(React.Fragment, null, children.filter(isTypeNotElse));
        }
        else {
            return React.createElement(React.Fragment, null, children.filter(isTypeElse));
        }
    }
    if (children) {
        if (conditionMet(condition) && isTypeNotElse(children)) {
            return React.createElement(React.Fragment, null, children);
        }
        if (isTypeElse(children)) {
            return React.createElement(React.Fragment, null, children);
        }
    }
    return null;
};
