import {User} from "@core/User";
import {BasicDialogController} from "@components/Dialogs/BasicDialog/controller";

export class EditTaskController extends BasicDialogController {
  constructor(view, model) {
    super(view, model);

    this.view.addCancelAction('click', () => this.remove());

    this.view.addSubmitAction('click', () => {
      this.view.form.submit();
    });

    this.view.form.addEventListener('submit', (e) => this.submitForm(e));
  }

  check

  submitForm(event) {
    event.preventDefault()
    const formData = new FormData(this.view.form);
    const header = formData.get("header").trim();
    const body = formData.get("body").trim();

    if (header && (body || !body)) {
      this.model.initiator.acceptData(header, body);
      this.remove();
    }

    else if (!header && !body) {
      this.model.initiator.delete();
      this.remove();
    }

    else if (!header && body) {
      this.view.headerInput.setCustomValidity('Нельзя сохранить задачу без заголовка');

      if (!this.view.headerInput.checkValidity()) {
        this.view.form.reportValidity();
      }
    }
  }

  show() {
    document.body.appendChild(this.view.element);
  }
}