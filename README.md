#Documentation
installation

***With NPM***

```
npm i random-code-getter
```

***With YEARN***

```
yarn add random-code-getter
```


## Example

```
import generator from 'random-code-getter'

generator.setConfig({
    expireIn: 5000,
    timeBased: true
})

// Generate a numeric string of length 6
const numericValue = generator.numeric({ length: 6 });
console.log(`Generated Numeric: ${numericValue}`);  // e.g., "123456"

// Generate a text string of length 8 (lowercase by default)
const textValue = generator.text({ length: 8 });
console.log(`Generated Text: ${textValue}`);  // e.g., "abcd1234"

// Generate a capitalized text string
const capitalizedTextValue = generator.text({ length: 8, capital: true });
console.log(`Generated Capitalized Text: ${capitalizedTextValue}`);  // e.g., "ABCD1234"
 ```
 




