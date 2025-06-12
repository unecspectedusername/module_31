import {Component} from "./Component";

export class View extends Component {
  constructor(tagName, className) {
    super();
    this.element = document.createElement(tagName);
    this.element.className = className;
  }

  renderChild(childView) {
    this.element.appendChild(childView.element);
  }
}