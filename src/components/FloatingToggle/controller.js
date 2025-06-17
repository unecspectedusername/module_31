import {Controller} from "@core/Controller";
import {appState, storageManager} from "@src/app";

export class FloatingToggleController extends Controller {
  constructor(view, model) {
    super(view, model);

    if (appState.checkSaveDataSetting()) this.view.checkbox.checked = true;

    this.view.addListener(() => {
        if (this.view.checkbox.checked) {
            storageManager.setItem('saveData', true);
        } else {
            storageManager.setItem('saveData', false);
        }
    })
  }
}