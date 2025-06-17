import "./styles/main.scss"
import defaultTemplate from "@templates/defaultPage.html";
import {changeContent, generateTestUser} from "./utils/utils";
import {AppState} from "@core/AppState";
import {AppController} from "@core/AppController";
import {AppStorageManager} from "@core/AppStorageManager";
import {User} from "@core/User";

export const appState = new AppState();
export const appController = new AppController();

export const storageManager = new AppStorageManager();

if (!appState.checkSaveDataSetting()) {
  generateTestUser(User);
}

appController.changeContent(defaultTemplate);

appController.renderLoginForm();

appController.renderFloatingToggle();