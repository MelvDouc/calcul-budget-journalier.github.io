const lightThemeProperties = {
  "--borderColor1": "blue",
  "--borderColor2": "ghostwhite",
  "--borderColor-buttonHover": "blue",
  "--bgColor": "rgba(255, 255, 255, .91)",
  "--bgColor-button": "blue",
  "--bgColor-buttonHover": "ghostwhite",
  "--textColor": "blue",
  "--textColor-budget": "red",
};

function setProperties(elem, properties) {
  for (const key in properties)
    elem.style.setProperty(key, properties[key]);
}

export function changeTheme(e) {
  const option = e.target;
  const root = document.documentElement;
  option.parentElement.insertAdjacentElement("beforeend", option);
  switch (option.id) {
    case "light-theme":
      setProperties(root, lightThemeProperties);
      break;
    case "dark-theme":
      root.removeAttribute("style");
  }
}