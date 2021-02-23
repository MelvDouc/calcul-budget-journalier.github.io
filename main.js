const inputFonds = document.querySelector('#fonds'),
inputDateJour =  document.querySelector('#dateJour'),
inputLgMois = document.querySelector('#longueurMois'),
inputRevenuSuivant = document.querySelector('#jourRevenuSuivant'),
inputs = document.querySelectorAll('.inputs'),
span1 = document.querySelector('#span1');
let d = new Date(),
annee = d.getFullYear(),
mois = d.getMonth() + 1,
jour = d.getDate(),
nombreJoursDansMois = new Date(annee, mois, 0).getDate();

//

inputDateJour.value = jour;
inputLgMois.value = nombreJoursDansMois;
document.querySelector('#div-date').innerText = d.toLocaleDateString();

//

function entierVal(elem) { // inputLgMois.value causait des erreurs sans cette conversion.
	return parseFloat(elem.value);
}

function calculerBudget() {
	if(inputFonds.value != '' && inputDateJour.value != '' && inputLgMois.value != '' && inputRevenuSuivant.value != '') {
		let budgetJournalier
		= entierVal(inputFonds) / (1 + entierVal(inputLgMois) - entierVal(inputDateJour) + (entierVal(inputRevenuSuivant) - 1));
		span1.innerText = budgetJournalier.toFixed(2);
	} else {
		span1.innerText = null;
	}
}

Object.values(inputs).forEach(input => {
	input.addEventListener('keyup', calculerBudget);
})

//

function reinitialiser() {
	span1.innerText = null;

	if(inputFonds.value != '' || entierVal(inputDateJour) != jour || entierVal(inputLgMois) != nombreJoursDansMois || entierVal(inputRevenuSuivant) != 5) {
		inputDateJour.value = jour;
		inputLgMois.value = nombreJoursDansMois;
		inputRevenuSuivant.value = 5;
	} else {
		inputDateJour.value = null;
		inputLgMois.value = null;
		inputRevenuSuivant.value = null;
	}

	inputFonds.value = null;	
}

document.querySelector('#btn-reset').addEventListener('click', reinitialiser);