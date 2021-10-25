import dateService from "../services/date.service.js";
export default class DateDisplay extends HTMLElement {
    dateService;
    constructor() {
        super();
        this.dateService = dateService;
    }
    connectedCallback() {
        this.textContent = this.dateService.getFrenchDate();
    }
}
