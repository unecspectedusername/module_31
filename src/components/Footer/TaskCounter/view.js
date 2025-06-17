import {View} from "@core/View";

export class TaskCounterView extends View {
  constructor() {
    super('div', 'counters-wrapper');

    this.activeCounter = document.createElement('div');
    this.activeCounter.className = 'counter';
    this.element.appendChild(this.activeCounter);

    this.finishedCounter = document.createElement('div');
    this.finishedCounter.className = 'counter';
    this.element.appendChild(this.finishedCounter);
  }

  showNumberOfTasks(active, finished) {
    this.activeCounter.innerHTML = `Active tasks: ${active}`;
    this.finishedCounter.innerHTML = `Finished tasks: ${finished}`
  }
}