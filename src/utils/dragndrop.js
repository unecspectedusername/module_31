import {appState} from "../app";
import Column from "../models/KanbanBoard/Column";
import TaskList from "../models/KanbanBoard/TaskList";
import DOMObject from "../models/KanbanBoard/DOMObject";

export class DragManager {
    constructor() {
        // задача, которую перетаскиваем в данный момент
        this.draggedTask = null;
        this.shiftY = 0;
        // зарезервированное поле в таск-листе, в которое можно вставить элемент (на странице выделяется пунктирным border.
        this.placeholder = null;
        // колонка kanban из которой мы вытянули задачу
        this.oldColumn = null;
        // список, в который мы поместили задачу
        this.newList = null;
        // колонки, в которые задачу нельзя вставить по логике задания
        this.forbiddenColumns = [];
        // Информация о старой колонке (где задача лежала до того, как ее перетащили) и новой.

        // Защита от "прилипания" задачи к курсору
        this._mouseDownX = 0;
        this._mouseDownY = 0;
        this._mouseMoveThreshold = 5;

        // Привязываем методы к текущему экземпляру
        this.onMouseMove = this.doWhileMoving.bind(this);
        this.onMouseUp = this.finish.bind(this);
    }

    move(pageX, pageY) {
        this.draggedTask.style.left = `${pageX - this.draggedTask.offsetWidth / 2}px`;
        this.draggedTask.style.top = `${pageY - this.shiftY}px`;
    }

    start(task, clientX, clientY) {
        this.draggedTask = task;
        this.oldColumn = task.closest('.kanban-board__column');
        const rect = task.getBoundingClientRect();
        this.shiftY = clientY - rect.top;

        this.placeholder = createPlaceholder(rect.height, rect.width);

        task.style.width = `${rect.width}px`;
        task.classList.add('is-dragging');

        // выключаем выделение текста на странице на время перетаскивания задачи
        document.body.style.userSelect = 'none';

        this.move(clientX, clientY);

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('touchmove', this.onMouseMove);
        document.addEventListener('touchend', this.onMouseUp);
    }

    doWhileMoving(event) {
        const clientX = event.clientX || event.touches?.[0]?.clientX;
        const clientY = event.clientY || event.touches?.[0]?.clientY;
        if (!clientX || !clientY) return;

        this.move(clientX, clientY);

        // во время перетаскивания задачи вытаскиваем ее из потока, чтобы не мешала найти элемент под курсором
        this.draggedTask.hidden = true;
        const elemBelow = document.elementFromPoint(clientX, clientY);
        this.draggedTask.hidden = false;

        // По условиям задания, задачи можно помещать только в следующую по счету колонку
        // т.е. нельзя поместить задачу из первой колонки сразу в третью или четвертую,
        // они должны перемещаться последовательно.
        // Поэтому создаем список "запрещенных" колонок, в которые задачу вставить нельзя.
        // В условиях не сказано про перемещение назад, поэтому
        // я сделал возможным перемещение назад в любую колонку.
        const columns = [...document.querySelectorAll('.kanban-board__column')];
        this.forbiddenColumns = columns.filter(c => columns.indexOf(c) > columns.indexOf(this.oldColumn) + 1);
        this.forbiddenColumns.forEach(c => c.classList.add('disabled'));

        const columnBelow = elemBelow.closest('.kanban-board__column');
        // Если колонка "запрещенная", не выполняем вставку задачи
        if (this.forbiddenColumns.includes(columnBelow)) return;

        const listBelow = findClosestElement(elemBelow, '.kanban-board__task-list');
        if (!listBelow) return;

        const tasksBelow = [...listBelow.querySelectorAll('.kanban-board__task:not(.is-dragging)')];
        let inserted = false;

        // если в списке нет ни одной задачи, просто вставляем плейсхолдер в список
        if (tasksBelow.length === 0) {
            listBelow.appendChild(this.placeholder);
        }

        // если есть, определяем координаты центральной точки
        // той задачи, которая сейчас под курсором
        // и вставляем плейсхолдер выше нее
        for (const task of tasksBelow) {
            const rect = task.getBoundingClientRect();
            if (clientY < rect.top + rect.height / 2) {
                listBelow.insertBefore(this.placeholder, task);
                inserted = true;
                break;
            }
        }

        // если курсор ниже последней задачи в списке, вставляем плейсхолдер под нее
        if (!inserted) {
            listBelow.appendChild(this.placeholder);
        }

        // Сохраняем информацию о том, в какой список вставили задачу на будущее
        this.newList = listBelow
    }

    finish() {
        // вставляем задачу, если выбрали для нее место
        if (this.placeholder && this.draggedTask) {
            this.placeholder.parentNode.insertBefore(this.draggedTask, this.placeholder);
            this.placeholder.remove();
            this.placeholder = null;
            appState.instanceManager.updateInstanceChildList(this.draggedTask, this.oldColumn, this.newList);
        }

        // ничего не делаем, если не выбрали место для вставки задачи
        if (this.draggedTask) {
            this.draggedTask.removeAttribute('style');
            this.draggedTask.classList.remove('is-dragging');
            this.draggedTask = null;
        }

        // очищаем обработчики, стили и переменные
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('touchmove', this.onMouseMove);
        document.removeEventListener('touchend', this.onMouseUp);
        this.forbiddenColumns.forEach(c => c.classList.remove('disabled'));
        this.forbiddenColumns = [];
    }

    makeDraggable(element) {
        // Метод добавляет возможность перетаскивать элемент списка.
        // Я добавил защиту от "прилипания" задачи к курсору.
        // Перетаскивание срабатывает только если зажать кнопку мыши (или дотронуться на сенсорном экране)
        // и потянуть в сторону на несколько пикселей (значение задано в this._mouseMoveThreshold)
        element.addEventListener('mousedown', (e) => {
            this._mouseDownX = e.clientX;
            this._mouseDownY = e.clientY;

            const onMouseMoveInit = (moveEvent) => {
                const dx = Math.abs(moveEvent.clientX - this._mouseDownX);
                const dy = Math.abs(moveEvent.clientY - this._mouseDownY);
                if (dx > this._mouseMoveThreshold || dy > this._mouseMoveThreshold) {
                    document.removeEventListener('mousemove', onMouseMoveInit);
                    document.removeEventListener('mouseup', onMouseUpInit);

                    this.start(element, moveEvent.clientX, moveEvent.clientY);
                }
            };

            const onMouseUpInit = () => {
                document.removeEventListener('mousemove', onMouseMoveInit);
                document.removeEventListener('mouseup', onMouseUpInit);
            };

            document.addEventListener('mousemove', onMouseMoveInit);
            document.addEventListener('mouseup', onMouseUpInit);
        });

        element.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this._isMouseDown = true;
            this._mouseDownX = touch.clientX;
            this._mouseDownY = touch.clientY;

            const onTouchMoveInit = (moveEvent) => {
                const touchMove = moveEvent.touches[0];
                const dx = Math.abs(touchMove.clientX - this._mouseDownX);
                const dy = Math.abs(touchMove.clientY - this._mouseDownY);
                if (dx > this._mouseMoveThreshold || dy > this._mouseMoveThreshold) {
                    document.removeEventListener('touchmove', onTouchMoveInit);
                    document.removeEventListener('touchend', onTouchEndInit);

                    this.start(element, touchMove.clientX, touchMove.clientY);
                }
            };

            const onTouchEndInit = () => {
                this._isMouseDown = false;
                document.removeEventListener('touchmove', onTouchMoveInit);
                document.removeEventListener('touchend', onTouchEndInit);
            };

            document.addEventListener('touchmove', onTouchMoveInit);
            document.addEventListener('touchend', onTouchEndInit);
        });
    }
}

function createPlaceholder(height, width) {
    const element = document.createElement('li');
    element.className = 'placeholder';
    element.style.height = `${height}px`;
    element.style.width = `${width}px`;
    return element;
}

// Функция получает текущий элемент, который находится под курсором и ищет ближайший к нему элемент с указанным классом
// Я добавил ограничение на поиск только в пределах KANBAN доски, если вынести курсор за ее пределы, поиск не будет срабатывать
function findClosestElement(startElement, selector) {
    // Если нет родителя с классом kanban-board__column, завершаем работу
    if (!startElement.closest('.kanban-board__column')) return false;
    // Возвращаем найденный дочерний элемент или родительский
    return startElement?.querySelector?.(selector) || startElement?.closest?.(selector);
}

