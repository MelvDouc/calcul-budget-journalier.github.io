import dateService, { DateService } from "../services/date.service.js";

export default class DateDisplay extends HTMLElement {
  private dateService: DateService;

  constructor() {
    super();
    this.dateService = dateService;
  }

  connectedCallback(): void {
    this.textContent = this.dateService.getFrenchDate();
  }
}