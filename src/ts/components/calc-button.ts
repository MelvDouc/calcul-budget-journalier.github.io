import budgetService, { BudgetService } from "../services/budget.service.js";

export default class ResetButton extends HTMLElement {
  private resetEvent: CustomEvent;
  private budgetService: BudgetService;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.budgetService = budgetService;
    this.resetEvent = new CustomEvent(this.budgetService.EVENT_NAMES.RESET_INPUTS);
    this.button = document.createElement("button");
    this.button.textContent = "Réinitialiser";
    this.append(this.button);
  }

  private connectedCallback(): void {
    this.button.addEventListener("click", () => {
      this.budgetService.dispatch(this.resetEvent);
    });
  }
}