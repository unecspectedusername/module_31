import {createDOMProxy} from "../../utils/utils";
import {appState} from "../../app";

export default class DOMObject {
  constructor(tagName, className = null) {
    this.element = document.createElement(tagName);
    if (className) this.element.className = className;

    this._listeners = [];
    this._parent = null;
    this.children = [];

    // Записываем связь между экземпляром класса и DOM элементов в состояние
    appState.instanceMap.set(this.element, this);

    // Оборачиваем экземпляр класса в прокси
    return createDOMProxy(this);
  }

  // Этот метод позволяет добавлять элемент к родителю
  // и сохраняет ссылки на экземпляры классов родителей
  // и соседних элементов
  // чтобы можно было обращаться к методам родителей и соседей
  appendTo(parent) {
    this.parent = parent;

    parent.element.appendChild(this.element);
    if (parent instanceof DOMObject) {
      parent.children.push(this);
    }
  }

  removeChild(instance) {
    const index = this.children.indexOf(instance);
    this.children.splice(index, 1);
  }

  addEventListener(type, callback, options) {
    this._listeners.push({type, callback, options});
    this.element.addEventListener(type, callback, options);
  }

  removeAllListeners() {
    for (const {type, callback, options} of this._listeners) {
      this.element.removeEventListener(type, callback, options);
    }
    this._listeners.length = 0;
  }

  get parent() {
    return this._parent || null;
  }

  set parent(newParent) {
    this._parent = newParent;
  }

  // Метод ищет родственников (родителей, соседей, детей) как экземпляры классов,
  // что позволит обращаться к их методам из любого места кода
  findRelative(Class) {
    let current = this;

    // Вверх по дереву
    while (current.parent) {
      if (current.parent instanceof Class) return current.parent;

      // Среди соседей
      if (current.parent.children) {
        for (const child of current.parent.children) {
          if (child instanceof Class) return child;
        }
      }

      current = current.parent;
    }

    // Глубокий поиск вниз по дереву
    const deepSearch = (node) => {
      for (const child of node.children) {
        if (child instanceof Class) return child;
        const found = deepSearch(child);
        if (found) return found;
      }
      return null;
    };

    return deepSearch(this);
  }

  findChildren(Class) {
    return Array.from(this.children).filter(child => child instanceof Class);
  }
}