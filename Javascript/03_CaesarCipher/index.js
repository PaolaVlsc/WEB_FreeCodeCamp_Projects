function rot13(str) {
  const alphabetWithNumbers = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };

  const copyString = [...str];
  let decodedString = "";

  for (let i = 0; i < copyString.length; i++) {
    if (copyString[i].match(/[A-Z]/)) {
      // Find the number associated with the letter
      const letterNumber = alphabetWithNumbers[copyString[i]];

      // Rotate by 13 places
      let decodedNumber = ((letterNumber + 12) % 26) + 1;

      // Find the corresponding letter
      let decodedLetter = Object.keys(alphabetWithNumbers).find(
        (key) => alphabetWithNumbers[key] === decodedNumber
      );

      decodedString += decodedLetter;
    } else {
      // Non-alphabetic character, pass it on unchanged
      decodedString += copyString[i];
    }
  }

  return decodedString;
}

console.log(rot13("SERR PBQR PNZC")); // Output: "FREE CODE CAMP"

// 2nd solution

// function rot13(str) {
//     const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const copyString = [...str];
//     let decodedString = "";

//     for (let i = 0; i < copyString.length; i++) {
//       if (copyString[i].match(/[A-Z]/)) {
//         const index = alphabet.indexOf(copyString[i]);
//         const decodedIndex = (index + 13) % 26;
//         decodedString += alphabet[decodedIndex];
//       } else {
//         decodedString += copyString[i];
//       }
//     }

//     return decodedString;
//   }

//   console.log(rot13("SERR PBQR PNZC")); // Output: "FREE CODE CAMP"

// 3rd solution

// var alphabet = [
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z",
//   " ",
//   "-",
//   "_",
//   ".",
//   "&",
//   "?",
//   "!",
//   "@",
//   "#",
//   "/",
// ];
// var ceasarsAlphabet = [
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z",
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   " ",
//   "-",
//   "_",
//   ".",
//   "&",
//   "?",
//   "!",
//   "@",
//   "#",
//   "/",
// ];
// function rot13(str) {
//   return str
//     .split("")
//     .map((char) => {
//       const index = alphabet.indexOf(char);
//       return index !== -1 ? ceasarsAlphabet[index] : char;
//     })
//     .join("");
// }
