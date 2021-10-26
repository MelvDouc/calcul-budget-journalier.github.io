import budgetService from "../services/budget.service.js";
export default class ResetButton extends HTMLElement {
    resetEvent;
    budgetService;
    button;
    constructor() {
        super();
        this.budgetService = budgetService;
        this.resetEvent = new CustomEvent(this.budgetService.EVENT_NAMES.RESET_INPUTS);
        this.button = document.createElement("button");
        this.button.textContent = "Réinitialiser";
        this.append(this.button);
    }
    connectedCallback() {
        this.button.addEventListener("click", () => {
            this.budgetService.dispatch(this.resetEvent);
        });
    }
}
