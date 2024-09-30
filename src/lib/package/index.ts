
import Config from '../types/config';
import LengthArg from '../types/lengthArgs'
import TextArg from '../types/textArgs'

class Generator {
  constructor(){
    let i =0
    setInterval(()=>{
      this.store.forEach((value, key)=>{
        i++
        const exp = this.isExpired(this.store.get(key)) 
        console.log({value, key, i, exp})
        if(exp) {
          console.log("expired deleting code")
          this.store.delete(this.store.get(key))
        }
      })
    }, 1000)
  }
  private _generated = {
    numeric: "0123456789",
    text: "abcdefghijklmnopqrstuvwxyz1234567890",
  };
  private _configuration: Config = {}
  public store = new Map();

  public setConfig(config: Config) {
    if (config.timeBased) {
      Object.assign(this._configuration, {timeBased: config.timeBased})
    }
    if (config.expireIn) {
      Object.assign(this._configuration, {expireIn: config.expireIn})

    }
  }

  public get config(): Config {
    return {
      timeBased: this._configuration.timeBased,
      expireIn: this._configuration.expireIn
    };
  }

  private isExpired(code: string) {
    if (this.config.timeBased && this._configuration.expireIn) {
      return Date.now() > this.store.get(code);
    }
    return false
  }
  
  public verify(code: string){
    if(this.isExpired(code)) return false
    return true
  }

  // Method to generate a numeric string
  public numeric({ length }: LengthArg): string {
    try {
      let result = "";  // Reset result on each method call
      for (let i = 0; i < length; i++) {
        result += this._generated.numeric.charAt(
          Math.floor(Math.random() * this._generated.numeric.length)
        );
      }
      this.store.set(result, this._configuration.expireIn)
      return result;
    } catch (error) {
      return `Error: ${(error as Error).message}`;
    }

  }

  // Method to generate a text string with optional capitalization
  public text({ length, capital }: TextArg): string {
    try {
      let result = "";  // Reset result on each method call
      for (let i = 0; i < length; i++) {
        result += this._generated.text?.charAt(
          Math.floor(Math.random() * this._generated.text.length)
        );
      }
      this.store.set(result, this._configuration.expireIn)
      return capital ? result.toUpperCase() : result.toLowerCase();
    } catch (error) {
      return `Error : ${(error as Error).message}`;
    }
  }
}

const generator = new Generator();

export default generator;

