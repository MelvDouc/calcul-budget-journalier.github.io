import dateService from "./date.service.js";
import EventBus from "./event-bus.service.js";
export class BudgetService {
    EVENT_NAMES = {
        NEW_BUDGET: "new-budget",
        RESET_INPUTS: "reset-inputs"
    };
    info;
    dateService;
    eventBus;
    budgetEvent;
    constructor() {
        this.eventBus = new EventBus();
        this.budgetEvent = new CustomEvent(this.EVENT_NAMES.NEW_BUDGET, {
            detail: () => this.getBudget()
        });
        this.dateService = dateService;
        this.info = this.DEFAULT_INFO;
    }
    get DEFAULT_INFO() {
        return {
            funds: null,
            monthDay: dateService.getMonthDay(),
            monthLength: dateService.getMonthLength(),
            nextIncomeDay: null
        };
    }
    setInfoValue(key, value) {
        this.info[key] = value;
        this.dispatch(this.budgetEvent);
    }
    isInfoSet() {
        const values = this.info ?? this.DEFAULT_INFO;
        return Object.values(values).every(value => value !== null && value >= 0);
    }
    getBudget() {
        if (!this.isInfoSet())
            return null;
        const { funds, monthDay, monthLength, nextIncomeDay } = this.info;
        const isValidMonthDay = this.dateService.isValidMonthDay(monthDay);
        const isValidMonthLength = this.dateService.isValidMonthLength(monthLength);
        const isValidNextIncomeDay = this.dateService.isValidMonthDay(nextIncomeDay);
        if (funds === null || !isValidMonthDay || !isValidMonthLength || !isValidNextIncomeDay)
            return null;
        const budget = funds / (monthLength - monthDay + nextIncomeDay);
        if (!isFinite(budget) || isNaN(budget))
            return null;
        return budget;
    }
    subscribe(type, listener) {
        this.eventBus.addEventListener(type, listener);
    }
    dispatch(event) {
        this.eventBus.dispatchEvent(event);
    }
}
const budgetService = new BudgetService();
export default budgetService;
