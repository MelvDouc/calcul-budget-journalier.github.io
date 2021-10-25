import { BudgetEventNamesInterface, BudgetInfoInterface } from "../types.js";
import dateService, { DateService } from "./date.service.js";
import EventBus from "./event-bus.service.js";

export class BudgetService {
  public readonly EVENT_NAMES: BudgetEventNamesInterface = {
    NEW_BUDGET: "new-budget",
    RESET_INPUTS: "reset-inputs"
  };

  private info: BudgetInfoInterface;
  private dateService: DateService;
  private eventBus: EventBus;
  private budgetEvent: CustomEvent;

  constructor() {
    this.eventBus = new EventBus();
    this.budgetEvent = new CustomEvent(this.EVENT_NAMES.NEW_BUDGET, {
      detail: () => this.getBudget()
    });
    this.dateService = dateService;
    this.info = this.DEFAULT_INFO;
  }

  public get DEFAULT_INFO(): BudgetInfoInterface {
    return {
      funds: null,
      monthDay: dateService.getMonthDay(),
      monthLength: dateService.getMonthLength(),
      nextIncomeDay: null
    };
  }

  public setInfoValue(key: keyof BudgetInfoInterface, value: number | null): void {
    this.info[key] = value;
    this.dispatch(this.budgetEvent);
  }

  private isInfoSet(): boolean {
    const values = this.info ?? this.DEFAULT_INFO;
    return Object.values(values).every(value => value !== null && value >= 0);
  }

  public getBudget(): number | null {
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

  public subscribe(type: string, listener: EventListenerOrEventListenerObject): void {
    this.eventBus.addEventListener(type, listener);
  }

  public dispatch(event: Event): void {
    this.eventBus.dispatchEvent(event);
  }
}

const budgetService = new BudgetService();
export default budgetService;