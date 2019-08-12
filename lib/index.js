define("components/default", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Default = function (props) {
        return React.createElement(React.Fragment, null, props.value);
    };
});
define("helpers", ["require", "exports"], function (require, exports) {
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
});
define("components/case", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Case = function (props) {
        return React.createElement(React.Fragment, null, props.children);
    };
});
define("components/switch", ["require", "exports", "react", "components/default", "components/case", "helpers"], function (require, exports, React, default_1, case_1, helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("components/if", ["require", "exports", "react", "helpers"], function (require, exports, React, helpers_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.If = function (props) {
        if (helpers_2.isFunction(props.condition) === true || props.condition === true) {
            return React.createElement(React.Fragment, null, props.children);
        }
        else {
            return null;
        }
    };
});
define("components/repeat", ["require", "exports", "react", "helpers"], function (require, exports, React, helpers_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                    helpers_3.isFunction(props.children) ? props.children(key) : props.children,
                    " ");
            })));
        }
    };
});
define("index", ["require", "exports", "components/default", "components/switch", "components/case", "components/if", "components/repeat"], function (require, exports, default_2, switch_1, case_2, if_1, repeat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    module.exports = { Default: default_2.Default, Switch: switch_1.Switch, Case: case_2.Case, If: if_1.If, Repeat: repeat_1.Repeat };
});
