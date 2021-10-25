export default class EventBus {
  private readonly BUS: HTMLUnknownElement;

  constructor() {
    this.BUS = document.createElement("bus");
  }

  public addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    this.BUS.addEventListener(type, listener);
  }

  public dispatchEvent(event: Event) {
    this.BUS.dispatchEvent(event);
  }
}