import {Controller} from "@core/Controller";
import {appController} from "@src/app";

export class LoginFormController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  init() {
    this.view.setOnSubmit((event) => this.notifyAppController(event));
  }

  notifyAppController(event) {
    event.preventDefault();
    const formData = new FormData(this.view.element);
    const login = formData.get("login");
    const password = formData.get("password");
    appController.signIn(login, password);
  }
}