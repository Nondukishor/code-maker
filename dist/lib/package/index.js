"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Generator {
    constructor() {
        this._generated = {
            numeric: "0123456789",
            text: "abcdefghijklmnopqrstuvwxyz1234567890",
        };
        this._configuration = {};
        this.store = new Map();
        let i = 0;
        setInterval(() => {
            this.store.forEach((value, key) => {
                i++;
                const exp = this.isExpired(this.store.get(key));
                console.log({ value, key, i, exp });
                if (exp) {
                    console.log("expired deleting code");
                    this.store.delete(this.store.get(key));
                }
            });
        }, 1000);
    }
    setConfig(config) {
        if (config.timeBased) {
            Object.assign(this._configuration, { timeBased: config.timeBased });
        }
        if (config.expireIn) {
            Object.assign(this._configuration, { expireIn: config.expireIn });
        }
    }
    get config() {
        return {
            timeBased: this._configuration.timeBased,
            expireIn: this._configuration.expireIn
        };
    }
    isExpired(code) {
        if (this.config.timeBased && this._configuration.expireIn) {
            return Date.now() > this.store.get(code);
        }
        return false;
    }
    verify(code) {
        if (this.isExpired(code))
            return false;
        return true;
    }
    // Method to generate a numeric string
    numeric({ length }) {
        try {
            let result = ""; // Reset result on each method call
            for (let i = 0; i < length; i++) {
                result += this._generated.numeric.charAt(Math.floor(Math.random() * this._generated.numeric.length));
            }
            this.store.set(result, this._configuration.expireIn);
            return result;
        }
        catch (error) {
            return `Error: ${error.message}`;
        }
    }
    // Method to generate a text string with optional capitalization
    text({ length, capital }) {
        var _a;
        try {
            let result = ""; // Reset result on each method call
            for (let i = 0; i < length; i++) {
                result += (_a = this._generated.text) === null || _a === void 0 ? void 0 : _a.charAt(Math.floor(Math.random() * this._generated.text.length));
            }
            this.store.set(result, this._configuration.expireIn);
            return capital ? result.toUpperCase() : result.toLowerCase();
        }
        catch (error) {
            return `Error : ${error.message}`;
        }
    }
}
const generator = new Generator();
exports.default = generator;
