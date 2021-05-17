export default class InputDiv {
  constructor(id, title, labelTxt, min, max, val) {
    this.id = id;
    this.title = title;
    this.labelTxt = labelTxt;
    this.min = min;
    this.max = max;
    this.val = val;

    const div = document.createElement("DIV");
    div.classList.add("input");

    const label = document.createElement("LABEL");
    label.setAttribute("for", this.id);
    label.setAttribute("title", this.title);
    label.innerText = this.labelTxt;

    const input = document.createElement("INPUT");
    input.type = "number";
    input.name = this.id;
    input.id = this.id;
    input.min = this.min;
    input.max = this.max;
    input.setAttribute("value", this.val);

    div.append(label, input);

    return div;
  }
}
