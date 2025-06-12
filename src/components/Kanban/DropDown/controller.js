import {Controller} from "../../../core/Controller";
import {appState} from "../../../app";
import {EVENTS} from "../../../core/events";

export class DropDownController extends Controller {
  constructor(view, model) {
    super(view, model);
    this.tasks = [];

    appState.eventBus.on(EVENTS.TASK_CREATED, (data) => {

    })
  }

  init() {
    this.tasks.forEach(taskController => {
      const text = taskController.view.element.textField.textContent;
      this.view.createListElement(text);
    })
  }
}