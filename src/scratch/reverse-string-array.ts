const input = [
  "p",
  "e",
  "r",
  "f",
  "e",
  "c",
  "t",
  " ",
  "m",
  "a",
  "k",
  "e",
  "s",
  " ",
  "p",
  "r",
  "a",
  "c",
  "t",
  "i",
  "c",
  "e",
];

const reverseThisStringArray = (stringArray: string[]): {
  array: string[];
  string: string;
} => {
  let result: string[] = [];
  let tempWord: string[] = [];
  for (let i = 0; i < stringArray.length; i++) {
    const char = stringArray[i];
    if (char === " ") {
      result = [char, ...tempWord, ...result];
      tempWord = [];
    } else {
      tempWord.push(char);
    }
  }
  result = [...tempWord, ...result];
  return {
    array: result,
    string: result.join(""),
  }
};

console.log(reverseThisStringArray(input).string);
