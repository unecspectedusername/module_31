import {BoardModel} from "./model";
import {BoardView} from "./view";
import {BoardController} from "./controller";

export function initBoard() {
  const model = new BoardModel();
  const view = new BoardView();
  const controller = new BoardController(view, model);
  return controller;
}