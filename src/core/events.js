// Словарь событий для EventEmitter
export const EVENTS = {
  BOARD_RENDERED: 'board:rendered',
  COLUMN_NOT_EMPTY: 'column:notEmpty',
  COLUMN_IS_EMPTY: 'column:isEmpty',
  TASK_LIST_UPDATED: 'taskList:updated',
  TASK_CREATED: 'task:created',
  TASK_DELETED: 'task:deleted',
  TASK_UPDATED: 'task:updated',
  TASK_IS_IN_FOCUS: 'task:isInFocus',
  TASK_IS_DRAGGED: 'task:isDragged',
  TASK_MOVED: 'task:moved',
  USER_DELETED: 'user:deleted'
};