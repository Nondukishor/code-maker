import Config from '../types/config';
import LengthArg from '../types/lengthArgs';
import TextArg from '../types/textArgs';

class Generator {
  private readonly MAX_TIMEOUT = 2147483647; // 32-bit signed integer max timeout (~24.85 days)
  
  private readonly _generated = {
    numeric: "0123456789",
    text: "abcdefghijklmnopqrstuvwxyz1234567890",
  };

  private _configuration: Config = {};
  public store = new Map<string, number>(); // Map to store expiration times for each code

  constructor() {
    this.startExpirationCheck();
  }

  // Method to configure expiration and time-based settings
  public setConfig(config: Config): void {
    if (config.timeBased !== undefined) {
      this._configuration.timeBased = config.timeBased;
    }
    if (config.expireIn !== undefined) {
      this._configuration.expireIn = config.expireIn;
    }
  }

  // Getter for the configuration object
  public get config(): Config {
    return { ...this._configuration };
  }

  // Private method to check if a code is expired
  private isExpired(code: string): boolean {
    const expirationTime = this.store.get(code);
    return this.config.timeBased && expirationTime ? Date.now() > expirationTime : false;
  }

  // Public method to verify if a code is still valid
  public verify(code: string): boolean {
    if (!this.store.has(code)) {
      return false;
    }
    return !this.isExpired(code);
  }

  // Method to periodically check for expired codes
  private startExpirationCheck(): void {
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
  private scheduleExpiration(code: string, expirationInMs: number): void {
    if (expirationInMs > this.MAX_TIMEOUT) {
      setTimeout(() => {
        this.scheduleExpiration(code, expirationInMs - this.MAX_TIMEOUT); // Continue reducing the timeout
      }, this.MAX_TIMEOUT);
    } else {
      setTimeout(() => {
        if (this.isExpired(code)) {
          console.log(`Code ${code} has expired and is being deleted.`);
          this.store.delete(code);
        }
      }, expirationInMs);
    }
  }

  // Method to generate a numeric string of specified length
  public numeric({ length }: LengthArg): string {
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
  public text({ length, capital }: TextArg): string {
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
export default generator;
