import {Controller} from "@core/Controller";
import {appController, appState} from "@src/app";
import Data from "@core/Data";

export class UserMenuController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  init() {
    const isAdmin = appState.currentUser.role === 'admin';
    this.view.createMenu(isAdmin);
    this.view.onSignOut(() => appController.signOut());
    this.view.onMyTasks(() => {
      appController.renderAdminPanelBoard(appState.currentUser.id);
    })
    if (isAdmin) {
      this.view.onAdmin(() => {
        appController.renderAdminPanel()
      });
    }
  }
}