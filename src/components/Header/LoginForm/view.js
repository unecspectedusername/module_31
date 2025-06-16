import {View} from "@core/View";

export class LoginFormView extends View {
  constructor() {
    super('form', 'login-form');

    this.element.setAttribute('action', '#');

    this.loginInput = this.makeInput({
      name: 'login',
      autocomplete: 'username',
      type: 'text',
      placeholder: 'Login',
      'aria-label': 'Login'
    })

    this.passwordInput = this.makeInput({
      name: 'password',
      autocomplete: 'current-password',
      type: 'password',
      placeholder: 'Password',
      'aria-label': 'Password'
    })

    this.button = document.createElement('button');
    this.button.className = 'navbar-toggler';
    this.button.setAttribute('type', 'submit');
    this.button.setAttribute('aria-label', 'Toggle navigation');
    this.button.textContent = 'Sign in';

    [this.loginInput, this.passwordInput, this.button].forEach(element => this.element.appendChild(element));
  };
  makeInput(attrs = {}) {
    const input = document.createElement('input');

    for (const [key, value] of Object.entries(attrs)) {
      if (value !== undefined) {
        input.setAttribute(key, value);
      }
    }

    return input;

  }

  setOnSubmit(callback) {
    this.element.addEventListener('submit', callback);
  }
}

