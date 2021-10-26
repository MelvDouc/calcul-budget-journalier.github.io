export default class CalcForm extends HTMLElement {
    formGroups = {
        funds: {
            labelText: "Fonds disponibles",
            extraAttributes: {
                min: 0
            }
        },
        monthDay: {
            labelText: "Date du jour",
            extraAttributes: {
                min: 1,
                max: 31
            }
        },
        monthLength: {
            labelText: "Nombre de jours dans le mois",
            extraAttributes: {
                min: 29,
                max: 31
            }
        },
        nextIncomeDay: {
            labelText: "Jour du prochain revenu",
            extraAttributes: {
                min: 1,
                max: 31
            }
        }
    };
    constructor() {
        super();
        Object.entries(this.formGroups).forEach(([inputId, { labelText, extraAttributes }]) => {
            const JSON_string = JSON.stringify(extraAttributes).replaceAll(`"`, `'`);
            const element = `
      <form-group
        data-input-id="${inputId}"
        data-label-text="${labelText}"
        data-extra-attrs="${JSON_string}"
      ></form-group>
      `;
            this.insertAdjacentHTML("beforeend", element);
        });
    }
}
