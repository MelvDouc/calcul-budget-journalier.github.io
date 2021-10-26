import { THEMES } from "../types.js";

export default class ThemeSelector extends HTMLSelectElement {
  constructor() {
    super();

    this.innerHTML = `
    <option value="light">Thème clair</option>
    <option value="dark" selected>Thème sombre</option>
    `;
  }

  public connectedCallback(): void {
    this.addEventListener("change", this.handleChange.bind(this));
  }

  private get selectedTheme(): THEMES | null {
    if (this.value === "dark")
      return THEMES.DARK;
    if (this.value === "light")
      return THEMES.LIGHT;
    return null;
  }

  private getOppositeTheme(theme: THEMES): THEMES {
    if (theme === THEMES.DARK)
      return THEMES.LIGHT;
    return THEMES.DARK;
  }

  private handleChange(): void {
    const { selectedTheme } = this;
    if (!selectedTheme)
      return;
    document.body.classList.add(selectedTheme);
    document.body.classList.remove(this.getOppositeTheme(selectedTheme));
  };
}