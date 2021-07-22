"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.text = text;
exports.numeric = numeric;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generated = {
  numeric: "0123456789",
  text: "abcdefghijklmnopqrstuvwxyz1234567890"
};
let result = "";

function numeric(_ref) {
  let {
    length
  } = _ref;

  for (let i = 0; i < length; i++) {
    result += generated.numeric.charAt(Math.floor(Math.random() * generated.numeric.length));
  }

  return result;
}

function text(_ref2) {
  let {
    length,
    capital
  } = _ref2;

  for (let i = 0; i < length; i++) {
    result += generated.text.charAt(Math.floor(Math.random() * generated.text.length));
  }

  return capital ? result.toUpperCase() : result.toLocaleLowerCase();
}