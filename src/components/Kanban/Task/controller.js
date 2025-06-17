import {Controller} from "@core/Controller";
import {appState} from "@src/app";
import {EVENTS} from "@core/events";
import {initEditTask} from "@components/Dialogs/EditTask";

export class TaskController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  init() {
    this.view.removeButton.addEventListener('click', () => this.delete());
    this.view.editButton.addEventListener('click', () => this.editTask());
    this.view.textField.addEventListener('focus', () => this.notifyAboutFocus());
    this.view.textField.addEventListener('blur', () => this.quickEdit());
  }

  editTask() {
    const modal = initEditTask(this);
    modal.show();
  }

  validate(text) {
    return !!text.trim();
  }

  quickEdit() {
    // Небольшой костыль с флагом blurFired
    // На элементе списка стоит обработчик на blur, а на кнопке стоит обработчик на click
    // Если фокус внутри элемента списка и мы кликаем на кнопку, срабатывают сразу два обработчика
    // потому что мы одновременно увели фокус и кликнули по кнопке.
    // Чтобы решить эту проблему, я добавил таймаут с флагом blurFired. Если сработал blur,
    // в течение таймаута клик по кнопке не сработает
    appState.blurFired = true;
    const newHeader = this.view.textField.textContent
    if (!this.validate(newHeader)) {
      this.delete()
    } else {
      this.model.header = newHeader;
      this.update();
    }
    setTimeout(() => {
      appState.blurFired = false;
    }, 200);
  }

  acceptData(header, body) {
    this.model.header = header;
    this.model.body = body;
    this.view.textField.textContent = header;
    this.update();
  }

  update() {
    appState.eventBus.emit(EVENTS.TASK_UPDATED, {
      columnIndex: this.model.columnIndex,
    })
  }

  notifyAboutFocus() {
    if (!this.view.isDragging) {
      appState.eventBus.emit(EVENTS.TASK_IS_IN_FOCUS, {
        columnIndex: this.model.columnIndex,
      })
    }
  }

  markAsDragged() {
    this.view.setDraggedState();
    appState.eventBus.emit(EVENTS.TASK_IS_DRAGGED);
  }

  unmarkAsDragged() {
    this.view.unsetDraggedState();
  }

  delete() {
    this.remove();
    appState.eventBus.emit(EVENTS.TASK_DELETED, {
      columnIndex: this.model.columnIndex,
      controller: this
    })
  }
}