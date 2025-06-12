export class Component {
  constructor() {
    this.savedLinks = [];
  }

  saveLink(link) {
    this.savedLinks.push(link);
  }

  removeLink(linkToRemove) {
    // Используем splice(), но не filter() т.к. этот метод потом можно будет перехватить в Proxy
    const index = this.savedLinks.indexOf(linkToRemove);
    this.savedLinks.splice(index, 1)
  }

  placeLink(linkToPlace, index) {
    this.savedLinks.splice(index, 0, linkToPlace);
  }

  getSavedLinks() {
    return this.savedLinks;
  }
}