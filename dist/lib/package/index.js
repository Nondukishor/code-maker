"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Generator {
    constructor() {
        this.MAX_TIMEOUT = 2147483647; // 32-bit signed integer max timeout (~24.85 days)
        this._generated = {
            numeric: "0123456789",
            text: "abcdefghijklmnopqrstuvwxyz1234567890",
        };
        this._configuration = {};
        this.store = new Map(); // Map to store expiration times for each code
        this.startExpirationCheck();
    }
    // Method to configure expiration and time-based settings
    setConfig(config) {
        if (config.timeBased !== undefined) {
            this._configuration.timeBased = config.timeBased;
        }
        if (config.expireIn !== undefined) {
            this._configuration.expireIn = config.expireIn;
        }
    }
    // Getter for the configuration object
    get config() {
        return Object.assign({}, this._configuration);
    }
    // Private method to check if a code is expired
    isExpired(code) {
        const expirationTime = this.store.get(code);
        return this.config.timeBased && expirationTime ? Date.now() > expirationTime : false;
    }
    // Public method to verify if a code is still valid
    verify(code) {
        if (!this.store.has(code)) {
            return false;
        }
        return !this.isExpired(code);
    }
    // Method to periodically check for expired codes
    startExpirationCheck() {
        setInterval(() => {
            this.store.forEach((expirationTime, code) => {
                if (this.isExpired(code)) {
                    console.log(`Code ${code} has expired and will be removed.`);
                    this.store.delete(code);
                }
            });
        }, 1000); // Check expiration every second
    }
    // Method to schedule the expiration of a code
    scheduleExpiration(code, expirationInMs) {
        if (expirationInMs > this.MAX_TIMEOUT) {
            setTimeout(() => {
                this.scheduleExpiration(code, expirationInMs - this.MAX_TIMEOUT); // Continue reducing the timeout
            }, this.MAX_TIMEOUT);
        }
        else {
            setTimeout(() => {
                if (this.isExpired(code)) {
                    console.log(`Code ${code} has expired and is being deleted.`);
                    this.store.delete(code);
                }
            }, expirationInMs);
        }
    }
    // Method to generate a numeric string of specified length
    numeric({ length }) {
        if (!length || length <= 0) {
            throw new Error("Length must be a positive number.");
        }
        let result = "";
        for (let i = 0; i < length; i++) {
            result += this._generated.numeric.charAt(Math.floor(Math.random() * this._generated.numeric.length));
        }
        const expirationTime = Date.now() + (this._configuration.expireIn || 0);
        this.store.set(result, expirationTime);
        if (this.config.timeBased && this._configuration.expireIn) {
            this.scheduleExpiration(result, this._configuration.expireIn);
        }
        return result;
    }
    // Method to generate a text string with optional capitalization
    text({ length, capital }) {
        if (!length || length <= 0) {
            throw new Error("Length must be a positive number.");
        }
        let result = "";
        for (let i = 0; i < length; i++) {
            result += this._generated.text.charAt(Math.floor(Math.random() * this._generated.text.length));
        }
        const expirationTime = Date.now() + (this._configuration.expireIn || 0);
        this.store.set(result, expirationTime);
        if (this.config.timeBased && this._configuration.expireIn) {
            this.scheduleExpiration(result, this._configuration.expireIn);
        }
        return capital ? result.toUpperCase() : result.toLowerCase();
    }
}
const generator = new Generator();
exports.default = generator;
