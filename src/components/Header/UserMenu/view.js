import {View} from "@core/View";

export class UserMenuView extends View{
  constructor(userName) {
    super('div', 'user-menu');

    this.name = document.createElement('p');
    this.name.className = 'user-menu__name';
    this.name.textContent = `Welcome back, ${userName}`;

    this.avatar = document.createElement('div');
    this.avatar.className = 'user-menu__avatar';

    this.arrow = document.createElement('img');
    this.arrow.className = 'user-menu__arrow';
    this.arrow.src = '../src/assets/icons/arrow.svg';

    this.dropDownContainer = document.createElement('div');
    this.dropDownContainer.className = 'dropdown hidden';

    this.dropDownList = document.createElement('ul');
    this.dropDownList.className = 'dropdown__list';

    this.signOutButton = null;
    this.adminButton = null;
    this.myTasksButton = null;

    this.element.addEventListener('click', () => {
      this.dropDownContainer.classList.toggle('hidden')
      this.arrow.classList.toggle('rotated');
    })


  }

  assemble(parent, ...elements) {
    elements.forEach(el => parent.appendChild(el));
  }

  creatList(...names) {
    const dummies = names.map(name => {
      const dummy = document.createElement('li');
      dummy.className = 'dropdown__list-element';
      dummy.textContent = name;
      return dummy;
    })
    return dummies;
  }

  createSignOutButton() {
    this.signOutButton = document.createElement('li');
    this.signOutButton.className = 'dropdown__list-element';
    this.signOutButton.textContent = 'Sing Out';
    return this.signOutButton;
  }

  createAdminButton() {
    this.adminButton = document.createElement('li');
    this.adminButton.className = 'dropdown__list-element';
    this.adminButton.textContent = 'Admin Panel';
    return this.adminButton;
  }

  createMyTasksButton() {
    this.myTasksButton = document.createElement('li');
    this.myTasksButton.className = 'dropdown__list-element';
    this.myTasksButton.textContent = 'My Tasks';
    return this.myTasksButton;
  }

  onSignOut(callback) {
    this.signOutButton.addEventListener('click', callback);
  }

  onAdmin(callback) {
    this.adminButton.addEventListener('click', callback);
  }

  onMyTasks(callback) {
    this.myTasksButton.addEventListener('click', callback);
  }

  createMenu(isAdmin) {
    const listElements = this.creatList( 'Settings', 'Billing');
    listElements.push(this.createMyTasksButton());
    if (isAdmin) listElements.push(this.createAdminButton());
    listElements.push(this.createSignOutButton());
    this.assemble(this.dropDownList, ...listElements);
    this.assemble(this.dropDownContainer, this.dropDownList);
    this.assemble(this.element, this.name, this.avatar, this.arrow, this.dropDownContainer);
  }
}