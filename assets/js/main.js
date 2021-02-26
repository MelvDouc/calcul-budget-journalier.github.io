let d = new Date(),
	year = d.getFullYear(),
	month = d.getMonth() + 1,
	day = d.getDate(),
	monthLength = new Date(year, month, 0).getDate();
const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
	weekDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const availableSumInput = document.querySelector('#available-sum'),
	currentDayInput = document.querySelector('#current-day'),
	monthLengthInput = document.querySelector('#month-length'),
	nextIncomeInput = document.querySelector('#next-income'),
	inputs = document.querySelectorAll('input'),
	resetButton = document.querySelector('#reset-button'),
	span1 = document.querySelector('#span1'),
	defaultValues = ['', day, monthLength, 5];

//

currentDayInput.value = day;
monthLengthInput.value = monthLength;
let fullDate = `${weekDays[d.getDay() - 1]} ${day} ${months[d.getMonth()]} ${year}`;
document.querySelector('#display-date').innerText = fullDate;

//

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

//

function checkDefaultValues() {
	return defaultValues.every((val, i) => val == getValue(inputs[i]));
}

function reset() {
	span1.innerText = '';

	let isDefaultValues = checkDefaultValues(); /* Cette valeur doit être vérifiée en dehors de la boucle. */
	for (input of inputs) {
		input.value = (!isDefaultValues) ? defaultValues[Object.values(inputs).indexOf(input)] : '';
	}
}

function setResetButtonTitle() {
	resetButton.title = (checkDefaultValues()) ? 'Tout effacer' : 'Restaurer les valeurs par défaut';
}

resetButton.addEventListener('click', reset);
resetButton.addEventListener('mouseover', setResetButtonTitle);

//

function changeTheme() {
	let root = document.querySelector(':root'),
		select = document.querySelector('select#themes'),
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

//