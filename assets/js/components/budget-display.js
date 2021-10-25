import budgetService from "../services/budget.service.js";
export default class BudgetDisplay extends HTMLSpanElement {
    budgetService;
    constructor() {
        super();
        this.budgetService = budgetService;
    }
    connectedCallback() {
        this.budgetService.subscribe(this.budgetService.EVENT_NAMES.NEW_BUDGET, this.updateBudget.bind(this));
        this.budgetService.subscribe(this.budgetService.EVENT_NAMES.RESET_INPUTS, this.updateBudget.bind(this));
    }
    setValue(value) {
        const isNumber = typeof value === "number";
        this.textContent = (isNumber) ? value.toFixed(2) : value;
    }
    updateBudget(e) {
        if (!e || !("detail" in e) || typeof e.detail !== "function")
            return this.setValue("");
        const detail = e.detail();
        if (detail === null)
            return;
        this.setValue(detail);
    }
}
