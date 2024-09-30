"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../lib/index"));
index_1.default.setConfig({
    expireIn: 5000,
    timeBased: true
});
// Generate a numeric string of length 6
const numericValue = index_1.default.numeric({ length: 6 });
console.log(`Generated Numeric: ${numericValue}`); // e.g., "123456"
// Generate a text string of length 8 (lowercase by default)
const textValue = index_1.default.text({ length: 8 });
console.log(`Generated Text: ${textValue}`); // e.g., "abcd1234"
// Generate a capitalized text string
const capitalizedTextValue = index_1.default.text({ length: 8, capital: true });
console.log(`Generated Capitalized Text: ${capitalizedTextValue}`); // e.g., "ABCD1234"
