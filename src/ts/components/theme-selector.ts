export default class ThemeSelector extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <select>
      <option value="light">Thème clair</option>
      <option value="dark" selected>Thème sombre</option>
    </select>
    `;
  }
}