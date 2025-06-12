import DOMObject from "./DOMObject";
import Button from "./Button";
import Column from "./Column";
import ButtonWrapper from "./ButtonWrapper";

export default class TaskList extends DOMObject {
  constructor() {
    super('ul', 'kanban-board__task-list');

    const state = {empty: true};
    const self = this;
    // Следим за состоянием списка задач (есть ли в его списке задачи)
    this._state = new Proxy(state, {
      set: (target, prop, value) => {
        if (prop === 'empty') {
          if (value === false) {
            const parentColumn = self.findRelative(Column);
            const nextColumn = parentColumn.nextColumn;
            if (nextColumn) {
              const nextButton = nextColumn.findRelative(Button);
              nextButton.setDropdownState();
            }
          }
        }
        target[prop] = value;
        return true;
      }
    });

    // Следим за появлением дочерних элементов
    this.children = new Proxy([], {
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        const result = Reflect.set(target, prop, value, receiver);

        self.empty = target.length === 0;

        return result;
      },
      deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop);

        self.empty = target.length === 0;

        return result;
      }
    });
  }

  get empty() {
    return this._state.empty;
  }

  set empty(val) {
    this._state.empty = val;
  }


}