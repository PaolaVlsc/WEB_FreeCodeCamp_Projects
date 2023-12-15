/*
Telephone Number Validator
Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number. 
The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. 
Your job is to validate or reject the US phone number based on any combination of the formats provided above. 
The area code is required. If the country code is provided, you must confirm that the country code is 1. 
Return true if the string is a valid US phone number; otherwise return false.
*/

function telephoneCheck(str) {
  // Check if the string has only non-alphabetic characters
  if (/^[^a-zA-Z]+$/.test(str)) {
    // Check the count of numbers in the string
    const numericCharacters = str.match(/[0-9]/g);

    // Check if there are exactly 10 or 11 numeric characters
    if (
      numericCharacters &&
      (numericCharacters.length === 10 || numericCharacters.length === 11)
    ) {
      // Check for valid formats
      return /^(1\s?)?(\(\d{3}\)|\d{3})([-\s]?)(\d{3})([-\s]?)(\d{4})$/.test(
        str
      );
    }
  }

  return false;
}

// Example usage
console.log(telephoneCheck("555-555-5555")); // Output: true
console.log(telephoneCheck("(555)555-5555")); // Output: true
console.log(telephoneCheck("1 555 555 5555")); // Output: true
console.log(telephoneCheck("800-692-7753")); // Output: true
console.log(telephoneCheck("8oo-six427676;laskdjf")); // Output: false

// 2nd solution

// function telephoneCheck(str) {
//   // Use a simplified regular expression to match valid phone number formats
//   const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?(\d{3})[-\s]?(\d{4})$/;

//   // Test the string against the regular expression
//   return regex.test(str);
// }

// // Example usage
// console.log(telephoneCheck("555-555-5555")); // Output: true
// console.log(telephoneCheck("(555)555-5555")); // Output: true
// console.log(telephoneCheck("1 555 555 5555")); // Output: true
// console.log(telephoneCheck("800-692-7753")); // Output: true
// console.log(telephoneCheck("8oo-six427676;laskdjf")); // Output: false
