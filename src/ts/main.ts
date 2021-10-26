import BudgetDisplay from "./components/budget-display.js";
import CalcForm from "./components/calc-form.js";
import DateDisplay from "./components/date-display.js";
import FormGroup from "./components/form-group.js";
import CalcButton from "./components/calc-button.js";
import ThemeSelector from "./components/theme-selector.js";

customElements.define("date-display", DateDisplay);
customElements.define("form-group", FormGroup);
customElements.define("calc-form", CalcForm);
customElements.define("calc-button", CalcButton);
customElements.define("budget-display", BudgetDisplay, { extends: "span" });
customElements.define("theme-selector", ThemeSelector, { extends: "select" });