"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var default_1 = require("./default");
var case_1 = require("./case");
var helpers_1 = require("../helpers");
exports.Switch = function (props) {
    var caseChild = helpers_1.findChild(props, function (child) { return child.type === case_1.Case && child.props.value === props.value; });
    if (caseChild) {
        return React.createElement(React.Fragment, null, caseChild);
    }
    var defaultChild = helpers_1.findChild(props, function (child) { return child.type === default_1.Default; });
    if (defaultChild) {
        return React.createElement(React.Fragment, null, defaultChild.props.children);
    }
    return null;
};
