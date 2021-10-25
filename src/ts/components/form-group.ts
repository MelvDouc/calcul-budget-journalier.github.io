import budgetService, { BudgetService } from "../services/budget.service.js";
import { BudgetInfoInterface } from "../types.js";

export default class FormGroup extends HTMLElement {
  private budgetService: BudgetService;

  constructor() {
    super();

    this.budgetService = budgetService;
    this.innerHTML = `
    <label for=${this.inputId}>${this.labelText}</label>
    <input type="number" id=${this.inputId} />
    `;
    this.setExtraAttributes();
  }

  private connectedCallback(): void {
    this.setDefaultValue(null);
    this.inputElement.addEventListener("keyup", this.handleKeyup.bind(this));
    this.budgetService.subscribe(
      this.budgetService.EVENT_NAMES.RESET_INPUTS,
      this.setDefaultValue.bind(this)
    );
  }

  private get inputElement(): HTMLInputElement {
    const element = this.querySelector("input");
    // Bogus error to appease the TypeScript compiler.
    if (!element) throw new Error();
    return element;
  }

  private get labelText(): string {
    return this.getCustomAttribute("label-text");
  }

  private get inputId(): keyof BudgetInfoInterface {
    return this.getCustomAttribute("input-id") as keyof BudgetInfoInterface;
  }

  private get extraAttrs(): object {
    const rawString = this.getCustomAttribute("extra-attrs");
    const stringifiedObject = rawString.replaceAll(`'`, `"`);

    try {
      const attributeObject = JSON.parse(stringifiedObject);
      return attributeObject;
    } catch (error) {
      throw new SyntaxError(`The element's data-extraAttrs attribute must be formatted as a JSON object with single quotes.`);
    }
  }

  private getCustomAttribute(qualifiedName: string): string {
    const attribute = this.getAttribute(`data-${qualifiedName}`);
    if (!attribute)
      throw new ReferenceError(`Element is missing a data-${qualifiedName} attribute`);
    return attribute;
  }

  private setExtraAttributes(): void {
    Object.entries(this.extraAttrs).forEach(([key, value]) => {
      this.inputElement.setAttribute(key, value);
    });
  }

  private handleKeyup(): void {
    this.budgetService.setInfoValue(this.inputId, this.getValue());
  }

  public getValue(): number | null {
    const value = parseFloat(this.inputElement.value);
    return (isNaN(value)) ? null : value;
  }

  private setDefaultValue(e: any): void {
    // `e: any` needed for budgetService.subscribe()
    const defaultValue = this.budgetService.DEFAULT_INFO[this.inputId];
    const output = (defaultValue === null) ? "" : defaultValue.toString();
    this.inputElement.value = output;
    this.budgetService.setInfoValue(this.inputId, defaultValue);
  }
}