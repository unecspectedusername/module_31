import {Controller} from "@core/Controller";
import {User} from "@core/User";
import {appController, appState} from "@src/app";
import {EVENTS} from "@core/events";

export class UserCardController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.view.addButtonListener(this.view.deleteButton, () => {
      this.deleteUser(this.model.userID);
      this.remove();
    })

    this.view.addButtonListener(this.view.editButton, () => {
      appController.renderAdminPanelBoard(this.model.userID);
    })
  }

  deleteUser(userId) {
    User.delete(userId);
    appState.data.delete(userId);
    appState.eventBus.emit(EVENTS.USER_DELETED);
  }
}

