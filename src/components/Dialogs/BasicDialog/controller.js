import {Controller} from "@core/Controller";

export class BasicDialogController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.closeOnBackdropClick();
  }

  closeOnBackdropClick() {
    this.view.addBackDropAction('click', (event) => {
      if (event.target === this.view.element) {
        this.remove();
      }
    });
  }

  show() {
    document.body.appendChild(this.view.element);
  }
}