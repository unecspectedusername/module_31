import DOMObject from "./DOMObject";

export default class TaskCounter {

  static #createCounter(id) {
    const counter = new DOMObject('div', 'counter');
    counter.element.id = id;
    return counter;
  }

  static count() {
    const wrapper = new DOMObject('div', 'counters-wrapper');

    const activeCounter = this.#createCounter('active');
    const finishedCounter = this.#createCounter('finished');

    const taskLists = Array.from(document.querySelectorAll('.kanban-board__task-list'));
    const lastList = taskLists.pop();

    // Считаем дочерние элементы taskList, исключая элементы с классом placeholder
    const activeTasks = taskLists.reduce((sum, list) => {
      const validChildren = Array.from(list.children).filter(
        child => !child.classList.contains('placeholder')
      );
      return sum + validChildren.length;
    }, 0);
    const finishedTasks = Array.from(lastList.children).filter(
      child => !child.classList.contains('placeholder')
    ).length;

    activeCounter.element.textContent = `Active tasks: ${activeTasks}`;
    finishedCounter.element.textContent = `Finished tasks: ${finishedTasks}`;

    activeCounter.appendTo(wrapper);
    finishedCounter.appendTo(wrapper);

    const oldCounter = document.querySelector('.counters-wrapper');

    if (oldCounter) {
      oldCounter.replaceWith(wrapper.element);
    } else {
      const footer = document.querySelector('footer');
      footer.prepend(wrapper.element)
    }


  }
}

