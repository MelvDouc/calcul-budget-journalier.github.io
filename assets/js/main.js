import InputDiv from "./classes/InputDiv.js";
import changeTheme from "./theme.js";

// ===== ===== ===== ===== =====
// Data
// ===== ===== ===== ===== =====

const date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth() + 1,
  daysInMonth = new Date(year, month, 0).getDate();
const resetButton = document.getElementById("reset-button"),
  budgetSpan = document.getElementById("budget-span");
const themeSelect = document.getElementById("themes");
const inputDivsData = {
  availableSum: {
    id: "available-sum",
    title: "La somme d'argent utilisable pour le mois en cours",
    labelText: "Fonds disponibles",
    min: "",
    max: "",
    val: "",
  },
  currentDay: {
    id: "current-day",
    title: "Le numéro de ce jour dans le mois",
    labelText: "Date du jour",
    min: 1,
    max: 31,
    val: date.getDate(),
  },
  monthLength: {
    id: "month-length",
    title: "Le nombre de jours ce mois-ci",
    labelText: "Longueur du mois",
    min: 28,
    max: 31,
    val: daysInMonth,
  },
  nextIncome: {
    id: "next-income",
    title: "Le numéro du jour de la rentrée d'argent du mois prochain",
    labelText: "Date du prochain revenu",
    min: 1,
    max: 31,
    val: "",
  },
};
const defaultValues = Object.values(inputDivsData).map((data) => data.val);

// ===== ===== ===== ===== =====
// Generate Content
// ===== ===== ===== ===== =====

function setDate(containerID) {
  const todayDate = new Intl.DateTimeFormat("fr-Fr", { dateStyle: "full" }).format(date);
  document.getElementById(containerID).innerText = todayDate;
}

function addFormGroups(dataObject, containerID) {
  Object.values(dataObject).forEach((data) => {
    const inputDiv = new InputDiv(...Object.values(data));
    document.getElementById(containerID).appendChild(inputDiv);
  });
}

function generateContent() {
  setDate("display-date");
  addFormGroups(inputDivsData, "the_inputs");
  // Color Theme
  Object.values(themeSelect.children).forEach(option => {
    option.addEventListener("click", changeTheme);
  });
}

generateContent();

// ===== ===== ===== ===== =====
// Calculate Budget
// ===== ===== ===== ===== =====

const input_availableSum = document.getElementById("available-sum"),
  input_currentDay = document.getElementById("current-day"),
  input_monthLength = document.getElementById("month-length"),
  input_nextIncome = document.getElementById("next-income"),
  inputs = document.getElementsByTagName("input");

function calculateBudget() {
  const is_emptyInputs = Object.values(inputs).some(
    (input) => input.value == ""
  );
  if (is_emptyInputs) {
    budgetSpan.innerText = "";
    return;
  }
  const denominator =
    input_monthLength.value -
    input_currentDay.value +
    (input_nextIncome.value - 1) +
    1;
  const dailyBudget = input_availableSum.value / denominator;
  budgetSpan.innerText =
    isNaN(dailyBudget) || !isFinite(dailyBudget)
      ? "N.D."
      : dailyBudget.toFixed(2);
}

Object.values(inputs).forEach((input) =>
  input.addEventListener("keyup", calculateBudget)
);

// ===== ===== ===== ===== =====
// Reset Default Values
// ===== ===== ===== ===== =====

function checkDefaultValues() {
  return defaultValues.every((val, i) => val == inputs[i].value);
}

function reset() {
  budgetSpan.innerText = "";

  const isDefaultValues = checkDefaultValues(); // Value must be checked before running the loop.
  Object.values(inputs).forEach(
    (input, i) => (input.value = !isDefaultValues ? defaultValues[i] : "")
  );
}

function setResetButtonTitle() {
  resetButton.title = checkDefaultValues()
    ? "Tout effacer"
    : "Restaurer les valeurs par défaut";
}

resetButton.addEventListener("click", reset);
resetButton.addEventListener("mouseover", setResetButtonTitle);