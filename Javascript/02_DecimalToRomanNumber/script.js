function convertToRoman(num) {
  if (num <= 0 || num >= 4000) {
    return "Number out of range (1-3999)";
  }

  const romanNumerals = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };

  let result = "";
  /*


Yes, the order of iteration over object properties in JavaScript is not guaranteed to be in any specific order. 
While most modern JavaScript engines follow the order in which properties were added to the object, 
it's not a standard behavior according to the ECMAScript specification. 
The ECMAScript specification does not mandate a specific order for object properties during iteration.

If you need a specific order when iterating over object properties, 
you should consider using an array of keys or sorting the keys before iterating, 
as shown in the example with `Object.keys(romanNumerals).sort((a, b) => b - a)` in the previous response. 
This way, you have control over the order in which the keys are processed.

  */
  const sortedKeys = Object.keys(romanNumerals).sort((a, b) => b - a);

  for (const key of sortedKeys) {
    console.log(key);
    while (num >= key) {
      result += romanNumerals[key];
      num -= key;
    }
  }

  return result;
}

// Example usage:
const numberToConvert = 3549;
const romanNumeral = convertToRoman(numberToConvert);
console.log(`${numberToConvert} in Roman numerals is: ${romanNumeral}`);

/********************** ALTERNATIVE ***********************/
// const romanNumerals = {
//   M: 1000,
//   CM: 900,
//   D: 500,
//   CD: 400,
//   C: 100,
//   XC: 90,
//   L: 50,
//   XL: 40,
//   X: 10,
//   IX: 9,
//   V: 5,
//   IV: 4,
//   I: 1,
// };

// for (const key in romanNumerals) {
//   while (num >= romanNumerals[key]) {
//     result += key;
//     num -= romanNumerals[key];
//   }
// }
