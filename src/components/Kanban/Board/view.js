import {View} from "../../../core/View";
import {appState} from "../../../app";
import {EVENTS} from "../../../core/events";

export class BoardView extends View{
  constructor() {
    super('div', 'kanban-board')
  }
}