import budgetService, { BudgetService } from "../services/budget.service.js";

export default class ResetButton extends HTMLButtonElement {
  private resetEvent: CustomEvent;
  private budgetService: BudgetService;

  constructor() {
    super();
    this.budgetService = budgetService;
    this.resetEvent = new CustomEvent(this.budgetService.EVENT_NAMES.RESET_INPUTS);
  }

  private connectedCallback(): void {
    this.addEventListener("click", () => {
      this.budgetService.dispatch(this.resetEvent);
    });
  }
}