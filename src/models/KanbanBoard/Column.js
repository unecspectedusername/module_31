import DOMObject from "./DOMObject";
import Task from "./Task";
import Board from "./Board";

export default class Column extends DOMObject {
    constructor() {
        super('section', 'kanban-board__column');

    }

    get positionInfo() {

        const board = this.findRelative(Board);
        const columns = board.findChildColumns();

        return {
            board: board,
            columns: columns,
            columnsCount: columns.length,
        }
    }

    // Позволяет узнать какая по счету текущая колонка
    get index() {
        return this.positionInfo.columns.indexOf(this);
    }

    get nextColumn() {
        const index = this.index;
        const columns = this.positionInfo.columns;
        return columns[index + 1] ? columns[index + 1] : false;
    }

    get previousColumn() {
        const index = this.index;
        const columns = this.positionInfo.columns;
        return columns[index - 1] ? columns[index - 1] : false;
    }
}