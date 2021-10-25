import BudgetDisplay from "./components/budget-display.js";
import DateDisplay from "./components/date-display.js";
import FormGroup from "./components/form-group.js";
import ResetButton from "./components/reset-button.js";
import ThemeSelector from "./components/theme-selector.js";

customElements.define("form-group", FormGroup);
customElements.define("budget-display", BudgetDisplay, { extends: "span" });
customElements.define("reset-button", ResetButton, { extends: "button" });
customElements.define("date-display", DateDisplay);
customElements.define("theme-selector", ThemeSelector);