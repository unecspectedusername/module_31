import {Controller} from "../../../core/Controller";
import {initColumn} from "../Column";
import {appState} from "../../../app";
import {EVENTS} from "../../../core/events";

export class BoardController extends Controller {
  constructor(view, model) {
    super(view, model);
  }
}