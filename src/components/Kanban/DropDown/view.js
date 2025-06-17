import {View} from "@core/View";

export class DropDownView extends View {
  constructor(listElements) {
    super('div', 'dropdown hidden');

    this.list = document.createElement('ul');
    this.list.className = 'dropdown__list';

    this.element.addEventListener('click', (e) => {
      if (e.target !== this.element) {
        console.log('clicked')
        this.toggleVisibility();
      }
    })

  }

  toggleVisibility() {
    this.element.classList.toggle('hidden')
  }

  createListElement({text, callback}) {
    const li = document.createElement('li');
    li.className = 'dropdown__list-element';
    li.textContent = text;
    if (callback) li.addEventListener('click', callback);
    return li;
  }

  createList(listElements) {
    this.element.innerHTML = '';
    const list = document.createElement('ul');
    list.className = 'dropdown__list';
    listElements.forEach(el => {
      const li = this.createListElement(el);
      list.appendChild(li);
    })
    this.element.appendChild(list);
  }
}