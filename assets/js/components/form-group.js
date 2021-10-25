import budgetService from "../services/budget.service.js";
export default class FormGroup extends HTMLElement {
    budgetService;
    constructor() {
        super();
        this.budgetService = budgetService;
        this.innerHTML = `
    <label for=${this.inputId}>${this.labelText}</label>
    <input type="number" id=${this.inputId} />
    `;
        this.setExtraAttributes();
    }
    connectedCallback() {
        this.setDefaultValue(null);
        this.inputElement.addEventListener("keyup", this.handleKeyup.bind(this));
        this.budgetService.subscribe(this.budgetService.EVENT_NAMES.RESET_INPUTS, this.setDefaultValue.bind(this));
    }
    get inputElement() {
        const element = this.querySelector("input");
        // Bogus error to appease the TypeScript compiler.
        if (!element)
            throw new Error();
        return element;
    }
    get labelText() {
        return this.getCustomAttribute("label-text");
    }
    get inputId() {
        return this.getCustomAttribute("input-id");
    }
    get extraAttrs() {
        const rawString = this.getCustomAttribute("extra-attrs");
        const stringifiedObject = rawString.replaceAll(`'`, `"`);
        try {
            const attributeObject = JSON.parse(stringifiedObject);
            return attributeObject;
        }
        catch (error) {
            throw new SyntaxError(`The element's data-extraAttrs attribute must be formatted as a JSON object with single quotes.`);
        }
    }
    getCustomAttribute(qualifiedName) {
        const attribute = this.getAttribute(`data-${qualifiedName}`);
        if (!attribute)
            throw new ReferenceError(`Element is missing a data-${qualifiedName} attribute`);
        return attribute;
    }
    setExtraAttributes() {
        Object.entries(this.extraAttrs).forEach(([key, value]) => {
            this.inputElement.setAttribute(key, value);
        });
    }
    handleKeyup() {
        this.budgetService.setInfoValue(this.inputId, this.getValue());
    }
    getValue() {
        const value = parseFloat(this.inputElement.value);
        return (isNaN(value)) ? null : value;
    }
    setDefaultValue(e) {
        // `e: any` needed for budgetService.subscribe()
        const defaultValue = this.budgetService.DEFAULT_INFO[this.inputId];
        const output = (defaultValue === null) ? "" : defaultValue.toString();
        this.inputElement.value = output;
        this.budgetService.setInfoValue(this.inputId, defaultValue);
    }
}
