import { InputDiv } from './classes/InputDiv.js';

let d = new Date(),
	year = d.getFullYear(),
	month = d.getMonth() + 1,
	day = d.getDate(),
	daysInMonth = new Date(year, month, 0).getDate();
const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
	weekDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
	resetButton = document.getElementById('reset-button'),
	span1 = document.getElementById('span1');

const inputDivsData = {
	availableSum:
	{
		id: 'available-sum',
		title: 'La somme d\'argent utilisable pour le mois en cours',
		labelTxt: 'Fonds disponibles',
		min: '',
		max: '',
		val: ''
	},
	currentDay:
	{
		id: 'current-day',
		title: 'Le numéro de ce jour dans le mois',
		labelTxt: 'Date du jour',
		min: 1,
		max: 31,
		val: day
	},
	monthLength:
	{
		id: 'month-length',
		title: 'Le nombre de jours ce mois-ci',
		labelTxt: 'Longueur du mois',
		min: 28,
		max: 31,
		val: daysInMonth
	},
	nextIncome:
	{
		id: 'next-income',
		title: 'Le numéro du jour de la rentrée d\'argent du mois prochain',
		labelTxt: 'Date du prochain revenu',
		min: 1,
		max: 31,
		val: 5
	}
}

Object.values(inputDivsData).forEach(data => {
	let inputDiv = new InputDiv(...Object.values(data));
	document.getElementById('the_inputs').appendChild(inputDiv);
})

let defaultValues = [];
Object.values(inputDivsData).filter(data => defaultValues.push(data.val));

const availableSumInput = document.getElementById('available-sum'),
	currentDayInput = document.getElementById('current-day'),
	monthLengthInput = document.getElementById('month-length'),
	nextIncomeInput = document.getElementById('next-income'),
	inputs = document.getElementsByTagName('input');

// ===== ===== //

let fullDate = `${weekDays[d.getDay() - 1]} ${day} ${months[d.getMonth()]} ${year}`;
document.getElementById('display-date').innerText = fullDate;

// ===== ===== //

function getValue(elem) { // monthLengthInput.value causait des erreurs sans cette conversion.
	return (elem.value != '') ? Number(elem.value) : elem.value;
}

function calculateBudget() {
	if (Object.values(inputs).every(input => input.value != '')) {
		let denominator = getValue(monthLengthInput) - getValue(currentDayInput) + (getValue(nextIncomeInput) - 1) + 1,
			dailyBudget = getValue(availableSumInput) / denominator;
		span1.innerText = (isNaN(dailyBudget) || !isFinite(dailyBudget)) ? 'N.D.' : dailyBudget.toFixed(2);
	} else {
		span1.innerText = '';
	}
}

Object.values(inputs).forEach(input => {
	input.addEventListener('keyup', calculateBudget);
})

// ===== ===== //

function checkDefaultValues() {
	return defaultValues.every((val, i) => val == getValue(inputs[i]));
}

function reset() {
	span1.innerText = '';

	let isDefaultValues = checkDefaultValues(); /* Cette valeur doit être vérifiée en dehors de la boucle. */
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
		select = document.getElementById('themes'),
		setProperties = (elem, props) => {
			for (let key in props) {
				elem.style.setProperty(key, props[key]);
			}
		}

	select.addEventListener('change', function () {
		if (this.value == 'light') {
			setProperties(root, {
				'--borderColor1': 'blue',
				'--borderColor2': 'ghostwhite',
				'--borderColor-buttonHover': 'blue',
				'--bgColor': '#fff',
				'--bgColor-button': 'blue',
				'--bgColor-buttonHover': 'ghostwhite',
				'--textColor': 'blue',
				'--textColor-budget': 'red'
			})
		} else {
			root.removeAttribute('style');
		}
	})
}

changeTheme();