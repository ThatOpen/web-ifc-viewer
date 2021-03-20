export function createSideMenuButton(iconSource){
  const button = document.createElement('button');
  button.classList.add('basic-button');

  const image = document.createElement("img");
  image.setAttribute("src", iconSource);
  image.classList.add('icon');
  button.appendChild(image);

  const sideMenu = document.getElementById('side-menu-left');
  sideMenu.appendChild(button);

  return button;
}