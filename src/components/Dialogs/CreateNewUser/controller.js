import {Controller} from "@core/Controller";
import {User} from "@core/User";

export class CreateNewUserController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.view.addBackDropAction('click', (event) => {
        if (event.target === this.view.element) {
            this.remove();
        }
    });

    this.view.addCancelAction('click', () => this.remove());

    this.view.addCreateAction('click', () => {
        this.view.form.submit();
    });

    this.view.form.addEventListener('submit', (e) => this.submitForm(e));
  }

  submitForm(event) {
      event.preventDefault()
      const formData = new FormData(this.view.form);
      const login = formData.get("login");
      const password = formData.get("password");
      const role = formData.get("role");
      const user = new User(login, password, role);
      User.save(user);
      this.model.initiator.updateUsers();
      this.remove();
  }

  show() {
      document.body.appendChild(this.view.element);
  }
}