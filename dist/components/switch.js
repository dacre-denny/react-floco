"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var default_1 = require("./default");
var case_1 = require("./case");
var isTypeSupported = function (element) { return !!element && (element.type === default_1.Default || element.type === case_1.Case); };
/**
 * Switch component provides conditional rendering of inner content for Case blocks that
 * match on the specified value prop.
 *
 * If a strict match occurs between the Switch value and one or more Case children, then
 * the inner content of those Case components is rendered.
 *
 * If no matching case is found, and Default children are present in the Switch block, the
 * contents of those components is rendered.
 *
 * @param props
 */
exports.Switch = function (props) {
    var children = props.children, value = props.value;
    if (Array.isArray(children)) {
        if (!children.some(isTypeSupported)) {
            console.warn("Switch: only Case or Default children are supported");
        }
        var matchedCases = children.filter(case_1.isTypeCaseMatch(value));
        if (matchedCases.length > 0) {
            return React.createElement(React.Fragment, null, matchedCases);
        }
        var defaults = children.filter(default_1.isTypeDefault);
        if (defaults.length > 0) {
            return React.createElement(React.Fragment, null, defaults);
        }
    }
    else if (children) {
        if (!isTypeSupported(children)) {
            console.warn("Switch: only Case or Default children are supported");
        }
        if (case_1.isTypeCaseMatch(value)(children) || default_1.isTypeDefault(children)) {
            return React.createElement(React.Fragment, null, children);
        }
    }
    return null;
};
