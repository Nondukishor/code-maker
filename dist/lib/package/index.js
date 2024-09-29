"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = text;
exports.numeric = numeric;
const generated = {
    numeric: "0123456789",
    text: "abcdefghijklmnopqrstuvwxyz1234567890",
};
function numeric({ length }) {
    let result = ""; // Reset result on each function call
    for (let i = 0; i < length; i++) {
        result += generated.numeric.charAt(Math.floor(Math.random() * generated.numeric.length));
    }
    return result;
}
function text({ length, capital = false }) {
    let result = ""; // Reset result on each function call
    for (let i = 0; i < length; i++) {
        result += generated.text.charAt(Math.floor(Math.random() * generated.text.length));
    }
    return capital ? result.toUpperCase() : result.toLowerCase();
}
