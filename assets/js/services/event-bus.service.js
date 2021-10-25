export default class EventBus {
    BUS;
    constructor() {
        this.BUS = document.createElement("bus");
    }
    addEventListener(type, listener) {
        this.BUS.addEventListener(type, listener);
    }
    dispatchEvent(event) {
        this.BUS.dispatchEvent(event);
    }
}
