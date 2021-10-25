import budgetService from "../services/budget.service.js";
export default class ResetButton extends HTMLButtonElement {
    resetEvent;
    budgetService;
    constructor() {
        super();
        this.budgetService = budgetService;
        this.resetEvent = new CustomEvent(this.budgetService.EVENT_NAMES.RESET_INPUTS);
    }
    connectedCallback() {
        this.addEventListener("click", () => {
            this.budgetService.dispatch(this.resetEvent);
        });
    }
}
