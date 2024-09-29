const generated = {
  numeric: "0123456789",
  text: "abcdefghijklmnopqrstuvwxyz1234567890",
};

// Define interfaces for the function arguments
interface LengthArg {
  length: number;
}

interface TextArg extends LengthArg {
  capital?: boolean;
}

function numeric({ length }: LengthArg): string {
  let result = "";  // Reset result on each function call
  for (let i = 0; i < length; i++) {
    result += generated.numeric.charAt(
      Math.floor(Math.random() * generated.numeric.length)
    );
  }
  return result;
}

function text({ length, capital = false }: TextArg): string {
  let result = "";  // Reset result on each function call
  for (let i = 0; i < length; i++) {
    result += generated.text.charAt(
      Math.floor(Math.random() * generated.text.length)
    );
  }
  return capital ? result.toUpperCase() : result.toLowerCase();
}

export { text, numeric };
