"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRandomCode;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useRandomCode() {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "string";

  const [code, setCode] = _react.default.useState(length ? length : 5);

  const generated = {
    numeric: "0123456789",
    text: "abcdefghijklmnopqrstuvwxyz"
  };

  if (typeof type === 'number') {
    for (var i = 0; i < textLength; i++) {
      setCode(code += generated.numeric.charAt(Math.floor(Math.random() * generated.numeric.length)));
    }
  }

  if (typeof type === "string") {
    setCode(code += generated.text.charAt(Math.floor(Math.random() * generated.text.length)));
  }

  return code;
}