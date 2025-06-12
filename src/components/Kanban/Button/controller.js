import {Controller} from "../../../core/Controller";
import {appState} from "../../../app";
import {EVENTS} from "../../../core/events";
import {initDropDown} from "../DropDown";

export class ButtonController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.dropDown = null;

    this.checkColumn();

    // когда доска готова, добавляем обработчики
    appState.eventBus.on(EVENTS.BOARD_RENDERED, () => {

      appState.eventBus.on(EVENTS.COLUMN_NOT_EMPTY, (data) => {
        // если колонка первая, всегда ставим дефолтное состояние кнопки
        if (this.model.index === 0) {
          this.view.setDefaultState();
        }

        // Если в предыдущей колонке появились задачи, добавляем дропдаун
        if (this.model.index - 1 === data.columnIndex) {
          this.dropDown = initDropDown(this.model.index);
          this.view.setDropDownState(this.dropDown.view.element);
        }
      })

      appState.eventBus.on(EVENTS.TASK_UPDATED, (data) => {
        if (data.columnIndex === this.model.index) {
          this.view.setDefaultState();
        }
      })

      appState.eventBus.on(EVENTS.TASK_IS_IN_FOCUS, (data) => {
        if (data.columnIndex === this.model.index) {
          this.view.setSubmitState();
        }
      })
    })
  }

  handleClick() {
    const state = this.view.state;

    if(state === 'default' && !appState.blurFired) {
      appState.eventBus.emit(EVENTS.TASK_CREATED, {
        columnIndex: this.model.index
      })
    }
  }

  init() {
    const self = this;
    this.view.addEventListener('click', () => {
      self.handleClick()
    });
  }

  checkColumn() {
    // если колонка первая, состояние по умолчанию
    if (this.model.index === 0) {
      this.view.setDefaultState()
      return;
    }
    const data = appState.data.stored.content;
    const previousColumnTasks = data[this.model.index - 1].tasks;
    // Если есть данные о задачах в предыдущей колонке, выводим дропдаун
    if(previousColumnTasks.length !== 0) {
      this.dropDown = initDropDown(this.model.index);
      this.view.setDropDownState(this.dropDown.view.element);
      return;
    }
    // Если не выполнено ни одно из условий, блокируем кнопку
    this.view.setDisabledState();
  }
}