const generated = {
  numeric: "0123456789",
  text: "abcdefghijklmnopqrstuvwxyz1234567890",
};

let result = "";

function numeric({ length }) {
  for (let i = 0; i < length; i++) {
    result += generated.numeric.charAt(
      Math.floor(Math.random() * generated.numeric.length)
    );
  }
  return result;
}

function text({ length, capital }) {
  for (let i = 0; i < length; i++) {
    result += generated.text.charAt(
      Math.floor(Math.random() * generated.text.length)
    );
  }
  return capital ? result.toUpperCase() : result.toLocaleLowerCase();
}

export { text, numeric };
