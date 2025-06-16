import {Controller} from "@core/Controller";
import {appState, storageManager} from "@src/app";
import {initCreateNewUser} from "@components/Dialogs/CreateNewUser";
import {initUserCard} from "@components/AdminPanel/UserCard";
import {EVENTS} from "@core/events";

export class AdminPanelController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.view.addButtonListener('click', () => this.createDialog(this));

    this.subscribe(EVENTS.USER_DELETED, () => this.updateUsers());
  }

  createDialog(initiatorController) {
    const dialog = initCreateNewUser(initiatorController);
    document.body.appendChild(dialog.view.element);
    dialog.show();
  }

  parseUsers() {
    let users = storageManager.getFromStorage(appState.currentUser.storageKey);
    users = users.filter(user => user.id !== appState.currentUser.id);
    users.forEach(user => {
      const userCard = initUserCard(user);
      this.addChild(userCard);
    })
  }

  updateUsers() {
    this.savedLinks.forEach(link => {
      link.remove();
    })
    this.savedLinks = [];
    this.parseUsers();
  }
}