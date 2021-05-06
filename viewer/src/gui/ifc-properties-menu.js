export function setupIfcPropertiesMenu() {
  const sideMenuRight = document.getElementById('side-menu-right');
  const propsMenu = document.createElement('div');
  propsMenu.classList.add('side-sub-menu');
  sideMenuRight.appendChild(propsMenu);

  const propsMenuTitle = document.createElement('div');
propsMenuTitle.classList.add("text", "text-title");
  propsMenuTitle.appendChild(document.createTextNode("IFC Properties"));

  const propsMenuContent = document.createElement('div');
  propsMenuContent.setAttribute("id", "props-menu-content");
  
  propsMenu.appendChild(propsMenuTitle);
  propsMenu.appendChild(propsMenuContent);

  addPropertiesToMenu(["kdfjaldfkjaaaaa aaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaaaaaa aaaaala", "fakdfalja", "1234", "kkkkkkkk"]);

}

export function updatePropertiesMenu(props){
    clearPropertiesFromMenu();
    addPropertiesToMenu(props);
}

function addPropertiesToMenu(props) {
  props.forEach((prop) => createPropertyEntry(prop));
}

function clearPropertiesFromMenu() {
  const propsMenu = document.getElementById('props-menu-content');
  propsMenu.innerHTML = '';
}

function createPropertyEntry(info) {
  const propertyLine = document.createElement('div');
  propertyLine.classList.add('text');
  propertyLine.appendChild(document.createTextNode(`${info}`));
  const propsMenu = document.getElementById("props-menu-content");
  propsMenu.appendChild(propertyLine);
}