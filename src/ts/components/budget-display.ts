import budgetService, { BudgetService } from "../services/budget.service.js";

export default class BudgetDisplay extends HTMLSpanElement {
  private budgetService: BudgetService;

  constructor() {
    super();
    this.budgetService = budgetService;
  }

  private connectedCallback(): void {
    this.budgetService.subscribe(
      this.budgetService.EVENT_NAMES.NEW_BUDGET,
      this.updateBudget.bind(this)
    );
    this.budgetService.subscribe(
      this.budgetService.EVENT_NAMES.RESET_INPUTS,
      this.updateBudget.bind(this)
    );
  }

  private setValue(value: number | string): void {
    const isNumber = typeof value === "number";
    this.textContent = (isNumber) ? value.toFixed(2) : value;
  }

  private updateBudget(e: any): void {
    if (!e || !("detail" in e) || typeof e.detail !== "function")
      return this.setValue("");

    const detail = e.detail();
    if (detail === null)
      return;
    this.setValue(detail);
  }
}