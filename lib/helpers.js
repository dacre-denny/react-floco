"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = function (value) { return typeof value === "function"; };
exports.findChild = function (props, matcher) {
    if (Array.isArray(props.children)) {
        return props.children.find(matcher);
    }
    else if (matcher(props.children)) {
        return props.children;
    }
    else {
        return null;
    }
};
