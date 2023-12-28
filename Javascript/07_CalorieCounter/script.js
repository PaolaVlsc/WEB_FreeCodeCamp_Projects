// elements
const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

// variables
let isError = false;

// Function to clean input string
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

// Function to check for invalid input
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// Function to add an entry dynamically
const addEntry = () => {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" />`;

  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
};

// Function to clear the form
function clearForm() {
  document.querySelectorAll(".input-container").forEach((inputContainer) => {
    inputContainer.innerHTML = "";
  });

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

// Event listeners
clearButton.addEventListener("click", clearForm);
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);

// Function to calculate calories
function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const mealTypes = ["breakfast", "lunch", "dinner", "snacks", "exercise"];
  let consumedCalories = 0;

  mealTypes.forEach((type) => {
    const mealNumberInputs = document.querySelectorAll(
      `#${type} input[type=number]`
    );
    const mealCalories = getCaloriesFromInputs(mealNumberInputs);

    if (type !== "exercise") {
      consumedCalories += mealCalories;
    } else {
      consumedCalories -= mealCalories; // Subtract exercise calories
    }
  });

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const remainingCalories = budgetCalories - consumedCalories;
  const surplusOrDeficit = remainingCalories >= 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${-consumedCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}

// Function to calculate calories from input list
function getCaloriesFromInputs(list) {
  let calories = 0;

  list.forEach((input) => {
    const currVal = cleanInputString(input.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      // Show error message in the UI instead of using alert
      output.innerHTML = `<p class="error-message">Invalid Input: ${invalidInputMatch[0]}</p>`;
      isError = true;
      return;
    }

    calories += Number(currVal);
  });

  return calories;
}
