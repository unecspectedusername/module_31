import {Controller} from "@core/Controller";
import {appState} from "@src/app";
import {EVENTS} from "@core/events";
import {initDropDown} from '@components/Kanban/DropDown';
import {TaskListController} from "@components/Kanban/TaskList/controller";

export class ButtonController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.dropDown = null;

    this.subscribe(EVENTS.BOARD_RENDERED, () => {
      this.checkColumn();
      this.subscribe(EVENTS.TASK_IS_DRAGGED, () => this.view.setDefaultState());
      this.subscribe(EVENTS.TASK_LIST_UPDATED, () => this.checkColumn());
      this.subscribe(EVENTS.TASK_UPDATED, (data) => {
        this.checkColumn();
        if (data.columnIndex === this.model.index) {
          this.view.setDefaultState();
        }
      });
      this.subscribe(EVENTS.TASK_IS_IN_FOCUS, (data) => {
        if (data.columnIndex === this.model.index) {
          this.view.setSubmitState();
        }
      })
    })
  }

  handleClick() {
    const state = this.view.state;

    if (state === 'default' && !appState.blurFired) {
      appState.eventBus.emit(EVENTS.TASK_CREATED, {
        columnIndex: this.model.index
      })
    }
  }

  init() {
    this.view.addButtonListener('click', () => this.handleClick());
  }

  checkColumn() {
    // если колонка первая, состояние по умолчанию
    if (this.model.index === 0) {
      this.view.setDefaultState()
      return;
    }
    const leftColumn = appState.instanceManager.findInstanceByIndex(TaskListController, this.model.index - 1);
    const leftColumnTasks = leftColumn._savedLinks.length;
    // Если есть данные о задачах в предыдущей колонке, выводим дропдаун
    if (leftColumnTasks !== 0) {
      const dropdown = initDropDown(this.model.index);
      this.view.setDropDownState(dropdown.view.element, () => dropdown.view.toggleVisibility());
      this.dropDown = dropdown;
      return;
    }
    // Если не выполнено ни одно из условий, блокируем кнопку
    this.view.setDisabledState();
  }
}