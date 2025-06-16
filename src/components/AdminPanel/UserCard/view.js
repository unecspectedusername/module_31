import {View} from "@core/View";
import template from './template.html'

export class UserCardView extends View {
  constructor(name, role) {
    super('div', 'table__row');
    this.userName = name;
    this.userRole = role;

    this.element.innerHTML = template;

    this.nameCell = this.element.querySelector('[data-el="name"]');
    this.nameCell.innerHTML = this.userName;
    this.roleCell = this.element.querySelector('[data-el="role"]');
    this.roleCell.innerHTML = this.userRole;

    this.editButton = this.element.querySelector('[data-el="editButton"]');
    this.deleteButton = this.element.querySelector('[data-el="deleteButton"]');
  }

  addButtonListener(button, callback) {
    button.addEventListener('click', callback);
  }
}