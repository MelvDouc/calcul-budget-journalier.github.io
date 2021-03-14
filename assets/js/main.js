import { InputDiv } from './classes/InputDiv.js';

let d = new Date(),
	year = d.getFullYear(),
	month = d.getMonth() + 1,
	day = d.getDate(),
	daysInMonth = new Date(year, month, 0).getDate();
const resetButton = document.getElementById('reset-button'),
	budgetSpan = document.getElementById('budget-span'),
	themeSelect = document.getElementById('themes');

const inputDivsData = {
	availableSum:
	{
		id: 'available-sum',
		title: 'La somme d\'argent utilisable pour le mois en cours',
		labelText: 'Fonds disponibles',
		min: '',
		max: '',
		val: ''
	},
	currentDay:
	{
		id: 'current-day',
		title: 'Le numéro de ce jour dans le mois',
		labelText: 'Date du jour',
		min: 1,
		max: 31,
		val: day
	},
	monthLength:
	{
		id: 'month-length',
		title: 'Le nombre de jours ce mois-ci',
		labelText: 'Longueur du mois',
		min: 28,
		max: 31,
		val: daysInMonth
	},
	nextIncome:
	{
		id: 'next-income',
		title: 'Le numéro du jour de la rentrée d\'argent du mois prochain',
		labelText: 'Date du prochain revenu',
		min: 1,
		max: 31,
		val: ''
	}
}

Object.values(inputDivsData).forEach(data => {
	let inputDiv = new InputDiv(...Object.values(data));
	document.getElementById('the_inputs').appendChild(inputDiv);
})

let defaultValues = Object.values(inputDivsData).map(data => data.val);

// ===== ===== //

const availableSumInput = document.getElementById('available-sum'),
	currentDayInput = document.getElementById('current-day'),
	monthLengthInput = document.getElementById('month-length'),
	nextIncomeInput = document.getElementById('next-income'),
	inputs = document.getElementsByTagName('input');

// ===== ===== //

function displayFullDate() {
	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return new Intl.DateTimeFormat('fr-Fr', options).format(new Date());
}

document.getElementById('display-date').innerText = displayFullDate();

// ===== ===== //

function getValue(elem) { // monthLengthInput.value causait des erreurs sans cette conversion.
	return (elem.value != '') ? Number(elem.value) : elem.value;
}

function calculateBudget() {
	if (Object.values(inputs).every(input => input.value != '')) {
		let denominator = getValue(monthLengthInput) - getValue(currentDayInput) + (getValue(nextIncomeInput) - 1) + 1,
			dailyBudget = getValue(availableSumInput) / denominator;
		budgetSpan.innerText = (isNaN(dailyBudget) || !isFinite(dailyBudget)) ? 'N.D.' : dailyBudget.toFixed(2);
	} else {
		budgetSpan.innerText = '';
	}
}

Object.values(inputs).forEach(input => input.addEventListener('keyup', calculateBudget))

// ===== ===== //

function checkDefaultValues() {
	return defaultValues.every((val, i) => val == getValue(inputs[i]));
}

function reset() {
	budgetSpan.innerText = '';

	let isDefaultValues = checkDefaultValues(); // Cette valeur doit être vérifiée en dehors de la boucle.
	Object.values(inputs).forEach((input, i) => input.value = (!isDefaultValues) ? defaultValues[i] : '');
}

function setResetButtonTitle() {
	resetButton.title = (checkDefaultValues()) ? 'Tout effacer' : 'Restaurer les valeurs par défaut';
}

resetButton.addEventListener('click', reset);
resetButton.addEventListener('mouseover', setResetButtonTitle);

// ===== ===== //

function changeTheme() {
	let root = document.querySelector(':root'),
		setProperties = (elem, properties) => {
			for (let key in properties) {
				elem.style.setProperty(key, properties[key]);
			}
		}

	for (let option of themeSelect.children) {
		option.addEventListener('click', function () {
			themeSelect.insertAdjacentElement('beforeend', option);
			switch (this.id) {
				case 'light-theme':
					setProperties(root, {
						'--borderColor1': 'blue',
						'--borderColor2': 'ghostwhite',
						'--borderColor-buttonHover': 'blue',
						'--bgColor': 'rgba(255, 255, 255, .91)',
						'--bgColor-button': 'blue',
						'--bgColor-buttonHover': 'ghostwhite',
						'--textColor': 'blue',
						'--textColor-budget': 'red'
					});
					break;
				case 'dark-theme':
					root.removeAttribute('style');
					break;
			}
		});
	}
}

changeTheme();

// ===== ===== //